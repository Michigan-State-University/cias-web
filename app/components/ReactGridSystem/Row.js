import styled from 'styled-components';
import { Row as GRow } from 'react-grid-system';

import { margin, layout, style } from 'components/BaseComponentStyles';

export const Row = styled(GRow)`
  ${layout};
  ${margin};
  ${style};
`;

export const NoMarginRow = styled(Row)`
  margin: 0 !important;
`;
