import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';
import { resolveWithBaseUrl } from '@/packages/ts-lib';

export function resolveUrls({
  baseUrl,
  linkHrefBuilder,
}: {
  baseUrl: string;
  linkHrefBuilder?: (url: string) => string;
}) {
  return (tree: Root) => {
    visit(tree, 'element', ({ tagName, properties }: Element) => {
      if (tagName !== 'img' && tagName !== 'a') {
        return;
      }

      if (tagName === 'img') {
        const src = String(properties.src);
        if (!isExternalRef(src)) {
          properties.src = resolveWithBaseUrl({ base: baseUrl, ref: src });
        }
        properties.loading = 'lazy';
        properties.decoding = 'async';
        properties.referrerPolicy = 'no-referrer';

        return;
      }

      const href = String(properties.href);

      if (isExternalRef(href)) {
        properties.target = '_blank';
        properties.rel = 'noopener';

        return;
      }

      properties.href = linkHrefBuilder
        ? linkHrefBuilder(href)
        : resolveWithBaseUrl({ ref: href, base: baseUrl });
    });
  };
}

function isExternalRef(href: string) {
  return /^https?:/i.test(href) || href.startsWith('//');
}
