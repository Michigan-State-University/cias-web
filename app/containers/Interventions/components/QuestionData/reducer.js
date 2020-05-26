import {
  singleQuestion,
  multiQuestion,
} from 'models/Intervention/QuestionTypes';
import singleQuestionReducer from './SingleQuestion/reducer';
import multiQuestionReducer from './MultiQuestion/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionDataReducer = (question, data) => {
  switch (question.type) {
    case singleQuestion.id:
      return singleQuestionReducer(question, data);
    case multiQuestion.id:
      return multiQuestionReducer(question, data);
    default:
      return question;
  }
};

export default questionDataReducer;
