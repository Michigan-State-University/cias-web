import React from 'react';
import { useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import { makeSelectInterventionDynamicElementsDirection } from 'global/reducers/globalState';
import {
  makeSelectEditingPossible,
  makeSelectInterventionSharedTo,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';
import {
  updateQuestionDataSaga,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';

import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  urlQuestion,
  feedbackQuestion,
  phoneQuestion,
  dateQuestion,
  nameQuestion,
  currencyQuestion,
  thirdPartyQuestion,
  participantReport,
  finishQuestion,
  tlfbConfig,
  tlfbEvents,
  tlfbQuestion,
  henryFordQuestion,
  henryFordInitialScreen,
} from 'models/Session/QuestionTypes';
import {
  InterventionSharedTo,
  InterventionStatus,
  STATUS_METADATA,
} from 'models/Intervention';

import CurrencyQuestion from './CurrencyQuestion';
import GridQuestion from './GridQuestion';
import MultiQuestion from './MultiQuestion';
import NumberQuestion from './NumberQuestion';
import SingleQuestion from './SingleQuestion';
import TextboxQuestion from './TextboxQuestion';
import UrlQuestion from './UrlQuestion';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';
import FeedbackQuestion from './FeedbackQuestion';
import PhoneQuestion from './PhoneQuestion';
import DateQuestion from './DateQuestion';
import ParticipantReportQuestion from './ParticipantReportQuestion';
import NameQuestion from './NameQuestion';
import ThirdPartyQuestion from './ThirdPartyQuestion';
import FinishScreen from './FinishScreen';
import TlfbConfig from './TlfbConfig';
import TlfbEvents from './TlfbEvents';
import TlfbQuestion from './TlfbQuestion';
import HenryFordQuestion from './HenryFordQuestion';
import HenryFordInitialScreen from './HenryFordInitialScreen';

import { CommonQuestionProps } from './types';

const QuestionData = () => {
  useInjectSaga({ key: 'updateQuestionData', saga: updateQuestionDataSaga });

  const selectedQuestionType = useSelector(makeSelectSelectedQuestionType());
  const isNarratorTab = useSelector(makeSelectIsNarratorTab());
  const interventionStatus: InterventionStatus = useSelector(
    makeSelectInterventionStatus(),
  );
  const sharedTo: InterventionSharedTo = useSelector(
    makeSelectInterventionSharedTo(),
  );
  const editingPossible = useSelector(makeSelectEditingPossible());
  const dynamicElementsDirection = useSelector(
    makeSelectInterventionDynamicElementsDirection(),
  );

  const commonProps: CommonQuestionProps = {
    isNarratorTab,
    interventionStatus,
    sharedTo,
    statusMetadata: STATUS_METADATA[interventionStatus],
    editingPossible,
    dynamicElementsDirection,
  };

  switch (selectedQuestionType) {
    case thirdPartyQuestion.id:
      return <ThirdPartyQuestion {...commonProps} />;
    case singleQuestion.id:
      return <SingleQuestion {...commonProps} />;
    case multiQuestion.id:
      return <MultiQuestion {...commonProps} />;
    case textboxQuestion.id:
      return <TextboxQuestion {...commonProps} />;
    case phoneQuestion.id:
      return <PhoneQuestion {...commonProps} />;
    case participantReport.id:
      return <ParticipantReportQuestion {...commonProps} />;
    case dateQuestion.id:
      return <DateQuestion {...commonProps} />;
    case nameQuestion.id:
      return <NameQuestion {...commonProps} />;
    case numberQuestion.id:
      return <NumberQuestion {...commonProps} />;
    case gridQuestion.id:
      return <GridQuestion {...commonProps} />;
    case visualAnalogueScaleQuestion.id:
      return <VisualAnalogueScaleQuestion {...commonProps} />;
    case urlQuestion.id:
      // @ts-ignore
      return <UrlQuestion {...commonProps} />;
    case feedbackQuestion.id:
      return <FeedbackQuestion {...commonProps} />;
    case currencyQuestion.id:
      return <CurrencyQuestion {...commonProps} />;
    case finishQuestion.id:
      return <FinishScreen {...commonProps} />;
    case tlfbConfig.id:
      return <TlfbConfig {...commonProps} />;
    case tlfbEvents.id:
      return <TlfbEvents {...commonProps} />;
    case tlfbQuestion.id:
      return <TlfbQuestion {...commonProps} />;
    case henryFordQuestion.id:
      return <HenryFordQuestion {...commonProps} />;
    case henryFordInitialScreen.id:
      return <HenryFordInitialScreen {...commonProps} />;
    default:
      return null;
  }
};

export default QuestionData;
