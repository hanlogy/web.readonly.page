import { IconContainer } from '../IconContainer';
import { clsx } from '../clsx';
import { Button } from './Button';
import type { IconButtonProps } from './types';

const widthMap = {
  narrow: {
    xsmall: 'w-7',
    small: 'y-8',
    medium: 'y-12',
    large: 'px-16',
    xlarge: 'px-26',
  },
  wide: {
    xsmall: 'w-10',
    small: 'y-13',
    medium: 'y-18',
    large: 'px-32',
    xlarge: 'px-46',
  },
} as const;

const iconSizeMap = {
  xsmall: 'small',
  small: 'medium',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
} as const;

export function IconButton({
  children,
  className,
  width = 'regular',
  size = 'small',
  ...buttonProps
}: IconButtonProps) {
  const classNameResolved = clsx(
    className,
    width === 'regular' ? 'aspect-square' : widthMap[width][size]
  );

  return (
    <Button
      {...buttonProps}
      className={classNameResolved}
      removeSpace={true}
      size={size}
    >
      <IconContainer size={iconSizeMap[size]}>{children}</IconContainer>
    </Button>
  );
}
