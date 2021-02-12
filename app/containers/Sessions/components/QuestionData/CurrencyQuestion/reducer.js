import { UPDATE_VARIABLE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
const currencyQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_VARIABLE:
      question.body.variable.name = payload.data.name;
      return question;
    default:
      return question;
  }
};

export default currencyQuestionReducer;
