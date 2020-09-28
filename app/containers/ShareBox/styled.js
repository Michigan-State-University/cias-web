import styled from 'styled-components';

import Row from 'components/Row';
import TextButton from 'components/Button/TextButton';
import { margin } from 'components/BaseComponentStyles';
import { themeColors, borders, paddings, colors } from 'theme';

export const StyledChipsInput = styled.div`
  padding: ${({ isInputFilled }) =>
    isInputFilled ? `8px 6px 3px 6px` : paddings.small};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${({ isFocused }) =>
    isFocused ? themeColors.primary : themeColors.highlight};
  border-radius: ${borders.borderRadius};
  width: 100%;
  background-color: ${colors.zirkon};
  ${margin};
`;

export const HiddenInput = styled.input`
  height: ${({ isInputFilled }) => (isInputFilled ? '31px' : '100%')};
  width: ${({ isInputFilled }) => (isInputFilled ? 'auto' : '100%')};
  border: none;
  outline: none;
  background-color: ${colors.zirkon};
  margin-left: ${({ isInputFilled }) => (isInputFilled ? '2px' : '0')};
  flex: 1;
`;

export const StyledTextButton = styled(TextButton)`
  display: none;
`;

export const HoverableRow = styled(Row)`
  &:hover {
    ${StyledTextButton} {
      display: block;
    }
  }
`;

export const InterventionIndex = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.surfieGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
