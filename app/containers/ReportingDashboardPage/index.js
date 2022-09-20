import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import ManageOrganizations from './containers/ManageOrganizations/Loadable';
import DashboardSetup from './containers/DashboardSetup/Loadable';
import DashboardView from './containers/DashboardView/Loadable';

import { VIEW, ReportingDashboardPageContext } from './constants';

const ReportingDashboardPage = ({ view, organizableId }) => {
  const { organizationId } = useParams();

  const withContext = (component) => (
    <ReportingDashboardPageContext.Provider
      value={{ organizationId, organizableId }}
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

export default ReportingDashboardPage;
