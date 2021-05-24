import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  .recharts-wrapper {
    cursor: inherit !important;

    svg {
      overflow: inherit !important;
    }
  }
`;
