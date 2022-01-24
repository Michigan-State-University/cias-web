import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  urlQuestion,
  feedbackQuestion,
  dateQuestion,
  nameQuestion,
  currencyQuestion,
  thirdPartyQuestion,
  phoneQuestion,
  participantReport,
  tlfbConfig,
  tlfbEvents,
} from 'models/Session/QuestionTypes';

import currencyQuestionReducer from './CurrencyQuestion/reducer';
import gridQuestionReducer from './GridQuestion/reducer';
import multiQuestionReducer from './MultiQuestion/reducer';
import phoneQuestionReducer from './PhoneQuestion/reducer';
import numberQuestionReducer from './NumberQuestion/reducer';
import nameQuestionReducer from './NameQuestion/reducer';
import dateQuestionReducer from './DateQuestion/reducer';
import singleQuestionReducer from './SingleQuestion/reducer';
import textboxQuestionReducer from './TextboxQuestion/reducer';
import urlQuestionReducer from './UrlQuestion/reducer';
import feedbackQuestionReducer from './FeedbackQuestion/reducer';
import visualAnalogueScaleQuestionReducer from './VisualAnalogueScaleQuestion/reducer';
import thirdPartyQuestionReducer from './ThirdPartyQuestion/reducer';
import participantReportQuestionReducer from './ParticipantReportQuestion/reducer';
import tlfbConfigReducer from './TlfbConfig/reducer';
import tlfbEventsReducer from './TlfbEvents/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionDataReducer = (question, data) => {
  switch (question.type) {
    case thirdPartyQuestion.id:
      return thirdPartyQuestionReducer(question, data);
    case singleQuestion.id:
      return singleQuestionReducer(question, data);
    case multiQuestion.id:
      return multiQuestionReducer(question, data);
    case textboxQuestion.id:
      return textboxQuestionReducer(question, data);
    case phoneQuestion.id:
      return phoneQuestionReducer(question, data);
    case dateQuestion.id:
      return dateQuestionReducer(question, data);
    case nameQuestion.id:
      return nameQuestionReducer(question, data);
    case numberQuestion.id:
      return numberQuestionReducer(question, data);
    case gridQuestion.id:
      return gridQuestionReducer(question, data);
    case visualAnalogueScaleQuestion.id:
      return visualAnalogueScaleQuestionReducer(question, data);
    case urlQuestion.id:
      return urlQuestionReducer(question, data);
    case feedbackQuestion.id:
      return feedbackQuestionReducer(question, data);
    case currencyQuestion.id:
      return currencyQuestionReducer(question, data);
    case participantReport.id:
      return participantReportQuestionReducer(question, data);
    case tlfbConfig.id:
      return tlfbConfigReducer(question, data);
    case tlfbEvents.id:
      return tlfbEventsReducer(question, data);
    default:
      return question;
  }
};

export default questionDataReducer;
