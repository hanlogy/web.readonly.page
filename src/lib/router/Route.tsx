import type { ReactNode } from 'react';
import { useLocation } from './hooks';

export function Route({ path, element }: { path: string; element: ReactNode }) {
  const location = useLocation();

  if (path === location.pathname) {
    return element;
  }

  return null;
}
