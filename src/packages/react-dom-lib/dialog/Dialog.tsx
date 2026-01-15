import type { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

export function Dialog({
  children,
  title,
  maxWidth,
  bottomBar,
  withVerticalPadding = true,
  withHorizontalPadding = true,
}: PropsWithChildren<{
  readonly title?: ReactNode;
  readonly maxWidth?: string;
  readonly bottomBar?: ReactNode;
  readonly withVerticalPadding?: boolean;
  readonly withHorizontalPadding?: boolean;
}>) {
  return (
    <div
      className={clsx(
        'flex max-h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white py-6 shadow-lg',
        maxWidth ?? 'max-w-md'
      )}
    >
      <div className={clsx('flex-none px-6 pb-4 text-2xl text-gray-800')}>
        {title}
      </div>
      <div
        className={clsx('flex-1 overflow-auto', {
          'px-6': withHorizontalPadding,
          'pb-6': withVerticalPadding,
        })}
      >
        {children}
      </div>
      {bottomBar}
    </div>
  );
}
