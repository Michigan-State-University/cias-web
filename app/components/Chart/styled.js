import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { themeColors } from 'theme';

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  .recharts-wrapper {
    cursor: inherit !important;

    svg {
      overflow: inherit !important;
    }
  }
  g.recharts-layer.recharts-brush-traveller {
    display: none;
  }
  .recharts-brush-slide {
    fill: ${themeColors.secondary};
    fill-opacity: 0.7;
  }
`;
