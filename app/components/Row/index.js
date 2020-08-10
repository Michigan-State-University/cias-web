import styled from 'styled-components';
import {
  flex,
  margin,
  layout,
  padding,
  border,
  style,
} from '../BaseComponentStyles';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  ${flex};
  ${margin};
  ${padding};
  ${layout};
  ${border};
  ${style};
`;

export default Row;
