import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import ParticipantReportQuestionLayout from 'containers/AnswerSessionPage/layouts/ParticipantReportQuestionLayout';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { UPDATE_DATA } from './constants';

const ParticipantReportQuestion = ({ intl: { formatMessage } }) => (
  <Column mt={10}>
    <ParticipantReportQuestionLayout
      formatMessage={formatMessage}
      showEmailInput
      disabled
    />
  </Column>
);

ParticipantReportQuestion.propTypes = {
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateAnswer: value =>
    updateQuestionData({ type: UPDATE_DATA, data: { value } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(ParticipantReportQuestion));
