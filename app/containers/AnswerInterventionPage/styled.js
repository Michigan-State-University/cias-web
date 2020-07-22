import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { elements } from 'theme';

const aspectRatio = 9 / 16;

export const PlayerWrapper = styled.div`
  margin-top: 22px;
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

export const AnswerInterventionContainer = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const AnswerInterventionContent = styled.div`
  max-width: ${elements.draggableContainerSize}px;
  width: 100%;
  max-height: ${elements.draggableContainerSize}px;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnswerContent = styled.div`
  width: 400px;
`;

export const QuestionActions = styled.div`
  margin: 20px 0;
  button {
    border: none;
  }
`;

export const QuestionTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

export const QuestionSubtitle = styled.div`
  font-size: 1rem;
`;

export const QuestionOption = styled.div`
  font-weight: normal;
  font-size: 1rem;
`;

export const BackButton = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;
