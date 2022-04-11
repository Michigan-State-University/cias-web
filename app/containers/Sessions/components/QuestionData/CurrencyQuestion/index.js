import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import Column from 'components/Column';

import CurrencyQuestionLayout from 'containers/AnswerSessionPage/layouts/CurrencyQuestionLayout';

const CurrencyQuestion = () => (
  <Column mt={10}>
    <CurrencyQuestionLayout disabled />
  </Column>
);

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(CurrencyQuestion);
