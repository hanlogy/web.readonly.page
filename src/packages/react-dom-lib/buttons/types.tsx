import type { MouseEventHandler, ReactNode } from 'react';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonType = 'submit' | 'button' | 'reset';

export interface ButtonProps {
  readonly children: ReactNode;
  readonly removeSpace?: boolean;
  readonly type?: ButtonType;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly isCenter?: boolean;
  readonly icon?: ReactNode;
  readonly onClick?: MouseEventHandler<HTMLButtonElement> | VoidFunction;
}

export type IconButtonWidth = 'narrow' | 'regular' | 'wide';

export type IconButtonProps = Omit<
  ButtonProps,
  'removeSpace' | 'isCenter' | 'icon'
> & {
  readonly width?: IconButtonWidth;
};
