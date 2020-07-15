import styled from 'styled-components';

export const AnswerInterventionContainer = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
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
