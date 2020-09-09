import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import { updateQuestionDataSaga } from 'global/reducers/questions';
import { useInjectSaga } from 'utils/injectSaga';
import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  urlQuestion,
} from 'models/Intervention/QuestionTypes';

import GridQuestion from './GridQuestion';
import MultiQuestion from './MultiQuestion';
import NumberQuestion from './NumberQuestion';
import SingleQuestion from './SingleQuestion';
import TextboxQuestion from './TextboxQuestion';
import UrlQuestion from './UrlQuestion';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';
import { makeSelectSelectedQuestionType } from './selectors';

const QuestionData = ({ selectedQuestionType, isNarratorTab }) => {
  useInjectSaga({ key: 'updateQuestionData', saga: updateQuestionDataSaga });

  const commonProps = {
    isNarratorTab,
  };
  switch (selectedQuestionType) {
    case singleQuestion.id:
      return <SingleQuestion {...commonProps} />;
    case multiQuestion.id:
      return <MultiQuestion {...commonProps} />;
    case textboxQuestion.id:
      return <TextboxQuestion {...commonProps} />;
    case numberQuestion.id:
      return <NumberQuestion {...commonProps} />;
    case gridQuestion.id:
      return <GridQuestion {...commonProps} />;
    case visualAnalogueScaleQuestion.id:
      return <VisualAnalogueScaleQuestion {...commonProps} />;
    case urlQuestion.id:
      return <UrlQuestion {...commonProps} />;
    default:
      return null;
  }
};

QuestionData.propTypes = {
  selectedQuestionType: PropTypes.string.isRequired,
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestionType: makeSelectSelectedQuestionType(),
  isNarratorTab: makeSelectIsNarratorTab(),
});

const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionData);
