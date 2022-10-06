import styled from 'styled-components';

import { borders, colors, themeColors } from 'theme';

import TextArea from 'components/Input/TextArea';

const getBorderColor = ({ error, disabled }) => {
  if (disabled) return colors.linkWater;
  if (error) return themeColors.warning;
  return colors.beauBlue;
};

export const StyledTextArea = styled(TextArea)`
  padding: 12px 42px 12px 16px;
  font-size: 13px;
  line-height: 19px;
  width: 100%;
  height: 100%;
  box-shadow: ${({ disabled }) =>
    disabled ? '' : `0 4px 20px ${colors.selago}`};
  border-radius: 8px;
  border-width: ${borders.borderWidth};
  border-style: ${borders.borderStyle};
  border-color: ${getBorderColor};
  background-color: ${({ disabled }) =>
    disabled ? colors.linkWater : colors.white};

  &:focus {
    border-color: ${({ error }) =>
      error ? themeColors.warning : themeColors.primary};
  }
`;
