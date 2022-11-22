import styled from 'styled-components';
import { fontSizes, fontFamily, lineHeights, colors } from 'theme';
import {
  margin,
  text,
  layout,
  style,
  positioning,
} from '../BaseComponentStyles';

const Text = styled.p.attrs((props) => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  font-family: ${fontFamily};
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  ${margin};
  ${text};
  ${layout};
  ${style};
  ${positioning};
  ${({ disabled }) =>
    disabled && { color: colors.grey, cursor: 'not-allowed' }};
`;

export default Text;
