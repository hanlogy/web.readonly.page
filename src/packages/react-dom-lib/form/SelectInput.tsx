import { useState, type ReactNode } from 'react';
import { IconContainer } from '../IconContainer';
import { FlexCenter } from '../centers';
import { clsx } from '../clsx';
import { Dialog } from '../dialog/Dialog';
import { useDialog } from '../dialog/hooks';
import type { CloseDialogFn } from '../dialog/types';
import { TextInputWrapper } from './TextInputWrapper';
import type {
  SelectInputOption,
  SelectInputOptionGroup,
  SelectInputProps,
} from './types';

export function SelectInput<T, V>({
  label,
  helper,
  options,
  placeholder,
  controller: { ref, setErrorListener, setValue, name },
  trailingIcon,
  selectedIcon,
  unselectedIcon,
}: SelectInputProps<T, V, string>) {
  const [localValue, setLocalValue] = useState<V | undefined>();
  const { openDialog } = useDialog();

  return (
    <TextInputWrapper
      setErrorListener={setErrorListener}
      label={label}
      helper={helper}
    >
      {(className) => {
        return (
          <>
            <input
              hidden
              onInput={(v) => {
                setLocalValue(v.currentTarget.value as V);
              }}
              name={name}
              ref={ref}
            />
            <div
              className="relative cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                const result = await openDialog<
                  SelectInputOption<V> | undefined
                >(({ closeDialog }) => (
                  <SelectOptionDialog
                    value={localValue}
                    closeDialog={closeDialog}
                    selectedIcon={selectedIcon}
                    unselectedIcon={unselectedIcon}
                    label={label}
                    options={options}
                  />
                ));
                if (result) {
                  setLocalValue(result.value);
                  setValue?.(result.value);
                }
              }}
            >
              <input
                className={clsx(
                  'h-14 w-full cursor-pointer pr-13 pl-3',
                  className
                )}
                defaultValue={
                  options
                    .filter((e) => 'value' in e)
                    .find((e) => e.value === localValue)?.label
                }
                placeholder={placeholder}
                readOnly
              />
              <FlexCenter className="absolute top-2 right-1 h-10 w-10">
                {trailingIcon && <IconContainer>{trailingIcon}</IconContainer>}
              </FlexCenter>
            </div>
          </>
        );
      }}
    </TextInputWrapper>
  );
}

function SelectOptionDialog<T>({
  label,
  value: selectedValue,
  options,
  closeDialog,
  selectedIcon,
  unselectedIcon,
}: {
  label?: ReactNode;
  value?: T;
  options: (SelectInputOption<T> | SelectInputOptionGroup)[];
  closeDialog: CloseDialogFn<SelectInputOption<T> | undefined>;
  selectedIcon?: ReactNode;
  unselectedIcon?: ReactNode;
}) {
  return (
    <Dialog title={label} withHorizontalPadding={false}>
      {options.map((option, index) => {
        if ('value' in option) {
          const isSelected = option.value === selectedValue;
          return (
            <button
              onClick={() => closeDialog(option)}
              key={String(option.value)}
              className="ext-gray-800 flex w-full cursor-pointer px-6 py-2 text-left hover:bg-gray-100"
            >
              <IconContainer>
                {isSelected ? selectedIcon : unselectedIcon}
              </IconContainer>
              <div className="ml-2">
                <div
                  className={clsx({
                    'font-semibold': option.description,
                  })}
                >
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-gray-500">{option.description}</div>
                )}
              </div>
            </button>
          );
        } else {
          return (
            <div
              key={`group-${option.label}`}
              className={clsx('mb-2 pl-6 text-sm font-semibold text-gray-500', {
                'mt-4': index !== 0,
              })}
            >
              {option.label}
            </div>
          );
        }
      })}
    </Dialog>
  );
}
