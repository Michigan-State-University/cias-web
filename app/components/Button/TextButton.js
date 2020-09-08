import styled from 'styled-components';

import {
  margin,
  layout,
  text,
  padding,
  flex,
} from 'components/BaseComponentStyles';
import { themeColors } from 'theme';

const TextButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  color: ${themeColors.secondary};
  cursor: pointer;
  ${margin};
  ${layout};
  ${text};
  ${padding};
  ${flex};
`;

export default TextButton;
