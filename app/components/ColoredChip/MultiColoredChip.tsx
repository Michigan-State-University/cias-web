import React, { ComponentProps, FunctionComponent, ReactNode } from 'react';
import isNil from 'lodash/isNil';

// @ts-ignore
import styled from 'styled-components';

import { colors } from 'theme';

import { ColoredChip } from './ColoredChip';

// @ts-ignore
const MultiColoredChipContainer: FunctionComponent = styled.div`
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

// @ts-ignore
const MiddleChip: FunctionComponent<
  ComponentProps<typeof ColoredChip>
> = styled(ColoredChip)`
  border-radius: 0;
  border-right: 1px solid ${colors.botticelli};
`;

type MultiColoredChipProps = {
  leftChipColor: string;
  leftChipContent: ReactNode;
  rightChipColor: string;
  rightChipContent: ReactNode;
  middleChipColor?: string;
  middleChipContent?: ReactNode;
};

export const MultiColoredChip = ({
  leftChipColor,
  leftChipContent,
  rightChipColor,
  rightChipContent,
  middleChipColor,
  middleChipContent,
}: MultiColoredChipProps): JSX.Element => (
  <MultiColoredChipContainer>
    <LeftChip color={leftChipColor}>{leftChipContent}</LeftChip>
    {middleChipColor && !isNil(middleChipContent) && (
      <MiddleChip color={middleChipColor}>{middleChipContent}</MiddleChip>
    )}
    <RightChip color={rightChipColor}>{rightChipContent}</RightChip>
  </MultiColoredChipContainer>
);
