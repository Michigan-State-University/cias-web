import { TlfbQuestionDTO } from 'models/Question';
import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const tlfbQuestionsReducer = (
  question: TlfbQuestionDTO,
  payload: { data: { value: string }; type: string },
) => {
  switch (payload.type) {
    case UPDATE_QUESTION_TITLE: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.question_title = value;
      return question;
    }

    case UPDATE_HEAD_QUESTION: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.head_question = value;
      return question;
    }

    case UPDATE_SUBSTANCE_QUESTION: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.substance_question = value;
      return question;
    }

    default:
      return question;
  }
};

export default tlfbQuestionsReducer;
