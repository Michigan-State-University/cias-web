import React from 'react';
import PropTypes from 'prop-types';
import QuestionType from 'models/Intervention/QuestionType';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedQuestionType } from './selectors';
import SingleQuestion from './SingleQuestion';
import MultiQuestion from './MultiQuestion';

const QuestionData = ({ selectedQuestionType }) => {
  switch (selectedQuestionType.id) {
    case 'Single':
      return <SingleQuestion />;
    case 'Multiple':
      return <MultiQuestion />;
    default:
      return null;
  }
};

QuestionData.propTypes = {
  selectedQuestionType: PropTypes.shape(QuestionType).isRequired,
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
