import type { List, ListItem, Link, Text } from 'mdast';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { Node, Parent } from 'unist';
import type { SidebarItem } from './types';

export function parseSidebar(text: string): SidebarItem[] {
  if (!text.trim()) {
    return [];
  }

  const ast = unified().use(remarkParse).parse(text);

  // Only accept the first top-level list, ignore everything else.
  const topLevelList = ast.children.find(isList);
  if (!topLevelList) {
    return [];
  }

  return parseList(topLevelList);
}

function parseList(list: List): SidebarItem[] {
  return list.children.map(parseListItem).filter((e) => !!e);
}

/**
 * - A list item is valid if it contains a supported link label OR a plain-text
 *   label.
 * - If it has neither, ignore the entire subtree under it (children are not
 *   promoted).
 */
function parseListItem(listItem: ListItem): SidebarItem | null {
  const children = listItem.children.filter(isList).flatMap(parseList);

  const link = extractLink(listItem);
  if (link) {
    return {
      ...link,
      children,
    };
  }

  const text = extractPlainLabel(listItem);
  if (!text) {
    return null;
  }

  return {
    text,
    children,
  };
}

/**
 * Ignores surrounding content like `123 [a](a.md) 456`.
 */
function extractLink(
  listItem: ListItem
): { text: string; link: string } | null {
  const link = listItem.children
    .filter((child) => !isList(child))
    .map(findFirstSupportedLink)
    .find((e) => e !== null);

  if (!link) {
    return null;
  }

  const text = linkTextIfPlain(link);
  return text ? { text, link: link.url } : null;
}

function extractPlainLabel(listItem: ListItem): string {
  const text =
    listItem.children
      .filter((child) => !isList(child))
      .map(plainTextIfPlain)
      .find((e) => e !== '') ?? '';

  return text;
}

function plainTextIfPlain(node: Node): string {
  if (isText(node)) {
    return node.value.replace(/\s+/g, ' ').trim();
  }

  if (!isParent(node)) {
    return '';
  }

  if (!node.children.every(isText)) {
    return '';
  }

  return node.children
    .map((child) => child.value)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function findFirstSupportedLink(node: Node): Link | null {
  if (isLink(node) && linkTextIfPlain(node)) {
    return node;
  }

  if (!isParent(node)) {
    return null;
  }

  return (
    node.children
      .filter((child) => !isList(child))
      .map(findFirstSupportedLink)
      .find((link) => link !== null) ?? null
  );
}

function linkTextIfPlain(link: Link): string {
  if (!link.children.every(isText)) {
    return '';
  }

  return link.children
    .reduce((acc, child) => {
      return isText(child) ? (acc += child.value) : acc;
    }, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isList(node: Node): node is List {
  return node.type === 'list';
}

function isLink(node: Node): node is Link {
  return node.type === 'link';
}

function isText(node: Node): node is Text {
  return node.type === 'text';
}

function isParent(node: Node): node is Parent {
  if ('children' in node === false) {
    return false;
  }

  return Array.isArray(node.children);
}
