import type { PropsWithChildren } from 'react';

export function AppTitle({ children }: PropsWithChildren) {
  // M3:
  // Font: 22/28
  // We use a bit smaller text
  return (
    <div
      className="contents text-xl text-gray-700"
      data-role="app-title-component"
    >
      {children}
    </div>
  );
}
