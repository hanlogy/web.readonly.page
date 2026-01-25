import type { ReactNode } from 'react';
import { checkClassNamesAllowed } from '../checkClassNamesAllowed';
import { clsx } from '../clsx';

// Be careful while adding more allowed classNames.
const allowedClassName = ['flex-1', 'h-full'];

// NOTE:
// Normally, we keep four direction as `true` when using this inside `Scaffold`,
// since `main` is fully stretched to the body.
export function SafeArea({
  top = true,
  left = true,
  bottom = true,
  right = true,
  children,
  className,
}: {
  readonly top?: boolean;
  readonly left?: boolean;
  readonly bottom?: boolean;
  readonly right?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
} = {}) {
  if (className && !checkClassNamesAllowed(className, allowedClassName)) {
    throw new Error(`Allowed classNames: ${allowedClassName.join()}`);
  }

  return (
    <div
      className={clsx(className, {
        'pl-[env(safe-area-inset-left)]': left === true,
        'pt-[env(safe-area-inset-top)]': top === true,
        'pr-[env(safe-area-inset-right)]': right === true,
        'pb-[env(safe-area-inset-bottom)]': bottom === true,
      })}
    >
      {children}
    </div>
  );
}
