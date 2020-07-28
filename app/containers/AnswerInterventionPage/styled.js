import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { elements } from 'theme';

const aspectRatio = 9 / 16;

export const QuestionActions = styled.div`
  margin: 20px 0;
  button {
    border: none;
  }
`;

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

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: ${aspectRatio * 100}%;
  height: 100%;
  width: 100%;
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ImageWrapper = styled.div`
  margin-top: 22px;
  width: 100%;
  height: 100%;
  max-width: 100%;
`;
