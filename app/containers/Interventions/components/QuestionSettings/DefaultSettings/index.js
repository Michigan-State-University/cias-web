import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import H3 from 'components/H3';
import Question from 'models/Intervention/Question';
import Switch from 'components/Switch';

import messages from './messages';
import { updateSettings } from './actions';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';

/* eslint-disable no-unused-vars */
const DefaultSettings = ({
  selectedQuestion,
  onToggle,
  intl: { formatMessage },
}) => (
  <Column>
    <Row justify="between" align="center">
      <H3>{formatMessage(messages.title)}</H3>
      <Switch checked onToggle={value => onToggle('title', value)} />
    </Row>
  </Column>
);

DefaultSettings.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  intl: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  onToggle: updateSettings,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(DefaultSettings));
