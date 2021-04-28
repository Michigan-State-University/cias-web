/*
 * ReportingDashboardPage Messages
 *
 * This contains all the text for the ReportingDashboardPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReportingDashboardPage';

export default defineMessages({
  manageOrganizations: {
    id: `${scope}.manageOrganizations`,
    defaultMessage: 'Manage Organizations',
  },
  dashboardSetup: {
    id: `${scope}.dashboardSetup`,
    defaultMessage: 'Dashboard Setup',
  },
  dashboardView: {
    id: `${scope}.dashboardView`,
    defaultMessage: 'Dashboard View',
  },
  deleteEntity: {
    id: `${scope}.deleteEntity`,
    defaultMessage: 'Delete',
  },
  organizationHeader: {
    id: `${scope}.organizationHeader`,
    defaultMessage: 'Organization',
  },
  organizationLabel: {
    id: `${scope}.organizationLabel`,
    defaultMessage: 'Organization Name',
  },
  organizationPlaceholder: {
    id: `${scope}.organizationPlaceholder`,
    defaultMessage: 'Enter Organization Name',
  },
  noOrganizations: {
    id: `${scope}.noOrganizations`,
    defaultMessage: 'No Organizations found!',
  },
});
