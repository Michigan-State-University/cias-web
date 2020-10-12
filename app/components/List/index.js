import styled from 'styled-components';
import { text } from '../BaseComponentStyles';

export const LI = styled.li`
  list-style: none;
`;
export const UL = styled.ul`
  padding: 0;
  ${text}
`;

export default { UL, LI };
