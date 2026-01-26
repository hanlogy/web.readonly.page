import type { Root, Element } from 'hast';
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

      if (tagName === 'img') {
        const src = String(properties.src);

        if (!isAbsoluteOrSpecial(src)) {
          properties.src = resolveUrl(src, base);
        }

        properties.loading = 'lazy';
        properties.decoding = 'async';
        properties.referrerPolicy = 'no-referrer';

        return;
      }

      const href = String(properties.href);

      if (isExternalHttpUrl(href)) {
        properties.target = '_blank';
        properties.rel = 'noopener';

        return;
      }

      if (!isAbsoluteOrSpecial(href)) {
        properties.href = linkHrefBuilder
          ? linkHrefBuilder(href)
          : resolveUrl(href, base);
      }
    });
  };
}

function isAbsoluteOrSpecial(url: string) {
  return /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.startsWith('//');
}

function isExternalHttpUrl(href: string) {
  return /^https?:/i.test(href) || href.startsWith('//');
}

function resolveUrl(url: string, base: URL) {
  return isAbsoluteOrSpecial(url) ? url : new URL(url, base).toString();
}
