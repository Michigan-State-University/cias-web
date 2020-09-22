import styled from 'styled-components';

import Box from 'components/Box';
import Row from 'components/Row';
import Column from 'components/Column';
import StyledTextButton from 'components/Button/StyledTextButton';
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

export const StyledColumn = styled(Column)`
  padding: 40px 30px;
  ${mediaQuery.laptop`
    padding: 20px 40px;
  `}
  ${mediaQuery.tablet`
    padding: 15px 20px;
  `}
`;

export const StyledRow = styled(Row)`
  margin-top: 50px;
  ${mediaQuery.tablet`
    margin-top: 25px;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const TextButton = styled(StyledTextButton)`
  margin-left: 25px;
  margin-top: 30px;
  ${mediaQuery.tablet`
    margin-left: 0;
    margin-top: 25px;
  `}
`;

export const StyledEmailBox = styled(Box)`
  width: 50%;
  ${mediaQuery.tablet`
    width: 100%;
  `}
`;

export const StyledTimezoneBox = styled(StyledEmailBox)`
  ${mediaQuery.tablet`
    margin-top: 20px;
  `}
`;
