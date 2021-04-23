import styled from 'styled-components';
import { Container as GContainer } from 'react-grid-system';

import { margin, layout } from 'components/BaseComponentStyles';

export const Container = styled(GContainer)`
  ${layout};
  ${margin};
`;
