/**
 *  It aligns with the native `URL` Object
 */
export interface Path {
  readonly pathname: string;

  /**
   *  with leading "?"
   */
  readonly search: string;

  /**
   * with leading "#"
   */
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

export interface ParsedPathHash {
  readonly resources: readonly string[];
  readonly params: Readonly<Record<string, string>>;
  readonly rawResources?: string;
  readonly rawParams?: string;
}
