import styled from 'styled-components';
import { flex, margin, layout } from '../BaseComponentStyles';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${flex};
  ${margin};
  ${layout};
`;

export default Row;
