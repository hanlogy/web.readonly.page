import type { ReactNode } from 'react';
import { usePath } from './hooks';

export function Route({ path, element }: { path: string; element: ReactNode }) {
  const { pathname } = usePath();

  if (path === pathname) {
    return element;
  }

  return null;
}
