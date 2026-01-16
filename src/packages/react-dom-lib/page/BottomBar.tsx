import type { ReactNode } from 'react';
import clsx from 'clsx';
import { SafeArea } from './SafeArea';

export const BottomBar = ({
  children,
  withBorder = false,
}: {
  children?: ReactNode;
  withBorder?: boolean;
}) => {
  return (
    <div
      data-role="bottom-bar-component"
      className={clsx({ 'border-t border-t-gray-200': withBorder })}
    >
      <SafeArea top={false}>
        <div
          className={clsx('h-16 px-1', {
            'mt-[-1px]': withBorder,
          })}
        >
          {children}
        </div>
      </SafeArea>
    </div>
  );
};
