import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import { PhoneQuestionLayout } from 'components/PhoneQuestionLayout';

const PhoneQuestion = ({ selectedQuestion }) => {
  const { time_ranges: availableTimeRanges } = selectedQuestion;
  return (
    <PhoneQuestionLayout availableTimeRanges={availableTimeRanges} disabled />
  );
};

PhoneQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(PhoneQuestion));
