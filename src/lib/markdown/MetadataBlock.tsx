import { type HTMLAttributes } from 'react';
import { parse } from 'yaml';

export function MetadataBlock({ children: text }: HTMLAttributes<HTMLElement>) {
  if (typeof text !== 'string' || !text) {
    return;
  }
  try {
    const items = Object.entries(parse(text)).filter(([, value]) => !!value);

    if (!items.length) {
      return;
    }

    return items.map(([key, value]) => {
      switch (key) {
        case 'updated_at':
        case 'lastmod':
        case 'updated':
          return (
            <div className="text-gray-500 italic">
              Last updated: {toLocalDate(value)}
            </div>
          );
      }
    });
  } catch {
    return;
  }
}

function toLocalDate(input: unknown) {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  return new Date(String(input)).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
