import React, { ComponentProps, FunctionComponent } from 'react';

// @ts-ignore
import styled from 'styled-components';

import { colors } from 'theme';

import { ColoredChip } from './ColoredChip';

// @ts-ignore
const DoubleColoredChipContainer: FunctionComponent = styled.div`
  display: flex;
`;

// @ts-ignore
const LeftChip: FunctionComponent<ComponentProps<typeof ColoredChip>> = styled(
  ColoredChip,
)`
  border-radius: 4px 0 0 4px;
  border-right: 1px solid ${colors.botticelli};
`;

// @ts-ignore
const RightChip: FunctionComponent<ComponentProps<typeof ColoredChip>> = styled(
  ColoredChip,
)`
  border-radius: 0 4px 4px 0;
`;

export type DoubleColoredChipProps = {
  leftChipColor: string;
  leftChipContent: string;
  rightChipColor: string;
  rightChipContent: string;
};

export const DoubleColoredChip = ({
  leftChipColor,
  leftChipContent,
  rightChipColor,
  rightChipContent,
}: DoubleColoredChipProps): JSX.Element => (
  <DoubleColoredChipContainer>
    <LeftChip color={leftChipColor}>{leftChipContent}</LeftChip>
    <RightChip color={rightChipColor}>{rightChipContent}</RightChip>
  </DoubleColoredChipContainer>
);
