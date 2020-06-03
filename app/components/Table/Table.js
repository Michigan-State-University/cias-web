import styled from 'styled-components';
import { fontSizes } from 'theme';
import { layout } from '../BaseComponentStyles';

const Table = styled.table`
  font-size: ${fontSizes.small};

  tr,
  th,
  td {
    font-weight: 400;
  }
  ${layout};
`;

export { Table };
