import styled from 'styled-components';

import { themeColors, borders, paddings, colors } from 'theme';

import Row from 'components/Row';
import TextButton from 'components/Button/TextButton';
import { margin } from 'components/BaseComponentStyles';
import Input from 'components/Input';

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

export const HiddenInput = styled(Input)`
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
  margin-left: 20px;
`;

export const HoverableRow = styled(Row)`
  &:hover {
    ${StyledTextButton} {
      display: block;
    }
  }
`;

export const SessionIndex = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.jungleGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-width: 30px;
`;
