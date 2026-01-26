import { useCallback } from 'react';
import { useProcessedDocument } from '@/lib/markdown';
import { useParsedPath } from '@/lib/router/hooks';
import { clsx } from '@/packages/react-dom-lib';
import { TableOfContents } from './TableOfContents';

export function MarkdownViewer({
  baseUrl,
  text,
}: {
  baseUrl: string;
  text: string;
}) {
  const {
    pathname,
    hash: { resources },
  } = useParsedPath();

  const linkHrefBuilder = useCallback(
    (url: string) => {
      return [
        pathname,
        ...(resources.length === 1 ? [] : [resources[0]]),
        url,
      ].join('#');
    },
    [resources, pathname]
  );

  const { document, tocItems } = useProcessedDocument({
    baseUrl,
    text,
    linkHrefBuilder,
  });

  const hasToc = tocItems.length > 0;

  return (
    <div className={clsx('mx-auto py-8', hasToc ? 'max-w-7xl' : 'max-w-4xl')}>
      <div className="grid grid-cols-10">
        <article
          className={clsx('prose col-span-10 max-w-none px-4 py-4', {
            'lg:col-span-7': hasToc,
          })}
        >
          {document}
        </article>
        <aside className={clsx('hidden lg:col-span-3', { 'lg:block': hasToc })}>
          <div className="fixed max-h-[calc(100vh-6rem)] overflow-auto pr-4 pb-2">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </div>
    </div>
  );
}
