import type { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { SafeArea } from './SafeArea';

// https://m3.material.io/components/app-bars/specs

export function AppBar({
  children,
  centerTitle = true,
  leading,
  actions,
  withBorder = true,
}: PropsWithChildren<{
  centerTitle?: boolean;
  leading?: ReactNode;
  actions?: ReactNode;
  withBorder?: boolean;
}>) {
  // height: 64px, leading/trailing space 4px.
  const containerClass = 'h-16 px-1';

  const actionContainerCommon =
    'h-12 flex items-center justify-center z-20 absolute top-2';

  return (
    <div
      data-role="app-bar-component"
      className={clsx({ 'border-b border-b-gray-200': withBorder })}
    >
      <SafeArea bottom={false}>
        <div
          className={clsx('relative', containerClass, {
            '-mb-px]': withBorder,
          })}
        >
          <div
            className={clsx(
              'absolute right-0 left-0 z-10 flex h-full items-center',
              {
                'justify-center': centerTitle,
                'pl-14': !centerTitle && !!leading,
                'pl-4': !centerTitle && !leading,
              }
            )}
          >
            {children}
          </div>
          {leading && (
            <div
              className={clsx(actionContainerCommon, 'left-1 aspect-square')}
            >
              {leading}
            </div>
          )}
          {actions && (
            <div className={clsx(actionContainerCommon, 'right-1')}>
              {actions}
            </div>
          )}
        </div>
      </SafeArea>
    </div>
  );
}
