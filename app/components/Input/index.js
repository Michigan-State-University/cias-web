import styled from 'styled-components';
import { themeColors, borders, paddings } from 'theme';
import { margin } from '../BaseComponentStyles';

const Input = styled.input`
  padding: ${paddings.small};
  border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.highlight};
  border-radius: ${borders.borderRadius};
  &:focus {
    box-shadow: none;
    outline: none;
    border: ${borders.borderWidth} ${borders.borderStyle} ${themeColors.primary};
  }
  ${margin};
`;

export { Input };
