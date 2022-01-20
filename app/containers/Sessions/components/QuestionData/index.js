import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import { makeSelectInterventionStatus } from 'global/reducers/intervention';
import {
  updateQuestionDataSaga,
  makeSelectSelectedQuestionType,
} from 'global/reducers/questions';
import { useInjectSaga } from 'redux-injectors';
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
} from 'models/Session/QuestionTypes';

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

const QuestionData = ({
  selectedQuestionType,
  isNarratorTab,
  interventionStatus,
}) => {
  useInjectSaga({ key: 'updateQuestionData', saga: updateQuestionDataSaga });

  const commonProps = {
    isNarratorTab,
    interventionStatus,
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
      return <UrlQuestion {...commonProps} />;
    case feedbackQuestion.id:
      return <FeedbackQuestion {...commonProps} />;
    case currencyQuestion.id:
      return <CurrencyQuestion {...commonProps} />;
    case finishQuestion.id:
      return <FinishScreen {...commonProps} />;
    case tlfbConfig.id:
      return <TlfbConfig {...commonProps} />;
    default:
      return null;
  }
};

QuestionData.propTypes = {
  selectedQuestionType: PropTypes.string,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestionType: makeSelectSelectedQuestionType(),
  isNarratorTab: makeSelectIsNarratorTab(),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QuestionData);
