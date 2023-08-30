import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { elements } from 'theme';
import {
  createInterventionRequest,
  makeSelectInterventionLoader,
  withCreateInterventionSaga,
} from 'global/reducers/intervention';
import {
  withFetchInterventionsSaga,
  fetchInterventionsRequest,
  makeSelectInterventionsState,
  withInterventionsReducer,
  refetchInterventions as refetchInterventionsAction,
} from 'global/reducers/interventions';

import ErrorAlert from 'components/ErrorAlert';
import TileRenderer from 'components/TileRenderer';
import Box from 'components/Box';

import messages from '../../../../messages';

const MAX_ROW_HEIGHT = elements.interventionsTileHeight + 10;

const BATCH_SIZE = 20;

const OrganizationInterventionRow = ({
  organizationId,
  refetchInterventions,
  fetchInterventions,
  createIntervention,
  createInterventionLoading,
  formatMessage,
  interventionsState: {
    interventions,
    interventionsSize,
    loaders: { fetchInterventions: fetchInterventionsLoading },
    errors: { fetchInterventions: fetchInterventionsError },
    shouldRefetch,
    interventionsStates,
  },
}) => {
  useInjectSaga(withCreateInterventionSaga);
  useInjectSaga(withFetchInterventionsSaga);
  useInjectReducer(withInterventionsReducer);

  const handleFetchInterventions = (startIndex, endIndex) => {
    const realStartIndex = Math.max(startIndex - 1, 0);
    const realStopIndex = endIndex;
    fetchInterventions({
      organizationId,
      paginationData: {
        startIndex: realStartIndex,
        endIndex: realStopIndex,
      },
    });
  };

  useEffect(() => {
    refetchInterventions();
  }, [organizationId]);

  useEffect(() => {
    handleFetchInterventions(0, BATCH_SIZE);
  }, []);

  useEffect(() => {
    if (shouldRefetch) handleFetchInterventions(0, BATCH_SIZE);
  }, [shouldRefetch]);

  if (fetchInterventionsError) {
    return <ErrorAlert errorText={fetchInterventionsError} />;
  }

  return (
    <Box
      width="100%"
      height={interventionsSize ? MAX_ROW_HEIGHT * 2 : MAX_ROW_HEIGHT}
    >
      <TileRenderer
        containerKey="intervention"
        elements={interventions}
        elementsStates={interventionsStates}
        newLabel={formatMessage(messages.addReportingIntervention)}
        onCreateCall={() => createIntervention(organizationId)}
        createLoading={createInterventionLoading}
        onFetchInterventions={handleFetchInterventions}
        isLoading={fetchInterventionsLoading}
        infiniteLoader={{
          itemCount: interventionsSize,
          minimumBatchSize: BATCH_SIZE,
        }}
      />
    </Box>
  );
};

OrganizationInterventionRow.propTypes = {
  organizationId: PropTypes.string,
  refetchInterventions: PropTypes.bool,
  fetchInterventions: PropTypes.func,
  createIntervention: PropTypes.func,
  createInterventionLoading: PropTypes.bool,
  formatMessage: PropTypes.func,
  interventionsState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  createInterventionLoading: makeSelectInterventionLoader(
    'createInterventionLoading',
  ),
  interventionsState: makeSelectInterventionsState(),
});

const mapDispatchToProps = {
  refetchInterventions: refetchInterventionsAction,
  fetchInterventions: fetchInterventionsRequest,
  createIntervention: createInterventionRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationInterventionRow);
