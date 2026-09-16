import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, IntlShape } from 'react-intl';
import { injectReducer, injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';

import fetchInterventionSaga from 'global/reducers/intervention/sagas/fetchIntervention';
import {
  getSessionSaga,
  sessionReducer,
  getSessionRequest,
} from 'global/reducers/session';
import {
  fetchInterventionRequest,
  interventionReducer,
} from 'global/reducers/intervention';

import AppContainer from 'components/Container';

import ReportsList from 'containers/Reports/containers/ReportsList';

import messages from './messages';

const GeneratedReportsPage = ({
  intl: { formatMessage },
  disableFilter,
  match,
  fetchSession,
  fetchIntervention,
}) => {
  const { sessionId, interventionId } = match?.params ?? {};

  useEffect(() => {
    if (interventionId) {
      fetchIntervention(interventionId);
    }
  }, [interventionId]);

  useEffect(() => {
    if (interventionId && sessionId) {
      fetchSession({ sessionId, interventionId });
    }
  }, [sessionId, interventionId]);

  return (
    <AppContainer pageTitle={formatMessage(messages.pageTitle)}>
      <ReportsList
        match={match}
        disableFilter={disableFilter}
        sessionId={sessionId}
      />
    </AppContainer>
  );
};

GeneratedReportsPage.propTypes = {
  intl: PropTypes.shape(IntlShape),
  disableFilter: PropTypes.bool,
  match: PropTypes.object,
  fetchIntervention: PropTypes.func,
  fetchSession: PropTypes.func,
};

const mapDispatchToProps = {
  fetchIntervention: fetchInterventionRequest,
  fetchSession: getSessionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  injectIntl,
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectReducer({ key: 'session', reducer: sessionReducer }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  withConnect,
)(GeneratedReportsPage);
