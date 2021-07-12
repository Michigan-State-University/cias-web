import styled from 'styled-components';
import { Container as GContainer } from 'react-grid-system';

import {
  margin,
  layout,
  padding,
  flex,
  positioning,
} from 'components/BaseComponentStyles';

export const Container = styled(GContainer)`
  ${layout};
  ${margin};
  ${padding};
  ${positioning};
  ${flex};
`;

export const FullWidthContainer = styled(Container)`
  max-width: 100% !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
`;
