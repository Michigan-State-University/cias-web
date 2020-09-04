import styled from 'styled-components';

import Box from 'components/Box';
import { mediaQuery } from 'theme';

export const StyledBox = styled(Box)`
  ${mediaQuery.mobile`
    max-height: calc(100% - 20px);
    max-width: none;
    min-width: 0;
    width: calc(100% - 20px);
  `}
`;
