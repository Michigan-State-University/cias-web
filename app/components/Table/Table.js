import styled from 'styled-components';
import { fontSizes } from 'theme';

const Table = styled.table`
  font-size: ${fontSizes.small};

  tr,
  th,
  td {
    font-weight: 400;
  }
`;

export { Table };
