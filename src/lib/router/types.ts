// Align with the native URL API.
export interface Path {
  readonly pathname: string;
  // includes "?" or ""
  readonly search: string;
  // includes "#" or ""
  readonly hash: string;
}

export type PartialPath = Partial<Path> & Pick<Path, 'pathname'>;

export interface NavigateOptions {
  readonly replace?: boolean;
}

export type NavigateContextValue = (
  target: PartialPath | number,
  options?: NavigateOptions
) => void;
