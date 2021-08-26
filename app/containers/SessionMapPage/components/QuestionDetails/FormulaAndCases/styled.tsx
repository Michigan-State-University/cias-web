import { FunctionComponent } from 'react';

// @ts-ignore
import styled from 'styled-components';

import { colors, fontWeights } from 'theme';

// @ts-ignore
export const FormulaChip: FunctionComponent = styled.div`
  background-color: ${colors.orangePeel}10;
  color: ${colors.orangePeel};
  border-radius: 4px;
  padding: 7px 14px 7px 14px;
  font-weight: ${fontWeights.bold};
`;
