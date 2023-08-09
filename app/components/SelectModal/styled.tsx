// @ts-ignore
import styled from 'styled-components';

import { colors, themeColors } from 'theme';

export type SelectModalButtonProps = {
  disabled?: boolean;
};

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

  ${({ disabled }: SelectModalButtonProps) =>
    disabled
      ? 'cursor: not-allowed; opacity: 0.5;'
      : `&:hover {
           background: ${colors.aliceBlue};
         }`}
`;
