import { createContext } from 'react';

export const VIEW = {
  MANAGE_ORGANIZATIONS: 'MANAGE_ORGANIZATIONS',
  DASHBOARD_VIEW: 'DASHBOARD_VIEW',
  DASHBOARD_SETUP: 'DASHBOARD_SETUP',
};

export const ReportingDashboardPageContext = createContext({
  user: null,
  organizationId: '',
});
