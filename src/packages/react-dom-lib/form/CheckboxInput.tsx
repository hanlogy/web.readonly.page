import { FlexCenter } from '../centers';
import type { CheckoxInputProps } from './types';

export function CheckboxInput<T>({
  label,
  onClick,
  readOnly,
  disabled,
  controller: { ref, setValue, name },
}: CheckoxInputProps<T>) {
  return (
    <label className="flex pt-2 text-gray-600">
      <FlexCenter className="h-6">
        <input
          ref={ref}
          className="mr-2"
          onChange={(e) => {
            setValue?.(e.currentTarget.checked);
          }}
          onClick={onClick}
          name={name}
          type="checkbox"
          readOnly={readOnly}
          disabled={disabled}
        />
      </FlexCenter>
      <div>{label}</div>
    </label>
  );
}
