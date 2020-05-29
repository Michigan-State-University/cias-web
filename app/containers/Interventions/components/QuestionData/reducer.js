import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
} from 'models/Intervention/QuestionTypes';
import singleQuestionReducer from './SingleQuestion/reducer';
import multiQuestionReducer from './MultiQuestion/reducer';
import textboxQuestionReducer from './TextboxQuestion/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionDataReducer = (question, data) => {
  switch (question.type) {
    case singleQuestion.id:
      return singleQuestionReducer(question, data);
    case multiQuestion.id:
      return multiQuestionReducer(question, data);
    case textboxQuestion.id:
      return textboxQuestionReducer(question, data);
    default:
      return question;
  }
};

export default questionDataReducer;
