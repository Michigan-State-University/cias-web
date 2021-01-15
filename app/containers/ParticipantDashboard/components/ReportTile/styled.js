import styled from 'styled-components';
import Box from 'components/Box';
import Row from 'components/Row';
import { maxQueries } from 'components/Container/mediaQuery';

export const StyledBox = styled(Box)`
  width: 100%;
  margin-top: 20px;
  padding: 22px;
`;

export const DownloadRow = styled(Row)`
  justify-content: flex-end;
  white-space: nowrap;

  @media ${maxQueries.sm} {
    justify-content: flex-start;
    margin-top: 20px;
  }
`;
