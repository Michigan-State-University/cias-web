import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { elements, themeColors } from 'theme';
import {
  fetchOrganizationInterventionsRequest,
  makeSelectOrganizationInterventions,
  makeSelectOrganizationLoaders,
  makeSelectOrganizationErrors,
  makeSelectShouldRefetchInterventions,
  makeSelectOrganizationInterventionsCount,
} from 'global/reducers/organizations';
import {
  createInterventionRequest,
  makeSelectInterventionLoader,
  withCreateInterventionSaga,
} from 'global/reducers/intervention';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import TileRenderer from 'components/TileRenderer';
import Box from 'components/Box';

import messages from '../../../../messages';

const MAX_ROW_HEIGHT = elements.interventionsTileHeight + 10;

const BATCH_SIZE = 20;

const OrganizationInterventionRow = ({
  organizationId,
  organizationInterventions,
  organizationInterventionsFetchRequest,
  createIntervention,
  organizationLoaders: { fetchOrganizationInterventions },
  createInterventionLoading,
  organizationErrors: {
    fetchOrganizationInterventions: fetchOrganizationInterventionsError,
  },
  shouldRefetch,
  formatMessage,
  interventionsCount,
}) => {
  useInjectSaga(withCreateInterventionSaga);

  const fetchInterventions = (startIndex, endIndex) => {
    const realStartIndex = Math.max(startIndex - 1, 0);
    const realStopIndex = endIndex;
    organizationInterventionsFetchRequest(organizationId, {
      startIndex: realStartIndex,
      endIndex: realStopIndex,
    });
  };
  useEffect(() => {
    fetchInterventions(0, BATCH_SIZE);
  }, []);

  useEffect(() => {
    if (shouldRefetch) fetchInterventions(0, BATCH_SIZE);
  }, [shouldRefetch]);

  if (fetchOrganizationInterventions && !organizationInterventions?.length) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (fetchOrganizationInterventionsError) {
    return <ErrorAlert errorText={fetchOrganizationInterventionsError} />;
  }

  const interventionsSize = organizationInterventions?.length ?? 0;
  return (
    <Box
      width="100%"
      height={interventionsSize ? MAX_ROW_HEIGHT * 2 : MAX_ROW_HEIGHT}
    >
      {organizationInterventions && (
        <TileRenderer
          containerKey="intervention"
          elements={organizationInterventions}
          newLabel={formatMessage(messages.addReportingIntervention)}
          onCreateCall={() => createIntervention(organizationId)}
          createLoading={createInterventionLoading}
          onFetchInterventions={fetchInterventions}
          isLoading={fetchOrganizationInterventions}
          infiniteLoader={{
            itemCount: interventionsCount,
            minimumBatchSize: BATCH_SIZE,
          }}
        />
      )}
    </Box>
  );
};

OrganizationInterventionRow.propTypes = {
  organizationId: PropTypes.string,
  organizationInterventions: PropTypes.array,
  organizationInterventionsFetchRequest: PropTypes.func,
  createIntervention: PropTypes.func,
  formatMessage: PropTypes.func,
  organizationLoaders: PropTypes.object,
  createInterventionLoading: PropTypes.bool,
  organizationErrors: PropTypes.object,
  shouldRefetch: PropTypes.bool,
  interventionsCount: PropTypes.number,
};

OrganizationInterventionRow.defaultProps = {
  organizationInterventions: [],
};

const mapStateToProps = createStructuredSelector({
  organizationInterventions: makeSelectOrganizationInterventions(),
  organizationLoaders: makeSelectOrganizationLoaders(),
  createInterventionLoading: makeSelectInterventionLoader(
    'createInterventionLoading',
  ),
  organizationErrors: makeSelectOrganizationErrors(),
  shouldRefetch: makeSelectShouldRefetchInterventions(),
  interventionsCount: makeSelectOrganizationInterventionsCount(),
});

const mapDispatchToProps = {
  organizationInterventionsFetchRequest: fetchOrganizationInterventionsRequest,
  createIntervention: createInterventionRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationInterventionRow);
