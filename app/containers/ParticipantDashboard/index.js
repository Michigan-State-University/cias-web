/**
 *
 * ParticipantDashboard
 *
 */

import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row } from 'react-grid-system';

import AppContainer from 'components/Container';
import Box from 'components/Box';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Intervention from 'models/Intervention/Intervention';
import Loader from 'components/Loader';
import MapInterventions from 'components/MapInterventions/MapInterventions';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  fetchSessionsRequest,
  fetchSessionsSaga,
  interventionsReducer,
  makeSelectSessionsState,
} from 'global/reducers/sessions';

import { Roles } from 'models/User/UserRoles';
import messages from './messages';
export function ParticipantDashboard({
  fetchInterventions,
  sessions: { sessions, fetchSessionLoading, fetchSessionError },
}) {
  useInjectReducer({
    key: 'sessions',
    reducer: interventionsReducer,
  });
  useInjectSaga({ key: 'fetchSessions', saga: fetchSessionsSaga });

  useEffect(() => {
    fetchInterventions(Roles.participant);
  }, []);

  if (fetchSessionLoading) return <Loader />;
  if (fetchSessionError)
    return (
      <AppContainer>
        <ErrorAlert errorText={fetchSessionError} />
      </AppContainer>
    );

  return (
    <Fragment>
      <AppContainer>
        <Box mt={20}>
          <H1 my={20}>
            <FormattedMessage {...messages.sessions} />
          </H1>
          <Row>
            <MapInterventions sessions={sessions} participantView />
            {!sessions ||
              (sessions.length === 0 && (
                <Column align="center" mt={100}>
                  <FormattedMessage {...messages.noResults} />
                </Column>
              ))}
          </Row>
        </Box>
      </AppContainer>
    </Fragment>
  );
}

ParticipantDashboard.propTypes = {
  sessions: PropTypes.shape({
    sessions: PropTypes.arrayOf(PropTypes.shape(Intervention)),
    fetchSessionLoading: PropTypes.bool,
    fetchSessionError: PropTypes.string,
  }),
  fetchInterventions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sessions: makeSelectSessionsState(),
});

const mapDispatchToProps = {
  fetchInterventions: fetchSessionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ParticipantDashboard);
