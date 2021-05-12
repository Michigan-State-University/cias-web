import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import range from 'lodash/range';
import Row from 'components/Row';
import NewButton from 'components/TileRenderer/Components/NewButton';
import Box from 'components/Box';
// import { colors } from 'theme';
import { createStructuredSelector } from 'reselect';
import {
  fetchOrganizationInterventionsRequest,
  makeSelectOrganizationInterventions,
  createOrganizationInterventionRequest,
  makeSelectOrganizationLoaders,
  makeSelectOrganizationErrors,
} from 'global/reducers/organizations';
import { connect } from 'react-redux';
import SingleTile from 'containers/SingleTile';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import { themeColors } from 'theme';

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
}) => {
  // const emptyRowsSize =
  //   3 - (organizationInterventions ? organizationInterventions.length : 0);
  // const emptyRows = range(Math.max(emptyRowsSize, 0));
  useEffect(() => {
    organizationInterventionsFetchRequest(organizationId);
  }, []);

  if (fetchOrganizationInterventions) {
    return <Spinner color={themeColors.secondary} />;
  }
  if (fetchOrganizationInterventionsError) {
    return <ErrorAlert errorText={fetchOrganizationInterventionsError} />;
  }
  return (
    <Row>
      <Box width={250} mr={20}>
        <NewButton
          ref={null}
          onClick={() => createOrganizationIntervention(organizationId)}
          loading={addOrganizationIntervention}
          label="Add"
        />
      </Box>
      {organizationInterventions &&
        organizationInterventions.map(intervention => (
          <Box key={intervention.id} width={250} mr={20}>
            <SingleTile
              tileData={intervention}
              link={`/interventions/${intervention.id}/`}
            />
          </Box>
        ))}
      {/* {emptyRows.map((_, index) => (
        <Box
          key={index}
          mr={20}
          mb={20}
          width={250}
          background={colors.linkWater}
        />
      ))} */}
    </Row>
  );
};

OrganizationInterventionRow.propTypes = {
  organizationId: PropTypes.string,
  organizationInterventions: PropTypes.array,
  organizationInterventionsFetchRequest: PropTypes.func,
  createOrganizationIntervention: PropTypes.func,
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
