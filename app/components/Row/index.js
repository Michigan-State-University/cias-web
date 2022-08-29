import styled from 'styled-components';
import {
  flex,
  margin,
  layout,
  padding,
  border,
  style,
  positioning,
} from '../BaseComponentStyles';

const Row = styled.div.attrs((props) => ({
  onClick: props.disabled ? null : props.onClick,
}))`
  display: flex;
  flex-direction: row;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  ${flex};
  ${margin};
  ${padding};
  ${layout};
  ${border};
  ${style};
  ${positioning};
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
`;

export default Row;
