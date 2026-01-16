import { createContext } from 'react';
import type { Path, NavigateContextValue } from './types';

// We only have path information in LocationContext now, we might add more
// information similar to ReactRouter:
// https://api.reactrouter.com/v7/interfaces/react_router.Location.html
export const LocationContext = createContext<Path | null>(null);

export const NavigateContext = createContext<NavigateContextValue | null>(null);
