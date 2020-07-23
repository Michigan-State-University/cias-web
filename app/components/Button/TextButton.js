import styled from 'styled-components';

import { margin } from 'components/BaseComponentStyles';
import { themeColors } from 'theme';

const TextButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  padding: 2px;
  color: ${themeColors.secondary};
  cursor: pointer;
  ${margin};
`;

export default TextButton;
