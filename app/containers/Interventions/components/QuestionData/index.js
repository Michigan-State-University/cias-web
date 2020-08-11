import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
  numberQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  urlQuestion,
} from 'models/Intervention/QuestionTypes';

import SingleQuestion from './SingleQuestion';
import MultiQuestion from './MultiQuestion';
import TextboxQuestion from './TextboxQuestion';
import NumberQuestion from './NumberQuestion';
import GridQuestion from './GridQuestion';
import UrlQuestion from './UrlQuestion';

import { makeSelectSelectedQuestionType } from './selectors';
import { makeSelectIsNarratorTab } from '../../containers/EditInterventionPage/selectors';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';

const QuestionData = ({ selectedQuestionType, isNarratorTab }) => {
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
