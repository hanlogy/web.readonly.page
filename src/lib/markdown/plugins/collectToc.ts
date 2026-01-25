import type { Root, Heading } from 'mdast';
import { toString } from 'mdast-util-to-string';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
import type { TocDepth, TocItem } from '../types';

interface Options {
  minDepth?: TocDepth;
  maxDepth?: TocDepth;
}

function getHeadingId(node: Heading): string | undefined {
  const id = node.data?.hProperties?.id;
  return typeof id === 'string' ? id : undefined;
}

// make sure remarkSlug runs before this plugin
export const collectToc: Plugin<[Options?], Root> =
  (options) => (tree: Root, file: VFile) => {
    const minDepth = options?.minDepth ?? 2;
    const maxDepth = options?.maxDepth ?? 4;

    const items: TocItem[] = [];

    visit(tree, 'heading', (node: Heading) => {
      if (node.depth < minDepth || node.depth > maxDepth) {
        return;
      }

      const id = getHeadingId(node);
      if (!id) {
        return;
      }

      const text = toString(node).trim();
      if (!text) {
        return;
      }

      items.push({ depth: node.depth, id, text });
    });

    file.data.toc = items;
  };
