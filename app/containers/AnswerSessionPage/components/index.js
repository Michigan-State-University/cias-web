import React from 'react';

import ErrorAlert from 'components/ErrorAlert';
import {
  gridQuestion,
  multiQuestion,
  numberQuestion,
  singleQuestion,
  visualAnalogueScaleQuestion,
  textboxQuestion,
  informationQuestion,
  urlQuestion,
  feedbackQuestion,
  finishQuestion,
  phoneQuestion,
  dateQuestion,
  nameQuestion,
  currencyQuestion,
  thirdPartyQuestion,
  participantReport,
  tlfbEvents,
  tlfbQuestion,
  henryFordQuestion,
  henryFordInitialScreen,
} from 'models/Session/QuestionTypes';

import CurrencyQuestion from './CurrencyQuestion';
import FinishScreen from './FinishScreen';
import UrlQuestion from './UrlQuestion';
import InformationSlide from './InformationSlide';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import GridQuestion from './GridQuestion';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';
import TextBoxQuestion from './TextBoxQuestion';
import NumberQuestion from './NumberQuestion';
import FeedbackQuestion from './FeedbackQuestion';
import PhoneQuestion from './PhoneQuestion';
import DateQuestion from './DateQuestion';
import ParticipantReport from './ParticipantReportQuestion';
import NameQuestion from './NameQuestion';
import ThirdPartyQuestion from './ThirdPartyQuestion';
import TlfbEvents from './TlfbEvents';
import TlfbQuestion from './TlfbQuestion';
import HenryFordQuestion from './HenryFordQuestion';
import HenryFordInitialScreen from './HenryFordInitialScreen';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case thirdPartyQuestion.id:
      return <ThirdPartyQuestion question={question} {...sharedProps} />;
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    case multiQuestion.id:
      return <MultipleQuestion question={question} {...sharedProps} />;
    case gridQuestion.id:
      return <GridQuestion question={question} {...sharedProps} />;
    case visualAnalogueScaleQuestion.id:
      return (
        <VisualAnalogueScaleQuestion question={question} {...sharedProps} />
      );
    case feedbackQuestion.id:
      return <FeedbackQuestion question={question} {...sharedProps} />;
    case textboxQuestion.id:
      return <TextBoxQuestion question={question} {...sharedProps} />;
    case phoneQuestion.id:
      return <PhoneQuestion question={question} {...sharedProps} />;
    case participantReport.id:
      return <ParticipantReport question={question} {...sharedProps} />;
    case dateQuestion.id:
      return <DateQuestion question={question} {...sharedProps} />;
    case nameQuestion.id:
      return <NameQuestion question={question} {...sharedProps} />;
    case numberQuestion.id:
      return <NumberQuestion question={question} {...sharedProps} />;
    case informationQuestion.id:
      return <InformationSlide {...sharedProps} />;
    case urlQuestion.id:
      return <UrlQuestion question={question} {...sharedProps} />;
    case finishQuestion.id:
      return <FinishScreen question={question} {...sharedProps} />;
    case currencyQuestion.id:
      return <CurrencyQuestion question={question} {...sharedProps} />;
    case tlfbEvents.id:
      return <TlfbEvents question={question} {...sharedProps} />;
    case tlfbQuestion.id:
      return <TlfbQuestion question={question} {...sharedProps} />;
    case henryFordQuestion.id:
      return <HenryFordQuestion question={question} {...sharedProps} />;
    case henryFordInitialScreen.id:
      return <HenryFordInitialScreen question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
