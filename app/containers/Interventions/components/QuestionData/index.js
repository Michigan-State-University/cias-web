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
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';

const QuestionData = ({ selectedQuestionType }) => {
  switch (selectedQuestionType) {
    case singleQuestion.id:
      return <SingleQuestion />;
    case multiQuestion.id:
      return <MultiQuestion />;
    case textboxQuestion.id:
      return <TextboxQuestion />;
    case numberQuestion.id:
      return <NumberQuestion />;
    case gridQuestion.id:
      return <GridQuestion />;
    case visualAnalogueScaleQuestion.id:
      return <VisualAnalogueScaleQuestion />;
    case urlQuestion.id:
      return <UrlQuestion />;
    default:
      return null;
  }
};

QuestionData.propTypes = {
  selectedQuestionType: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestionType: makeSelectSelectedQuestionType(),
});

const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionData);
