import styled from 'styled-components';

import { mediaQuery } from 'theme';

import Box from 'components/Box';

export const StyledBox = styled(Box)`
  padding: 64px 160px;
  ${mediaQuery.laptop`
    padding: 64px 80px;
  `}
  ${mediaQuery.tablet`
    padding: 64px 40px;
  `}
  ${mediaQuery.mobile`
    padding: 64px 20px;
  `}
`;
