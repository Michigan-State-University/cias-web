import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';

import DateQuestionLayout from 'containers/AnswerSessionPage/layouts/DateQuestionLayout';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { UPDATE_DATA } from './constants';

const DateQuestion = () => (
  <Column mt={10}>
    <DateQuestionLayout disabled />
  </Column>
);

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateAnswer: (value) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value } }),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(DateQuestion));
