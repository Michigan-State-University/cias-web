import styled from 'styled-components';
import { colors, borders, paddings } from 'theme';
import { Margin } from '../Margin';

const Input = Margin(styled.input`
  padding: ${paddings.small};
  border: ${borders.borderWidth} ${borders.borderStyle} ${colors.highlight};
  &:focus {
    box-shadow: none;
    outline: ${borders.borderWidth} ${borders.borderStyle} ${colors.primary};
  }
`);

export { Input };
