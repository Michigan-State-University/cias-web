import React from 'react';
import PropTypes from 'prop-types';
const ReportingDashboardPage = ({
  match: {
    params: { organizationId },
  },
}) => <div>Reporting dashboard {organizationId}</div>;

ReportingDashboardPage.propTypes = {
  match: PropTypes.object,
};

export default ReportingDashboardPage;
