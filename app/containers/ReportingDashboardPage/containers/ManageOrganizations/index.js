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
} from 'global/reducers/organizations';

import { Container, Col, Row } from 'components/ReactGridSystem';
import SidePanel from 'components/SidePanel';
import H2 from 'components/H2';

import Loader from 'components/Loader';
import { ReportingDashboardPageContext } from '../../constants';
import messages from '../../messages';
import Settings from './Settings';
import { ManageOrganizationsContext } from './constants';

const ManageOrganizations = ({
  organization,
  organizations,
  organizationsLoader,
  loaders,
  errors,
  fetchOrganization,
}) => {
  const { organizationId } = useContext(ReportingDashboardPageContext);
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchOrganization(organizationId);
  }, [organizationId]);

  const noOrganizations = organizations.length === 0;

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
          <div>Manage Organizations {organizationId}</div>
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
      value={{ organization, loaders, errors }}
    >
      <Helmet>
        <title>{formatMessage(messages.manageOrganizations)}</title>
      </Helmet>
      <Container>{render()}</Container>
    </ManageOrganizationsContext.Provider>
  );
};

ManageOrganizations.propTypes = {
  errors: PropTypes.object,
  loaders: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.arrayOf(PropTypes.object),
  organizationsLoader: PropTypes.bool,
  fetchOrganization: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  organizations: makeSelectOrganizations(),
  organizationsLoader: makeSelectOrganizationsLoader(),
  loaders: makeSelectOrganizationLoaders(),
  errors: makeSelectOrganizationErrors(),
});

const mapDispatchToProps = {
  fetchOrganization: fetchOrganizationRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(ManageOrganizations));
