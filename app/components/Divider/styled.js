import styled from 'styled-components';
import { colors } from 'theme';
import { margin } from '../BaseComponentStyles';

export const StyledDivider = styled.div`
  height: 0;
  flex: 1;
  border: 1px solid ${colors.botticelli};
  ${margin}
`;
