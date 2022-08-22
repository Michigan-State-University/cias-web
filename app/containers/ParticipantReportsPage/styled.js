import styled from 'styled-components';
import Row from 'components/Row';
import { maxQueries } from 'components/Container/mediaQuery';

export const StyledRow = styled(Row)`
  @media ${maxQueries.md} {
    flex-wrap: wrap;
  }
`;
