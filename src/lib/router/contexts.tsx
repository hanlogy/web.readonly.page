import { createContext } from 'react';
import type { Path, NavigateContextValue } from './types';

export const PathContext = createContext<Path | null>(null);

export const NavigateContext = createContext<NavigateContextValue | null>(null);
