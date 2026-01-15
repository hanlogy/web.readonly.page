import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { FlexCenter } from './centers';

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

const iconClassNameMap: Record<IconSize, string> = {
  small: 'w-5 h-5 text-xl',
  medium: 'w-6 h-6 text-2xl',
  large: 'w-8 h-8 text-3xl',
  xlarge: 'w-10 h-10 text-4xl',
};

export function IconContainer({
  children,
  size = 'medium',
  className,
}: PropsWithChildren<{
  readonly size?: IconSize;
  readonly className?: string;
}>) {
  return (
    <FlexCenter
      className={clsx('flex-none', iconClassNameMap[size], className)}
    >
      {children}
    </FlexCenter>
  );
}
