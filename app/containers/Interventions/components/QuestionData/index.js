import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  singleQuestion,
  multiQuestion,
  textboxQuestion,
} from 'models/Intervention/QuestionTypes';
import { makeSelectSelectedQuestionType } from './selectors';
import SingleQuestion from './SingleQuestion';
import MultiQuestion from './MultiQuestion';
import TextboxQuestion from './TextboxQuestion';

const QuestionData = ({ selectedQuestionType }) => {
  switch (selectedQuestionType) {
    case singleQuestion.id:
      return <SingleQuestion />;
    case multiQuestion.id:
      return <MultiQuestion />;
    case textboxQuestion.id:
      return <TextboxQuestion />;
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
