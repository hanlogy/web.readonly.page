import * as production from 'react/jsx-runtime';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import rehypeReact from 'rehype-react';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { pruneSidebarHast } from './plugins/pruneSidebarHast';
import { resolveUrls } from './plugins/resolveUrls';

const sidebarSchema = {
  ...defaultSchema,
  tagNames: ['ul', 'ol', 'li', 'a', 'p'],
  attributes: {
    ...defaultSchema.attributes,
    a: ['href', 'title'],
  },
};

export function useProcessedSidebar({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  const [document, setDocument] = useState<ReactNode>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runIdRef = useRef(0);

  useEffect(() => {
    if (!text) {
      return;
    }
    const runId = ++runIdRef.current;

    (async () => {
      try {
        if (runIdRef.current !== runId) {
          // stale it
          return;
        }

        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(resolveUrls, { baseUrl: url })
          .use(rehypeSanitize, sidebarSchema)
          .use(pruneSidebarHast)
          .use(rehypeReact, { ...production })
          .process(text);

        setDocument(file.result);
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
  }, [text, url]);

  return { document, loading, error };
}
