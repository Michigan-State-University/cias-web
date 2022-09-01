import React from 'react';

import { colors } from 'theme';

import Box from 'components/Box';
import StyledCircle from 'components/Circle/StyledCircle';

import { FONT_SIZE_TO_CIRCLE_SIZE_RATIO } from './constants';

export type Props = {
  count: number;
  limit?: number;
  size: number;
} & Record<string, unknown>;

export const CircleCounter = ({ count, limit = 9, size, ...props }: Props) => (
  <Box flexShrink={0}>
    <StyledCircle
      bg={colors.vermilion}
      color={colors.white}
      fontWeight="bold"
      size={`${size}px`}
      fontSize={`${size * FONT_SIZE_TO_CIRCLE_SIZE_RATIO}px`}
      {...props}
    >
      {count > limit ? `${limit}+` : count}
    </StyledCircle>
  </Box>
);
