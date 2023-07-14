import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import NameQuestionLayout from 'containers/AnswerSessionPage/layouts/NameQuestionLayout';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { UPDATE_DATA } from './constants';

const NameQuestion = ({ intl: { formatMessage } }) => (
  <Column mt={10}>
    <NameQuestionLayout
      disabled
      formatMessage={formatMessage}
      isDesktop
      showNameHelp
    />
  </Column>
);

NameQuestion.propTypes = {
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  updateAnswer: (value) =>
    updateQuestionData({ type: UPDATE_DATA, data: { value } }),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(NameQuestion));
