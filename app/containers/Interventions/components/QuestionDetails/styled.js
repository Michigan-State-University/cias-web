import styled from 'styled-components';

import { elements } from 'theme';

const AnswerOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const AnswerOuterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${elements.draggableContainerSize}px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
`;

export { AnswerOuterContainer, AnswerOuterContent };
