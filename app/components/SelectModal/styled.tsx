// @ts-ignore
import styled from 'styled-components';

import { colors, themeColors } from 'theme';

// @ts-ignore
export const SelectModalButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${themeColors.highlight};
  background: none;

  &:hover {
    background: ${colors.aliceBlue};
  }
`;
