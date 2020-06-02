import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
} from 'models/Intervention/QuestionTypes';

import singleQuestionReducer from './SingleQuestion/reducer';
import multiQuestionReducer from './MultiQuestion/reducer';
import textboxQuestionReducer from './TextboxQuestion/reducer';
import numberQuestionReducer from './NumberQuestion/reducer';
import gridQuestionReducer from './GridQuestion/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionDataReducer = (question, data) => {
  switch (question.type) {
    case singleQuestion.id:
      return singleQuestionReducer(question, data);
    case multiQuestion.id:
      return multiQuestionReducer(question, data);
    case textboxQuestion.id:
      return textboxQuestionReducer(question, data);
    case numberQuestion.id:
      return numberQuestionReducer(question, data);
    case gridQuestion.id:
      return gridQuestionReducer(question, data);
    default:
      return question;
  }
};

export default questionDataReducer;
