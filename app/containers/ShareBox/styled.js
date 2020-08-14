import styled from 'styled-components';

import Row from 'components/Row';
import TextButton from 'components/Button/TextButton';
import { margin } from 'components/BaseComponentStyles';
import { themeColors, borders, paddings, colors } from 'theme';

export const StyledChipsInput = styled.div`
  padding: ${paddings.small} 10px
    ${({ isInputFilled }) => (isInputFilled ? '7px' : '12px')} 10px;
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
  margin-left: 2px;
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
