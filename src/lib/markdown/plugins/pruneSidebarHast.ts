import type { Root, Node } from 'hast';

const ALLOWED_TAGS = new Set(['ul', 'ol', 'li', 'a', 'p']);

export function pruneSidebarHast() {
  return (tree: Root) => {
    const prune = (node: Node, inLink: boolean) => {
      if (!node || !('children' in node) || !Array.isArray(node.children)) {
        return;
      }

      node.children = node.children.filter((child) => {
        if (child.type === 'text') {
          // Only keep text inside <a>
          return inLink;
        }

        if (child.type === 'element') {
          const { tagName, children } = child;
          if (!ALLOWED_TAGS.has(tagName)) {
            // drop subtree entirely
            return false;
          }

          const nextInLink = inLink || tagName === 'a';
          prune(child, nextInLink);

          // Drop empty wrappers like <p> after pruning
          if (
            (tagName === 'p' || tagName === 'a') &&
            (!children || children.length === 0)
          ) {
            return false;
          }
          return true;
        }

        // drop comments/raw/etc
        return false;
      });
    };

    prune(tree, false);
  };
}
