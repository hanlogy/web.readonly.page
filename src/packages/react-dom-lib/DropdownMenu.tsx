import type { ReactNode } from 'react';
import { Dropdown, type DropdownProps } from './Dropdown';
import { Button } from './buttons/Button';

export interface DropdownMenuOption<T> {
  readonly label: string;
  readonly value: T;
  readonly icon?: ReactNode;
}

type DropdownMenuProps<T> = Omit<DropdownProps, 'children'> & {
  readonly onSelect: (value: T) => void;
  readonly options: readonly DropdownMenuOption<T>[];
};

export function DropdownMenu<T>({
  alignment,
  button,
  options,
  onSelect,
}: DropdownMenuProps<T>) {
  return (
    <Dropdown alignment={alignment} button={button}>
      {(close) => {
        return (
          <div className="flex flex-col items-start p-1">
            {options.map(({ value, icon, label }) => {
              return (
                <Button
                  isCenter={false}
                  icon={icon}
                  onClick={() => {
                    onSelect(value);
                    close();
                  }}
                  className="block w-full hover:bg-gray-100 active:bg-gray-200"
                  key={String(value)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        );
      }}
    </Dropdown>
  );
}
