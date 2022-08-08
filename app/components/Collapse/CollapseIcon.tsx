import React from 'react';

import ConditionalWrapper from 'components/ConditionalWrapper';
import { ImageButton } from 'components/Button';
import Box from 'components/Box';

import { colors } from 'theme';

import { ActiveIcon } from './styled';

type Props = {
  icon: SVGElement;
  onClick?: () => void;
  active?: boolean;
  showHoverEffect?: boolean;
  title: string;
  disabled?: boolean;
  iconProps?: any;
  fill?: string;
  buttonProps?: object;
} & Record<string, unknown>;

export const CollapseIcon = ({
  icon,
  onClick,
  active,
  showHoverEffect,
  title,
  disabled,
  iconProps,
  fill,
  loading,
  buttonProps,
  ...styleProps
}: Props) => (
  <Box {...styleProps}>
    <ConditionalWrapper
      if={showHoverEffect && !disabled}
      with={ActiveIcon}
      wrapperProps={{ active, loading }}
    >
      <ImageButton
        src={icon}
        onClick={(e: React.MouseEvent) => {
          if (onClick) {
            e.stopPropagation();
            onClick();
          }
        }}
        title={title}
        fill={fill || colors.heather}
        disabled={disabled}
        iconProps={iconProps}
        loading={loading}
        {...buttonProps}
      />
    </ConditionalWrapper>
  </Box>
);

export default CollapseIcon;
