import { useCallback, useRef, type FormEvent } from 'react';
import type {
  FormFieldRegisterOptions,
  FormInputValueChange,
  FormErrorListener,
  FormInitializeValuesOptions,
} from './types';

export const useForm = <T>() => {
  const registeredRef = useRef<
    Partial<{
      [K in keyof T]: FormFieldRegisterOptions<T> & {
        ref: HTMLElement | null;
      };
    }>
  >({});

  const valuesRef = useRef<Partial<{ [K in keyof T]: T[K] }>>({});
  const initializedRef = useRef<boolean>(false);
  const fieldErrorsRef = useRef<
    Partial<{ [K in keyof T]: string | undefined }>
  >({});
  const fieldErrorListenersRef = useRef<
    Partial<{ [K in keyof T]: FormErrorListener | undefined }>
  >({});
  const valuesBufferRef = useRef<Partial<{ [K in keyof T]: T[K] }>>({});
  const detachedValuesRef = useRef<Partial<{ [K in keyof T]: T[K] }>>({});
  const formErrorRef = useRef<{ listener?: FormErrorListener; error?: string }>(
    {}
  );

  const getValues = useCallback(() => ({ ...valuesRef.current }), []);

  const setFieldError = useCallback((field: keyof T, error?: string) => {
    if (fieldErrorsRef.current[field] === error) {
      return;
    }

    fieldErrorsRef.current = {
      ...fieldErrorsRef.current,
      [field]: error,
    };
    fieldErrorListenersRef.current[field]?.(error);
  }, []);

  const setFormError = useCallback((error?: string) => {
    const { error: errorBefore, listener } = formErrorRef.current;
    if (errorBefore === error) {
      return;
    }

    formErrorRef.current.error = error;
    listener?.(error);
  }, []);

  const applyValueChange = useCallback(
    <K extends keyof T>(
      onValueChange: FormInputValueChange<T> | undefined,
      field: K,
      value?: T[K],
      {
        silent,
        shouldClearErrors,
      }: Pick<FormInitializeValuesOptions, 'silent' | 'shouldClearErrors'> = {}
    ) => {
      const valuesBefore = { ...valuesRef.current };
      const newValues = { ...valuesBefore, [field]: value };

      valuesRef.current = newValues;
      if (shouldClearErrors) {
        if (fieldErrorsRef.current[field]) {
          setFieldError(field, undefined);
        }
        if (formErrorRef.current.error) {
          setFormError(undefined);
        }
      }

      if (onValueChange && !silent) {
        onValueChange(newValues, { valuesBefore, field });
      }
    },
    [setFieldError, setFormError]
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(
      field: K,
      value?: T[K],
      {
        emitEvent = true,
        silent = false,
        shouldClearErrors = true,
      }: FormInitializeValuesOptions = {}
    ) => {
      const registry = registeredRef.current[field];
      const element = registry?.ref;
      if (!element) {
        valuesBufferRef.current[field] = value;
        return;
      }
      if (element instanceof HTMLInputElement && element.type === 'checkbox') {
        element.checked = value === true;
      } else if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        const stringValue =
          typeof value === 'string'
            ? value
            : value != null
              ? String(value)
              : '';
        element.value = stringValue;
      }

      if (emitEvent) {
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }
      applyValueChange(registry?.onValueChange, field, value, {
        silent,
        shouldClearErrors,
      });
    },
    [applyValueChange]
  );

  const initializeValues = useCallback(
    (
      data: Partial<T>,
      {
        emitEvent = true,
        silent = false,
        force = false,
      }: FormInitializeValuesOptions = {}
    ) => {
      if (!force && initializedRef.current) {
        return;
      }

      initializedRef.current = true;
      for (const field in data) {
        setFieldValue(field, data[field], { silent, emitEvent });
      }
    },
    [setFieldValue]
  );

  const register = useCallback(
    <E extends HTMLElement, K extends keyof T>(
      field: K,
      options: FormFieldRegisterOptions<T> = {}
    ) => {
      registeredRef.current[field] = { ref: null as E | null, ...options };

      return {
        name: field,
        ref: (element: E | null) => {
          if (!registeredRef.current[field]) {
            return;
          }

          if (element) {
            registeredRef.current[field].ref = element;

            const valueBuffer = valuesBufferRef.current[field];
            const detachedValue = detachedValuesRef.current[field];

            if (valueBuffer) {
              // There should not be possible both valueBuffer & detachedValue
              // exist.
              if (!detachedValue) {
                setFieldValue(field, valueBuffer);
              }
              delete valuesBufferRef.current[field];
            }

            if (detachedValue) {
              setFieldValue(field, detachedValue, {
                // Keep the errors when umount/mount
                shouldClearErrors: false,
              });
              delete detachedValuesRef.current[field];
            }
          } else {
            // Move the value into detachedValuesRef when element unmounted, and
            // set the value when this element is put back.
            detachedValuesRef.current[field] = valuesRef.current[field];
            // Do not delete field from valuesRef, otherwise it might result
            // an empty `values` in dev StrictMode, (React StrictMode "stale
            // object reference: issue?) for example when run a RTK query
            // mutaion.
          }
        },
        // This method does not dispatch a change event. We normally use it in
        // side the onChange listener. use setFieldValue if we want to dispatch
        // a change event programmatically.
        setValue: (value: T[K]) => {
          applyValueChange(options.onValueChange, field, value, {
            shouldClearErrors: true,
          });
        },
        // It is only allowed to set one listener
        setErrorListener: (listener: FormErrorListener) => {
          fieldErrorListenersRef.current[field] = listener;
        },
      };
    },
    [applyValueChange, setFieldValue]
  );

  const clearErrors = useCallback(() => {
    setFormError(undefined);
    for (const field in fieldErrorsRef.current) {
      setFieldError(field, undefined);
    }
  }, [setFieldError, setFormError]);

  const validate = useCallback(
    (fields: (keyof T)[] = []) => {
      clearErrors();

      const keysToValidate =
        fields.length > 0
          ? fields
          : (Object.keys(registeredRef.current) as (keyof T)[]);

      for (const field of keysToValidate) {
        const { validator } = registeredRef.current[field] ?? {};
        if (validator) {
          const validateResult = validator(valuesRef.current);
          if (validateResult) {
            setFieldError(field, validateResult);
            return false;
          }
        }
      }
      return true;
    },
    [clearErrors, setFieldError]
  );

  const setFormErrorListener = useCallback((listener: FormErrorListener) => {
    formErrorRef.current.listener = listener;
  }, []);

  const handleSubmit = useCallback(
    <K extends keyof T = keyof T, F = VoidFunction>(
      handler: (data: Pick<T, K>) => void,
      fields?: K[]
    ): F => {
      return ((e?: FormEvent) => {
        e?.preventDefault();

        if (!validate(fields)) {
          return;
        }

        const values = { ...valuesRef.current };
        const data: Pick<T, K> = fields
          ? (Object.fromEntries(
              fields.map((key) => [key, values[key]])
            ) as Pick<T, K>)
          : (values as Pick<T, K>);

        handler(data);
      }) as F;
    },
    [validate]
  );

  return {
    getValues,
    register,
    setFieldValue,
    initializeValues,
    setFieldError,
    setFormError,
    setFormErrorListener,
    clearErrors,
    handleSubmit,
    validate,
  };
};

type UseFormReturn<T> = ReturnType<typeof useForm<T>>;

export type FormFieldRegister<T> = UseFormReturn<T>['register'];

export type FormSetFieldValue<T> = UseFormReturn<T>['setFieldValue'];

export type FormFieldController<T, V, K> = Omit<
  ReturnType<ReturnType<typeof useForm<T>>['register']>,
  'setValue'
> & {
  name: K;
  setValue: (value: V) => void;
};
