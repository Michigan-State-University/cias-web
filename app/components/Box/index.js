import styled from 'styled-components';
import { paddings } from 'theme';
import { layout, margin, padding } from '../BaseComponentStyles';

const Box = styled.div`
  width: auto;
  height: auto;
  padding: ${paddings.regular};
  ${layout};
  ${padding};
  ${margin}
`;

export default Box;
