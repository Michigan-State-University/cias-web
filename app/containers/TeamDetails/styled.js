import styled from 'styled-components';
import Box from 'components/Box';
import { boxShadows, colors, mediaQuery } from 'theme';
import Row from 'components/Row';
import StyledTextButton from 'components/Button/StyledTextButton';

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

export const CardBox = styled(Box)`
  width: 100%;
  background-color: ${colors.white};
  padding: 30px;
  box-shadow: ${boxShadows.selago};
  margin-top: 20px;
`;
