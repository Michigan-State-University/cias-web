import styled from 'styled-components';

import Box from 'components/Box';
import { boxShadows, colors } from 'theme';

export const StyledBox = styled(Box)`
  box-shadow: ${boxShadows.selago};
  background-color: ${colors.white};
`;
