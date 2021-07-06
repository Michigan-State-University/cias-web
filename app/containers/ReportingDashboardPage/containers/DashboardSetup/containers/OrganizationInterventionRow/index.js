import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { elements, themeColors } from 'theme';
import {
  fetchOrganizationInterventionsRequest,
  makeSelectOrganizationInterventions,
  createOrganizationInterventionRequest,
  makeSelectOrganizationLoaders,
  makeSelectOrganizationErrors,
} from 'global/reducers/organizations';

import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import TileRenderer from 'components/TileRenderer';
import Box from 'components/Box';

import messages from '../../../../messages';

const MAX_ROW_HEIGHT = elements.interventionsTileHeight + 10;

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

  if (fetchOrganizationInterventions) {
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
