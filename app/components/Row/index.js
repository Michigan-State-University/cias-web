import styled from 'styled-components';
import { flex, margin, layout, padding, border } from '../BaseComponentStyles';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${flex};
  ${margin};
  ${padding};
  ${layout};
  ${border};
`;

export default Row;
