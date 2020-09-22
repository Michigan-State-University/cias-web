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
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  fetchInterventionsRequest,
  fetchInterventionsSaga,
  interventionsReducer,
  makeSelectInterventionsState,
} from 'global/reducers/interventions';

import { Roles } from 'models/User/UserRoles';
import messages from './messages';
export function ParticipantDashboard({
  fetchInterventions,
  interventions: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
}) {
  useInjectReducer({
    key: 'interventions',
    reducer: interventionsReducer,
  });
  useInjectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga });

  useEffect(() => {
    fetchInterventions(Roles.participant);
  }, []);

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return (
      <AppContainer>
        <ErrorAlert errorText={fetchInterventionError} />
      </AppContainer>
    );

  return (
    <Fragment>
      <AppContainer>
        <Box mt={20}>
          <H1 my={20}>
            <FormattedMessage {...messages.interventions} />
          </H1>
          <Row>
            <MapInterventions interventions={interventions} participantView />
            {interventions.length === 0 && (
              <Column align="center" mt={100}>
                <FormattedMessage {...messages.noResults} />
              </Column>
            )}
          </Row>
        </Box>
      </AppContainer>
    </Fragment>
  );
}

ParticipantDashboard.propTypes = {
  interventions: PropTypes.shape({
    interventions: PropTypes.arrayOf(PropTypes.shape(Intervention)),
    fetchInterventionLoading: PropTypes.bool,
    fetchInterventionError: PropTypes.string,
  }),
  fetchInterventions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  interventions: makeSelectInterventionsState(),
});

const mapDispatchToProps = {
  fetchInterventions: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ParticipantDashboard);
