import { UPDATE_VARIABLE } from 'global/reducers/questions/constants';

import { UPDATE_DATA } from './constants';

/* eslint-disable default-case, no-param-reassign */
const phoneQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_DATA:
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

export default phoneQuestionReducer;
