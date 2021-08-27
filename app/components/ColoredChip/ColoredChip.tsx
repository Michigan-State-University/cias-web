import { FunctionComponent } from 'react';

// @ts-ignore
import styled from 'styled-components';

import { fontWeights } from 'theme';

export type ColoredChipProps = {
  color: string;
};

// @ts-ignore
export const ColoredChip: FunctionComponent<ColoredChipProps> = styled.div`
  color: ${({ color }: ColoredChipProps) => color};
  background-color: ${({ color }: ColoredChipProps) => `${color}10`};
  border-radius: 4px;
  padding: 7px 14px 7px 14px;
  font-weight: ${fontWeights.bold};
`;
