import { useEffect, useState } from 'react';
import { clsx } from '../clsx';
import type { FormErrorListener } from './types';

export function FormErrorMessage({
  setListener,
  className,
}: {
  setListener: (listener: FormErrorListener) => void;
  className?: string;
}) {
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    setListener(setError);
  }, [setListener]);

  return (
    error && (
      <div className={clsx('text-center text-red-500', className)}>{error}</div>
    )
  );
}
