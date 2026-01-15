import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function FlexCenter({
  children,
  className,
  isColumn = false,
}: PropsWithChildren<{
  readonly className?: string;
  readonly isColumn?: boolean;
}>) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        { 'flex-col': isColumn },
        className
      )}
    >
      {children}
    </div>
  );
}

export function InlineFlexCenter({
  children,
  className,
  isColumn = false,
}: PropsWithChildren<{
  readonly className?: string;
  readonly isColumn?: boolean;
}>) {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        { 'flex-col': isColumn },
        className
      )}
    >
      {children}
    </div>
  );
}
