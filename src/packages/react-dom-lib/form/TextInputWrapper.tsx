import { useEffect, useState } from 'react';
import { clsx } from '../clsx';
import type { TextInputWrapperProps } from './types';

// It is mostly align with M3 design, but still keep some of our design
// pholosipy
export function TextInputWrapper({
  label,
  helper,
  error: defaultError,
  children,
  setErrorListener,
}: TextInputWrapperProps) {
  const [error, setError] = useState(defaultError);

  useEffect(() => {
    setErrorListener?.(setError);
  }, [setErrorListener]);

  return (
    <div className="text-left">
      {label && (
        // We do not use label tag here, otherwise we need to manage the ids.
        <div className="mb-1 block pl-3 font-medium text-gray-600">{label}</div>
      )}

      {typeof children === 'function'
        ? children(
            clsx(
              'outline-none appearance-none rounded-2xl border focus-within:ring-2',
              {
                'border-red-500 bg-red-50 focus-within:ring-red-500': error,
                'focus-within:ring-brand border-gray-300 bg-gray-100 text-gray-700':
                  !error,
              }
            )
          )
        : children}

      {helper && (
        <div
          className={clsx('mt-1 px-3 text-sm', {
            'text-gray-500': !error,
            'text-red-500': error,
          })}
        >
          {helper}
        </div>
      )}

      {error && (
        <div className="mt-1 px-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
