import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SafeArea } from './SafeArea';

/**
 * NOTE:
 * The overflow scroll works only when there is a parent with boundary.
 */
export function PageBody({
  className,
  children,
  withHorizontalPadding = true,
  withVerticalPadding = true,
  withSafeArea = true,
}: PropsWithChildren<{
  className?: string;
  withHorizontalPadding?: boolean;
  withVerticalPadding?: boolean;
  withSafeArea?: boolean;
}>) {
  return (
    <div
      className={clsx(
        'overflow-auto',
        {
          'px-4 xl:px-8': withHorizontalPadding !== false,
          'py-4 xl:py-8': withVerticalPadding !== false,
        },
        className
      )}
    >
      {withSafeArea ? <SafeArea>{children}</SafeArea> : children}
    </div>
  );
}
