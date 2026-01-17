import { useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';

type Alignment = 'bottomLeft' | 'bottomRight';

export interface DropdownProps {
  readonly button: (show: () => void, isShown: boolean) => ReactNode;
  readonly children: ReactNode | ((close: () => void) => ReactNode);
  readonly alignment?: Alignment;
}

export function Dropdown({
  button,
  children,
  alignment = 'bottomLeft',
}: DropdownProps) {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const close = () => setIsShown(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsShown(false);
    };

    if (isShown) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShown]);

  return (
    <div className="relative inline-block">
      {button(show, isShown)}

      {isShown && (
        <>
          <div className="fixed inset-0 z-110 opacity-0" onClick={close}></div>
          <div
            className={clsx(
              'absolute z-111 mt-1 w-max min-w-fit overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg',
              {
                'right-0': alignment === 'bottomRight',
                'left-0': alignment === 'bottomLeft',
              }
            )}
          >
            {typeof children === 'function' ? children(close) : children}
          </div>
        </>
      )}
    </div>
  );
}
