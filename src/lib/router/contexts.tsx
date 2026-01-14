import { createContext } from 'react';
import type { Location } from './definitions';

export const LocationContext = createContext<Location | null>(null);

export const NavigateContext = createContext<
  ((location: Location) => void) | null
>(null);
