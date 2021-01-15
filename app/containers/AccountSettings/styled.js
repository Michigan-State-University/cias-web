import styled from 'styled-components';

import Box from 'components/Box';
import { mediaQuery } from 'theme';

export const StyledBox = styled(Box)`
  padding: 60px 160px;
  ${mediaQuery.laptop`
    padding: 30px 80px;
  `}
  ${mediaQuery.tablet`
    padding: 15px 40px;
  `}
  ${mediaQuery.mobile`
    padding: 15px 20px;
  `}
`;
