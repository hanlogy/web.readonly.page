import { createContext } from 'react';
import type { Location } from './types';

export const LocationContext = createContext<Location | null>(null);

export const NavigateContext = createContext<
  ((location: Location) => void) | null
>(null);
