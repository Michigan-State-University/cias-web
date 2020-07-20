import styled from 'styled-components';

import { elements, colors } from 'theme';

const AnswerOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AnswerOuterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${elements.draggableContainerSize}px;
  max-height: ${elements.draggableContainerSize}px;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${colors.linkWater};
  z-index: 0;
`;

export { AnswerOuterContainer, AnswerOuterContent };
