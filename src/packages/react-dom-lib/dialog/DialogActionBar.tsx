import type { PropsWithChildren } from 'react';

export function DialogActionBar({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-none items-center justify-end gap-2 px-6">
      {children}
    </div>
  );
}
