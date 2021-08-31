import { FunctionComponent } from 'react';

// @ts-ignore
import styled from 'styled-components';

import { fontWeights } from 'theme';

type Props = {
  color: string;
};

// @ts-ignore
export const ColoredChip: FunctionComponent<Props> = styled.div`
  color: ${({ color }: Props) => color};
  background-color: ${({ color }: Props) => `${color}10`};
  border-radius: 4px;
  padding: 7px 14px 7px 14px;
  font-weight: ${fontWeights.bold};
`;
