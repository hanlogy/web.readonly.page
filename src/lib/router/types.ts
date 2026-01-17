// Warning: It does not align with the native URL Object
export interface Path {
  readonly pathname: string;

  /**
   *  `search` does not have leading "?"
   */
  readonly search?: string;

  /**
   * `hash` does not have leading "#"
   */
  readonly hash?: string;
}

export interface NavigateOptions {
  readonly replace?: boolean;
}

export type NavigateContextValue = (
  target: Path | number,
  options?: NavigateOptions
) => void;
