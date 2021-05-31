import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';

import { makeSelectUser } from 'global/reducers/auth';

import ManageOrganizations from './containers/ManageOrganizations/Loadable';
import DashboardSetup from './containers/DashboardSetup/Loadable';
import DashboardView from './containers/DashboardView/Loadable';

import { VIEW, ReportingDashboardPageContext } from './constants';

const ReportingDashboardPage = ({ user, view, organizableId }) => {
  const { organizationId } = useParams();

  const withContext = component => (
    <ReportingDashboardPageContext.Provider
      value={{ user, organizationId, organizableId }}
    >
      {component}
    </ReportingDashboardPageContext.Provider>
  );

  switch (view) {
    case VIEW.MANAGE_ORGANIZATIONS:
      return withContext(<ManageOrganizations />);
    case VIEW.DASHBOARD_SETUP:
      return withContext(<DashboardSetup />);
    case VIEW.DASHBOARD_VIEW:
      return withContext(<DashboardView />);
    default:
      return null;
  }
};

ReportingDashboardPage.propTypes = {
  user: PropTypes.shape({ roles: PropTypes.arrayOf(PropTypes.string) }),
  view: PropTypes.string,
  organizableId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default memo(compose(withConnect)(ReportingDashboardPage));
