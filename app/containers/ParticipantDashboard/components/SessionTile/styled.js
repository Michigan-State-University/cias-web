import styled from 'styled-components';

import Box from 'components/Box';
import Row from 'components/Row';
import StyledLink from 'components/StyledLink';

import { maxQueries } from 'components/Container/mediaQuery';

export const StyledBox = styled(Box)`
  width: 100%;
  margin-top: 20px;
  padding: 15px;
`;

export const StatusRow = styled(Row)`
  @media ${maxQueries.sm} {
    margin-top: 20px;
    margin-bottom: 10px;

    ${({ available }) =>
      available
        ? { justifyContent: 'center', [StyledLink]: { width: '80%' } }
        : { justifyContent: 'flex-start' }};
  }
`;
