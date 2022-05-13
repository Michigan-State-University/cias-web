import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import {
  fetchOrganizationRequest,
  makeSelectOrganizationErrors,
  makeSelectOrganizationLoaders,
  makeSelectOrganization,
  makeSelectOrganizations,
  makeSelectOrganizationsLoader,
  makeSelectOrganizationShouldRefetch,
  selectEntityAction,
  EntityType,
  makeSelectOrganizationSelectedEntity,
  makeSelectShowDeletedEntitiesToggle,
} from 'global/reducers/organizations';

import { Container, Col, Row } from 'components/ReactGridSystem';
import SidePanel from 'components/SidePanel';
import H2 from 'components/H2';

import Loader from 'components/Loader';
import { ReportingDashboardPageContext } from '../../constants';
import messages from '../../messages';
import Settings from './Settings';
import { ManageOrganizationsContext } from './constants';
import OrganizationDetails from './OrganizationDetails';

const ManageOrganizations = ({
  errors,
  fetchOrganization,
  loaders,
  organization,
  organizations,
  organizationsLoader,
  shouldRefetch,
  selectEntity,
  selectedEntity,
  showDeletedEntities,
}) => {
  const { organizationId } = useContext(ReportingDashboardPageContext);
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchOrganization(organizationId);
    selectEntity(organizationId, EntityType.organization);
  }, [organizationId]);

  useEffect(() => {
    if (shouldRefetch[EntityType.organization])
      fetchOrganization(organizationId);
  }, [shouldRefetch[EntityType.organization]]);

  const noOrganizations =
    organizations.length === 0 || (!organization && !loaders.fetchOrganization);

  const render = useCallback(() => {
    if (organizationsLoader) return <Loader />;

    if (noOrganizations)
      return (
        <Row justify="center" mt={30}>
          <H2>{formatMessage(messages.noOrganizations)}</H2>
        </Row>
      );

    return (
      <Row>
        <Col xs={8}>
          <OrganizationDetails />
        </Col>
        <Col xs={4}>
          <SidePanel isOpen>
            <Settings />
          </SidePanel>
        </Col>
      </Row>
    );
  }, [noOrganizations, organizationId, organizationsLoader]);

  return (
    <ManageOrganizationsContext.Provider
      value={{
        organization,
        loaders,
        errors,
        shouldRefetch,
        selectedEntity,
        showDeletedEntities,
      }}
    >
      <Helmet>
        <title>{formatMessage(messages.manageOrganizations)}</title>
      </Helmet>
      <Container mx="55px !important" maxWidth="100% !important">
        {render()}
      </Container>
    </ManageOrganizationsContext.Provider>
  );
};

ManageOrganizations.propTypes = {
  errors: PropTypes.object,
  fetchOrganization: PropTypes.func,
  loaders: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.arrayOf(PropTypes.object),
  organizationsLoader: PropTypes.bool,
  shouldRefetch: PropTypes.shape({
    [EntityType.organization]: PropTypes.bool,
    [EntityType.healthSystem]: PropTypes.bool,
    [EntityType.clinic]: PropTypes.bool,
  }),
  selectEntity: PropTypes.func,
  selectedEntity: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }),
  showDeletedEntities: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectOrganizationErrors(),
  loaders: makeSelectOrganizationLoaders(),
  organization: makeSelectOrganization(),
  organizations: makeSelectOrganizations(),
  organizationsLoader: makeSelectOrganizationsLoader(),
  shouldRefetch: makeSelectOrganizationShouldRefetch(),
  selectedEntity: makeSelectOrganizationSelectedEntity(),
  showDeletedEntities: makeSelectShowDeletedEntitiesToggle(),
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrganizationRequest,
  selectEntity: selectEntityAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default memo(compose(withConnect)(ManageOrganizations));
