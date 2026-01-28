import { useProcessedDocument } from '@/lib/markdown';
import { clsx } from '@/packages/react-dom-lib';
import { TableOfContents } from './TableOfContents';

export function MarkdownViewer({
  baseUrl,
  text,
  linkHrefBuilder,
}: {
  baseUrl: string;
  text: string;
  linkHrefBuilder?: (url: string) => string;
}) {
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
