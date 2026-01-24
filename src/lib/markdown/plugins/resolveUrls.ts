import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

function isAbsoluteOrSpecial(url: string) {
  return /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.startsWith('//');
}

export function resolveUrls({ baseUrl }: { baseUrl: string }) {
  const base = new URL(baseUrl);

  return (tree: Root) => {
    visit(tree, 'element', ({ tagName, properties }: Element) => {
      if (tagName === 'img' && properties?.src) {
        const src = String(properties.src);
        if (!isAbsoluteOrSpecial(src)) {
          properties.src = new URL(src, base).toString();
        }
      }

      if (tagName === 'a' && properties?.href) {
        const href = String(properties.href);
        if (!isAbsoluteOrSpecial(href)) {
          properties.href = new URL(href, base).toString();
        }
      }
    });
  };
}
