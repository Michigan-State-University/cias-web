// @ts-ignore
import styled from 'styled-components';

import { elements, colors, ZIndex, themeColors } from 'theme';

export type AnswerInterventionContentProps = {
  transparentBackground?: boolean;
};

// @ts-ignore
export const AnswerInterventionContent = styled.div<AnswerInterventionContentProps>`
  align-items: flex-start;
  border: 1px dashed ${colors.botticelli};
  display: flex;
  justify-content: center;
  max-width: ${elements.draggableContainerSize}px;
  min-height: ${elements.draggableContainerSize}px;
  position: relative;
  width: 100%;
  z-index: ${ZIndex.ANSWER_INTERVENTION_CONTENT};
  background-color: ${themeColors.sessionBackground};
`;

// @ts-ignore
export const AnswerOuterContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: fit-content;
  justify-content: flex-start;
  width: 100%;
`;
