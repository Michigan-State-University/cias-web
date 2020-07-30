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
import { Container, Row } from 'react-grid-system';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  fetchInterventionsRequest,
  fetchInterventionsSaga,
  interventionListReducer,
  makeSelectInterventionList,
} from 'global/reducers/interventionList';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import Box from 'components/Box';
import H1 from 'components/H1';
import { FormattedMessage } from 'react-intl';
import Column from 'components/Column';
import MapInterventions from 'components/MapInterventions/MapInterventions';
import messages from './messages';
export function ParticipantDashboard({
  fetchInterventions,
  interventionList: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
}) {
  useInjectReducer({
    key: 'interventionList',
    reducer: interventionListReducer,
  });
  useInjectSaga({ key: 'getInterventions', saga: fetchInterventionsSaga });

  useEffect(() => {
    fetchInterventions();
  }, []);

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return (
      <Container>
        <ErrorAlert errorText={fetchInterventionError} />
      </Container>
    );

  return (
    <Fragment>
      <Container>
        <Box mt={20}>
          <H1 my={20}>
            <FormattedMessage {...messages.interventions} />
          </H1>
          <Row>
            <MapInterventions
              interventions={interventions}
              participantPreview
            />
            {interventions.length === 0 && (
              <Column align="center" mt={100}>
                <FormattedMessage {...messages.noResults} />
              </Column>
            )}
          </Row>
        </Box>
      </Container>
    </Fragment>
  );
}

ParticipantDashboard.propTypes = {
  interventionList: PropTypes.object,
  fetchInterventions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  interventionList: makeSelectInterventionList(),
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
