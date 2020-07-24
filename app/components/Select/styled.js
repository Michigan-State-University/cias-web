import styled from 'styled-components';

import { themeColors } from 'theme';

export const OptionContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  ${({ isFocused }) => isFocused && `background: ${themeColors.highlight};`}
  cursor: pointer;
`;
