import styled from 'styled-components';
import { Row as GRow } from 'react-grid-system';

import { margin, layout, style, flex } from 'components/BaseComponentStyles';

export const Row = styled(GRow)`
  ${layout};
  ${margin};
  ${style};
  ${flex};
`;

export const NoMarginRow = styled(Row)`
  margin: 0 !important;
`;
