import React, { memo } from 'react';

import { colors } from 'theme';

import Box from 'components/Box';
import Text from 'components/Text';

type Props = {
  text: string;
  color: string;
  active: boolean;
  onClick: (text: string) => void;
};

const Component = ({ text, color, active, onClick }: Props) => (
  <Box
    display="inline-flex"
    width="max-content"
    bg={!active ? colors.grey : color}
    justify="center"
    align="center"
    px={10}
    py={5}
    clickable={!!onClick}
    onClick={onClick}
  >
    <Text fontWeight="bold" fontSize={14} color={colors.white}>
      {text}
    </Text>
  </Box>
);

export const FilterTile = memo(Component);
