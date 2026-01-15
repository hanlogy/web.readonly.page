import { type ReactNode } from 'react';

export type CloseDialogFn<T = unknown> = (value?: T) => void;

export type DialogContentBuilder<T> = ({
  onCloseDialog,
}: {
  readonly onCloseDialog: CloseDialogFn<T>;
}) => ReactNode;

export type DiaglogReturnType<T> = Promise<T | undefined>;

export interface DialogContextValue {
  readonly openDialog: <T>(
    contentBuilder: DialogContentBuilder<T>
  ) => DiaglogReturnType<T>;
}
