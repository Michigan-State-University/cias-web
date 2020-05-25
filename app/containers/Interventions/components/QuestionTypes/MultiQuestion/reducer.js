/*
 *
 * CreateInterventionPage reducer
 *
 */

import { ADD, UPDATE } from './constants';

/* eslint-disable default-case, no-param-reassign */
const multiQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD:
      const answerCount = Object.entries(question.body).length;
      question.body[answerCount] = `Answer ${answerCount + 1}`;
      return question;
    case UPDATE:
      const { index, value } = payload.data;
      question.body[index] = value;
      return question;
    default:
      return question;
  }
};

export default multiQuestionReducer;
