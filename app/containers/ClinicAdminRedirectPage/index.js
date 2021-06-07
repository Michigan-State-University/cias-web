import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import {
  makeSelectOrganizationErrors,
  makeSelectOrganizations,
  makeSelectOrganizationsLoader,
} from 'global/reducers/organizations';

const ClinicAdminRedirectPage = ({ organizations, loading, error }) => {
  if (error.fetchOrganization) {
    return <ErrorAlert errorText={error.fetchOrganization} />;
  }
  if (loading || organizations.length === 0) {
    return <Spinner color={themeColors.secondary} />;
  }
  return <Redirect to={`/organization/${organizations[0].id}/dashboard`} />;
};

ClinicAdminRedirectPage.propTypes = {
  organizations: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  loading: makeSelectOrganizationsLoader(),
  error: makeSelectOrganizationErrors(),
});

export default connect(mapStateToProps)(ClinicAdminRedirectPage);
