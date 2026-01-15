import clsx from 'clsx';
import { IconContainer, type IconSize } from '../IconContainer';
import type { ButtonProps, ButtonSize } from './types';

// Small buttons need bigger target area.
const smallCommon =
  'text-sm font-medium relative before:absolute before:left-0 before:right-0 before:content-[""]';

const buttonClassNameMap: Record<ButtonSize, string> = {
  xsmall: `h-8 before:-top-2 before:-bottom-2 ${smallCommon}`,
  small: `h-10 before:-top-1 before:-bottom-1 ${smallCommon}`,
  medium: 'h-14 font-medium',
  large: 'h-24 text-2xl',
  // font-size is 32px in m3.
  xlarge: 'h-34 text-3xl',
};

const buttonSpaceMap: Record<ButtonSize, string> = {
  xsmall: 'px-3',
  small: 'px-4',
  medium: 'px-6',
  large: 'px-12',
  xlarge: 'px-16',
};

const leadingIconSizeMap: Record<ButtonSize, IconSize> = {
  xsmall: 'small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};

export function Button({
  icon,
  children,
  removeSpace = false,
  type = 'button',
  size = 'small',
  disabled = false,
  className,
  onClick,
  isCenter = true,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex cursor-pointer items-center rounded-full transition-colors',
        buttonClassNameMap[size],
        className,
        {
          [buttonSpaceMap[size]]: !removeSpace,
          'justify-center': isCenter,
        }
      )}
    >
      {icon && (
        <IconContainer
          size={leadingIconSizeMap[size]}
          className="mr-1 flex-none"
        >
          {icon}
        </IconContainer>
      )}
      {children}
    </button>
  );
}
