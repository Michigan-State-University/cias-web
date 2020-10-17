import { UPDATE_URL } from './constants';
import { UPDATE_VARIABLE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
const urlQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_URL:
      const { url } = payload.data;
      question.body.data[0] = { ...question.body.data[0], payload: url };

      return question;

    case UPDATE_VARIABLE:
      const { name } = payload.data;
      question.body.variable.name = name;

      return question;

    default:
      return question;
  }
};

export default urlQuestionReducer;
