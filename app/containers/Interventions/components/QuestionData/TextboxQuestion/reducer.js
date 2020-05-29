import { UPDATE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const textboxQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE:
      const { value } = payload.data;
      question.body.data[0] = value;
      return question;
    default:
      return question;
  }
};

export default textboxQuestionReducer;
