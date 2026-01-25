import { clsx } from '../clsx';
import { TextInputWrapper } from './TextInputWrapper';
import type { MultilineTextInputProps } from './types';

export function MultilineTextInput<T>({
  id,
  disabled,
  readOnly,
  label,
  helper,
  placeholder,
  rows,
  onClick,
  controller: { ref, setErrorListener, setValue, name },
}: MultilineTextInputProps<T>) {
  return (
    <TextInputWrapper
      setErrorListener={setErrorListener}
      label={label}
      helper={helper}
    >
      {(className) => {
        return (
          <textarea
            ref={ref}
            onChange={
              setValue ? (e) => setValue(e.currentTarget.value) : undefined
            }
            id={id}
            rows={rows}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            onClick={onClick}
            placeholder={placeholder}
            className={clsx('w-full p-3', className)}
          />
        );
      }}
    </TextInputWrapper>
  );
}
