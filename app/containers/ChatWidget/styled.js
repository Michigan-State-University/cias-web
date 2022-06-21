import styled from 'styled-components';

import Box from 'components/Box';

import { mediaQuery } from 'theme';

export const Container = styled(Box)`
  position: fixed;
  bottom: 56px;
  right: 56px;
  ${mediaQuery.tablet`
    bottom: 0;
    right: 0;
    `}
`;
