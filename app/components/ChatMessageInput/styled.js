import styled from 'styled-components';

import { boxShadows, borders, colors, themeColors } from 'theme';

import TextArea from 'components/Input/TextArea';

export const StyledTextArea = styled(TextArea)`
  padding: 12px 42px 12px 16px;
  font-size: 13px;
  line-height: 19px;
  width: 100%;
  height: 100%;
  box-shadow: ${boxShadows.selago};
  border-radius: 8px;
  border-width: ${borders.borderWidth};
  border-style: ${borders.borderStyle};
  border-color: ${({ error }) =>
    error ? themeColors.warning : colors.beauBlue};

  &:focus {
    border-color: ${({ error }) =>
      error ? themeColors.warning : themeColors.primary};
  }
`;
