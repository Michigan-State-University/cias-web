import { UPDATE_URL, UPDATE_VARIABLE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const urlQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_URL:
      const { value } = payload.data;
      question.body.data[0] = value;
      return question;
    case UPDATE_VARIABLE:
      question.body.variable.name = payload.data.name;
      return question;
    default:
      return question;
  }
};

export default urlQuestionReducer;
