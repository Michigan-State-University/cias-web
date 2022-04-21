import { FunctionComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import { colors } from 'theme';

// @ts-ignore
export const ShowHiddenContentButton: FunctionComponent = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-width: 0;
  background-color: ${colors.white};
  border-radius: 0 5px 5px 0;
  width: 40px;
  height: 40px;
`;
