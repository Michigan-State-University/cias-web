import styled from 'styled-components';
import { text } from '../BaseComponentStyles';

export const LI = styled.li`
  list-style-type: circle;
  ${({ inside }) => (inside ? 'list-style-position: inside;' : '')}
`;

export const UL = styled.ul`
  padding: 0;
  ${text}
`;

export default { UL, LI };
