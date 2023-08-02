import styled from 'styled-components';
import { fontSizes } from 'theme';
import { layout, margin, style } from '../BaseComponentStyles';

const Table = styled.table`
  font-size: ${fontSizes.small};

  tr,
  th,
  td {
    font-weight: 400;
  }

  ${layout};
  ${margin};
  ${style};
  ${({ tableLayout }) => tableLayout && `table-layout: ${tableLayout};`}
`;

export { Table };
