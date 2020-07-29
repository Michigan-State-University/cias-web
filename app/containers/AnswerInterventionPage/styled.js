import styled from 'styled-components';
import { elements } from 'theme';

export const BackButton = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;

export const AnswerInterventionContent = styled.div`
  max-width: ${elements.draggableContainerSize}px;
  max-height: ${elements.draggableContainerSize}px;
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const AnswerOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: ${props => props.flexDirection || 'row'};
  height: fit-content;
  position: relative;
  margin-top: 50px;
`;
