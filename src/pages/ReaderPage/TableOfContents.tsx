import type { TocItem } from '@/lib/markdown/types';
import { useAnchor } from '@/lib/router/hooks';
import { clsx } from '@/packages/react-dom-lib';

export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  const { setAnchor, anchorId } = useAnchor();

  return (
    <nav className="border-l border-l-gray-200 pl-6 text-sm">
      <ul className="space-y-3">
        {items.map(({ id, depth, text }) => (
          <li
            key={id}
            className={depth === 2 ? '' : depth === 3 ? 'ml-3' : 'ml-6'}
          >
            <button
              onClick={() => setAnchor(id)}
              className={clsx(
                'cursor-pointer text-gray-600 hover:text-gray-900',
                {
                  'font-bold text-green-800': anchorId === id,
                }
              )}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
