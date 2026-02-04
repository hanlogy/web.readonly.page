import * as production from 'react/jsx-runtime';
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';
import { CodeBlock } from './CodeBlock';
import { MetadataBlock } from './MetadataBlock';
import { collectToc } from './plugins/collectToc';
import { metadataAstHandler } from './plugins/metadataAstHandler';
import { resolveUrls } from './plugins/resolveUrls';
import type { TocDepth, TocItem } from './types';

export function useProcessedDocument({
  text,
  baseUrl,
  tocMinDepth = 2,
  tocMaxDepth = 4,
  linkHrefBuilder,
}: {
  text: string;
  baseUrl: string;
  tocMinDepth?: TocDepth;
  tocMaxDepth?: TocDepth;
  linkHrefBuilder?: (url: string) => string;
}) {
  const [document, setDocument] = useState<ReactNode>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runIdRef = useRef(0);

  const buildHref = useEffectEvent((url: string) => {
    return linkHrefBuilder ? linkHrefBuilder(url) : url;
  });

  useEffect(() => {
    if (!text) {
      return;
    }
    const runId = ++runIdRef.current;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        if (runIdRef.current !== runId) {
          // stale it
          return;
        }

        const file = await unified()
          // text -> MDAST(markdown AST)
          .use(remarkParse)
          // For metadata
          .use(remarkFrontmatter, ['yaml'])
          // adds GitHub Flavored Markdown features
          .use(remarkGfm)
          // adds id attributes to headings
          .use(remarkSlug)
          .use(collectToc, { minDepth: tocMinDepth, maxDepth: tocMaxDepth })
          // MDAST -> HAST(HTML AST)
          .use(remarkRehype, {
            handlers: {
              yaml: metadataAstHandler,
            },
          })
          .use(resolveUrls, { baseUrl, linkHrefBuilder: buildHref })
          // Pretty code
          .use(rehypePrettyCode)
          // HAST -> React elements
          .use(rehypeReact, {
            ...production,
            components: {
              pre: CodeBlock,
              metadata: MetadataBlock,
            },
          })
          .process(text);

        setDocument(file.result);
        setTocItems(file.data.toc);
      } catch (e) {
        if (runIdRef.current !== runId) {
          return;
        }

        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (runIdRef.current === runId) {
          setLoading(false);
        }
      }
    })();
  }, [text, baseUrl, tocMaxDepth, tocMinDepth]);

  return { document, tocItems, loading, error };
}
