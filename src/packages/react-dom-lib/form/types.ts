import type { MouseEventHandler, ReactNode } from 'react';
import type { FormFieldController } from './useForm';

export interface FormInitializeValuesOptions {
  // If it will dispatch a change event(This event is the html raw event, we
  // we need to use onchange to capture it. Not React onChange)
  readonly emitEvent?: boolean;

  // It will not invoke onValueChange if true.
  readonly silent?: boolean;

  readonly force?: boolean;

  readonly shouldClearErrors?: boolean;
}

export type FormInputValueChange<T> = <K extends keyof T>(
  values: Partial<T>,
  extra: {
    readonly field: K;
    readonly valuesBefore: Partial<T>;
  }
) => void;

export type FormFieldValidator<T> = (
  values: Partial<T>
) => string | undefined | void;

export type FormFieldRegisterOptions<T> = {
  validator?: FormFieldValidator<T>;
  onValueChange?: FormInputValueChange<T>;
};

export type FormErrorListener = (error?: string) => void;

export type FormSetFieldErrorListener = (listener: FormErrorListener) => void;

// The inputs need to work with `useForm`.
// To make it simple, we do not support value.

export interface TextInputWrapperProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  children: ((inputClassName: string) => ReactNode) | ReactNode;
  setErrorListener?: FormSetFieldErrorListener;
}

interface TextInputCommonProps<
  InputElementT,
  FormDataT,
  FieldNameT,
  FieldValueT,
> {
  label?: string;
  helper?: string;
  id?: string;
  name?: string;
  readOnly?: boolean;
  placeholder?: string;
  onClick?: MouseEventHandler<InputElementT>;
  disabled?: boolean;
  controller: FormFieldController<FormDataT, FieldValueT, FieldNameT>;
}

export type TextInputProps<T, K = string> = TextInputCommonProps<
  HTMLInputElement,
  T,
  K,
  string
> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  maxLength?: number;
  type?: 'email' | 'password' | 'text' | 'datetime-local' | 'number';
};

export type MultilineTextInputProps<T, K = string> = TextInputCommonProps<
  HTMLTextAreaElement,
  T,
  K,
  string
> & {
  rows?: number;
};

export type SelectInputOption<V = string> = {
  label: string;
  value: V;
  description?: string;
};

export interface SelectInputOptionGroup {
  label: string;
}

export type SelectInputProps<T, V, K = string> = TextInputCommonProps<
  HTMLInputElement,
  T,
  K,
  V
> & {
  options: (SelectInputOption<V> | SelectInputOptionGroup)[];
  trailingIcon?: ReactNode;
  selectedIcon?: ReactNode;
  unselectedIcon?: ReactNode;
};

export interface CheckoxInputProps<T, K = string> {
  name?: string;
  id?: string;
  disabled?: boolean;
  label?: ReactNode;
  readOnly?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  controller: FormFieldController<T, boolean, K>;
}
