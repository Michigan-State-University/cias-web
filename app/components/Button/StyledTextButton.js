import styled from 'styled-components';

import {
  margin,
  layout,
  text,
  padding,
  flex,
} from 'components/BaseComponentStyles';

const StyledTextButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  padding: 2px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${margin};
  ${layout};
  ${text};
  ${padding};
  ${flex};
`;

export default StyledTextButton;
