import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

import { borders, colors } from 'theme';

import { BRUSH_HEIGHT, BRUSH_Y_OFFSET } from './constants';

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  .recharts-wrapper {
    cursor: inherit !important;

    .recharts-surface {
      overflow: inherit !important;

      .recharts-layer {
        &.recharts-brush {
          rect {
            stroke: transparent;
            rx: 3px;
          }

          .recharts-brush-slide {
            fill: ${colors.black20};
            fill-opacity: 1;
            border-radius: ${borders.borderRadius};
            height: ${BRUSH_HEIGHT}px;
            transform: translateY(${BRUSH_Y_OFFSET}px);
          }

          .recharts-brush-texts {
            display: none;
          }

          .recharts-brush-traveller {
            display: none;
          }
        }
      }
    }
  }
`;
