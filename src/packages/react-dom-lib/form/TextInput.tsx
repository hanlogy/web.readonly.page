import clsx from 'clsx';
import { FlexCenter } from '../centers';
import { TextInputWrapper } from './TextInputWrapper';
import type { TextInputProps } from './types';

export const TextInput = <T,>({
  id,
  type = 'text',
  disabled,
  readOnly,
  label,
  helper,
  prefix,
  suffix,
  maxLength,
  placeholder,
  onClick,
  controller: { ref, setErrorListener, setValue, name },
}: TextInputProps<T>) => {
  return (
    <TextInputWrapper
      setErrorListener={setErrorListener}
      label={label}
      helper={helper}
    >
      {(className) => {
        const iconCommon = 'absolute top-2 h-10 w-10';

        return (
          <div className={clsx({ relative: prefix || suffix })}>
            <input
              ref={ref}
              onChange={
                setValue ? (e) => setValue(e.currentTarget.value) : undefined
              }
              id={id}
              name={name}
              type={type}
              maxLength={maxLength}
              disabled={disabled}
              readOnly={readOnly}
              onClick={onClick}
              placeholder={placeholder}
              className={clsx('h-14 w-full', className, {
                'text-gray-400': disabled,
                'pl-3': !prefix,
                'pr-3': !suffix,
                'pl-13': prefix,
                'pr-13': suffix,
              })}
            />
            {prefix && (
              <FlexCenter className={clsx(iconCommon, 'left-1')}>
                {prefix}
              </FlexCenter>
            )}
            {suffix && (
              <FlexCenter className={clsx(iconCommon, 'right-1')}>
                {suffix}
              </FlexCenter>
            )}
          </div>
        );
      }}
    </TextInputWrapper>
  );
};
