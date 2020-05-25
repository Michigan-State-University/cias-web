/*
 *
 * CreateInterventionPage reducer
 *
 */

import singleQuestionReducer from './SingleQuestion/reducer';
import multiQuestionReducer from './MultiQuestion/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionDataReducer = (question, data) => {
  switch (question.type.id) {
    case 'Single':
      return singleQuestionReducer(question, data);
    case 'Multiple':
      return multiQuestionReducer(question, data);
    default:
      return question;
  }
};

export default questionDataReducer;
