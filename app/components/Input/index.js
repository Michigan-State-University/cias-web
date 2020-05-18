import styled from 'styled-components';
import { colors, borders } from 'theme';

const Input = styled.input`
  border: ${borders.borderWidth} ${borders.borderStyle} ${colors.highlight};
  &:focus {
    box-shadow: none;
    outline: ${borders.borderWidth} ${borders.borderStyle} ${colors.primary};
  }
`;

export { Input };
