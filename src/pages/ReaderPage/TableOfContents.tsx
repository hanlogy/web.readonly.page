import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/markdown/types';
import { useLocation } from '@/lib/router';
import { clsx } from '@/packages/react-dom-lib';

export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  const { hash, anchor: initialAnchor } = useLocation();
  const [anchor, setAnchor] = useState(initialAnchor);

  const jumpTo = (id: string) => {
    setAnchor(id);
    const headlineTag = document.getElementById(id);
    if (!headlineTag) {
      return;
    }

    const bar = document.querySelector<HTMLElement>(
      '[data-role="app-bar-component"]'
    );
    const offset = bar?.getBoundingClientRect().height ?? 0;

    const y =
      window.scrollY + headlineTag.getBoundingClientRect().top - offset - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!initialAnchor) {
      return;
    }
    setTimeout(() => {
      jumpTo(initialAnchor);
    }, 100);
  }, [initialAnchor]);

  return (
    <nav className="border-l border-l-gray-200 pl-6 text-sm">
      <ul className="space-y-3">
        {items.map(({ id, depth, text }) => (
          <li
            key={id}
            className={depth === 2 ? '' : depth === 3 ? 'ml-3' : 'ml-6'}
          >
            <a
              href={`#${[hash, id].join('#')}`}
              onClick={() => jumpTo(id)}
              className={clsx('text-gray-600 hover:text-gray-900', {
                'font-bold text-green-800': anchor === id,
              })}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
