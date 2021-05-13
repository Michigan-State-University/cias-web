import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { themeColors } from 'theme';
import {
  fetchOrganizationInterventionsRequest,
  makeSelectOrganizationInterventions,
  createOrganizationInterventionRequest,
  makeSelectOrganizationLoaders,
  makeSelectOrganizationErrors,
} from 'global/reducers/organizations';
import SingleTile from 'containers/SingleTile';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import TileRenderer from 'components/TileRenderer';
import Box from 'components/Box';

import messages from '../../../../messages';

const OrganizationInterventionRow = ({
  organizationId,
  organizationInterventions,
  organizationInterventionsFetchRequest,
  createOrganizationIntervention,
  organizationLoaders: {
    fetchOrganizationInterventions,
    addOrganizationIntervention,
  },
  organizationErrors: {
    fetchOrganizationInterventions: fetchOrganizationInterventionsError,
  },
  formatMessage,
}) => {
  useEffect(() => {
    organizationInterventionsFetchRequest(organizationId);
  }, []);

  const mapIntervention = intervention => (
    <SingleTile
      tileData={intervention}
      link={`/interventions/${intervention.id}/`}
    />
  );

  if (fetchOrganizationInterventions) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (fetchOrganizationInterventionsError) {
    return <ErrorAlert errorText={fetchOrganizationInterventionsError} />;
  }
  return (
    <Box width="100%">
      {organizationInterventions && (
        <TileRenderer
          containerKey="intervention"
          elements={organizationInterventions}
          mapFunction={mapIntervention}
          newLabel={formatMessage(messages.addReportingIntervention)}
          onCreateCall={() => createOrganizationIntervention(organizationId)}
          createLoading={addOrganizationIntervention}
        />
      )}
    </Box>
  );
};

OrganizationInterventionRow.propTypes = {
  organizationId: PropTypes.string,
  organizationInterventions: PropTypes.array,
  organizationInterventionsFetchRequest: PropTypes.func,
  createOrganizationIntervention: PropTypes.func,
  formatMessage: PropTypes.func,
  organizationLoaders: PropTypes.object,
  organizationErrors: PropTypes.object,
};

OrganizationInterventionRow.defaultProps = {
  organizationInterventions: [],
};

const mapStateToProps = createStructuredSelector({
  organizationInterventions: makeSelectOrganizationInterventions(),
  organizationLoaders: makeSelectOrganizationLoaders(),
  organizationErrors: makeSelectOrganizationErrors(),
});

const mapDispatchToProps = {
  organizationInterventionsFetchRequest: fetchOrganizationInterventionsRequest,
  createOrganizationIntervention: createOrganizationInterventionRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationInterventionRow);
