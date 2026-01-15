import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { DialogContext } from './DialogContext';
import type { DiaglogReturnType, DialogContentBuilder } from './types';

export function DialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState<ReactNode | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const resolverRef = useRef<((value: unknown) => void) | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowOverlay(!!dialog);
    }, 10);
  }, [dialog]);

  const closeDialog = useCallback(<T,>(value: T | undefined = undefined) => {
    setDialog(null);
    resolverRef.current?.(value);
  }, []);

  const openDialog = useCallback(
    async <T,>(
      contentBuilder: DialogContentBuilder<T>
    ): DiaglogReturnType<T> => {
      setDialog(
        contentBuilder({
          onCloseDialog: closeDialog,
        })
      );

      return new Promise<T | undefined>((r) => {
        resolverRef.current = r as unknown as (value: unknown) => void;
      });
    },
    [closeDialog]
  );

  return (
    <DialogContext value={{ openDialog }}>
      {children}
      {dialog && (
        <div
          className={clsx(
            'fixed inset-0 z-120 flex items-center justify-center transition-colors duration-200 ease-out',
            'pl-[calc(env(safe-area-inset-left)+1rem)]',
            'pt-[calc(env(safe-area-inset-top)+1rem)]',
            'pr-[calc(env(safe-area-inset-right)+1rem)]',
            'pb-[calc(env(safe-area-inset-bottom)+1rem)]',
            showOverlay ? 'bg-black/60' : 'bg-black/0'
          )}
          onClick={() => closeDialog()}
        >
          <div onClick={(e) => e.stopPropagation()} className="contents">
            {dialog}
          </div>
        </div>
      )}
    </DialogContext>
  );
}
