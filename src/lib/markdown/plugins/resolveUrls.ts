import type { Root, Element, Properties } from 'hast';
import { visit } from 'unist-util-visit';

export function resolveUrls({
  baseUrl,
  linkHrefBuilder,
}: {
  baseUrl: string;
  linkHrefBuilder?: (url: string) => string;
}) {
  const base = new URL(baseUrl);

  return (tree: Root) => {
    visit(tree, 'element', ({ tagName, properties }: Element) => {
      if (tagName !== 'img' && tagName !== 'a') {
        return;
      }

      if (tagName === 'img' && !isAbsoluteOrSpecial(properties.src)) {
        properties.src = resolve(properties.src, base);
      } else if (tagName === 'a' && !isAbsoluteOrSpecial(properties.href)) {
        properties.href = linkHrefBuilder
          ? linkHrefBuilder(String(properties.href))
          : resolve(properties.href, base);
      }
    });
  };
}

function isAbsoluteOrSpecial(url: Properties['src']) {
  url = String(url);
  return /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.startsWith('//');
}

const resolve = (value: unknown, base: URL) => {
  const url = String(value);
  return isAbsoluteOrSpecial(url) ? url : new URL(url, base).toString();
};
