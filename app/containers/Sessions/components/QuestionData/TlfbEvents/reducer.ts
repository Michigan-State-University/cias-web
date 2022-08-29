import { TlfbEventsDTO } from 'models/Question';
import { UPDATE_SCREEN_QUESTION, UPDATE_SCREEN_TITLE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const tlfbEventsReducer = (
  question: TlfbEventsDTO,
  payload: { data: { value: string }; type: string },
) => {
  switch (payload.type) {
    case UPDATE_SCREEN_TITLE: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.screen_title = value;
      return question;
    }
    case UPDATE_SCREEN_QUESTION: {
      const {
        data: { value },
      } = payload;
      question.body.data[0].payload.screen_question = value;
      return question;
    }
    default:
      return question;
  }
};

export default tlfbEventsReducer;
