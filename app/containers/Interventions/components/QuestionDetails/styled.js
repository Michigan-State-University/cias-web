import styled from 'styled-components';

import { elements } from 'theme';

const AnswerOuterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: ${elements.draggableContainerSize}px;
  height: 100%;
  position: relative;
  z-index: 0;
`;

const AnswerOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: ${props => props.flexDirection || 'row'};
  height: fit-content;
`;

export { AnswerOuterContainer, AnswerOuterContent };
