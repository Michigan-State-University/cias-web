import { FunctionComponent } from 'react';

// @ts-ignore
import styled from 'styled-components';

import { colors, fontWeights } from 'theme';

// @ts-ignore
export const ChipsContainer: FunctionComponent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

// @ts-ignore
export const Chip: FunctionComponent = styled.div`
  display: flex;
`;

// @ts-ignore
export const Variable: FunctionComponent = styled.div`
  background-color: ${colors.jungleGreen}10;
  color: ${colors.jungleGreen};
  border-radius: 4px 0 0 4px;
  padding: 7px 14px 7px 14px;
  border-right: 1px solid ${colors.botticelli};
  font-weight: ${fontWeights.bold};
`;

// @ts-ignore
export const Score: FunctionComponent = styled.div`
  background-color: ${colors.azure}10;
  color: ${colors.azure};
  border-radius: 0 4px 4px 0;
  padding: 7px 14px 7px 14px;
  font-weight: ${fontWeights.bold};
`;
