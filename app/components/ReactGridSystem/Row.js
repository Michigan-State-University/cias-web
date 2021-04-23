import styled from 'styled-components';
import { Row as GRow } from 'react-grid-system';

import { margin, layout } from 'components/BaseComponentStyles';

export const Row = styled(GRow)`
  ${layout};
  ${margin};
`;
