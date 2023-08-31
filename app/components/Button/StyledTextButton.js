import styled from 'styled-components';

import { hexToRgb } from 'theme';

import {
  margin,
  layout,
  text,
  padding,
  flex,
  style,
  svg,
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
  ${({ disabled }) => disabled && 'opacity: 0.7'};
  ${margin};
  ${layout};
  ${text};
  ${padding};
  ${flex};
  ${style};
  ${svg};
  ${({ outlined, color, disabled }) =>
    outlined &&
    `
    border: 1px dashed ${color};
    border-radius: 5px;
    padding: 6px 12px;
    ${
      !disabled &&
      `&:hover { background-color:
      rgba(${hexToRgb(color)}, 0.1);
    }`
    }
    `};
`;

export default StyledTextButton;
