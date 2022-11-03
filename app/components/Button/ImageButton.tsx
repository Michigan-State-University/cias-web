import React, { PropsWithChildren } from 'react';

import Icon from 'components/Icon';

import { HoverTextButton } from './styled';

type Props = PropsWithChildren<{
  title: string;
  src: string;
  fill?: string;
  stroke?: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconProps?: object;
  showHoverEffect?: boolean;
  isActive?: boolean;
  styles?: object;
}> &
  Record<string, unknown>;

const ImageButton = React.forwardRef<HTMLElement, Props>(
  (
    {
      title,
      src,
      fill,
      stroke,
      disabled,
      onClick,
      loading,
      iconProps,
      showHoverEffect = false,
      isActive = false,
      styles = {},
      children,
      ...props
    }: Props,
    ref,
  ) => (
    <HoverTextButton
      // @ts-ignore
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      loaderProps={{
        height: 'auto',
        width: 'auto',
        'aria-label': `${title} loader`,
        ...props,
      }}
      buttonProps={{
        type: 'button',
        title,
        'aria-label': title,
        ...props,
      }}
      showHoverEffect={showHoverEffect}
      active={isActive}
      styles={styles}
    >
      {/* @ts-ignore */}
      <Icon src={src} fill={fill} stroke={stroke} {...iconProps}></Icon>
      {children}
    </HoverTextButton>
  ),
);

export { ImageButton };
