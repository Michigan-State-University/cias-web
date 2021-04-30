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
  interventionAdminsHeader: {
    id: `${scope}.interventionAdminsHeader`,
    defaultMessage: 'E-Intervention Admins',
  },
  interventionAdminsHelper: {
    id: `${scope}.interventionAdminsHelper`,
    defaultMessage: 'E-Intervention Admins can manage the whole Organization',
  },
  organizationAdminsHeader: {
    id: `${scope}.organizationAdminsHeader`,
    defaultMessage: 'Organization Admins',
  },
  organizationAdminsHelper: {
    id: `${scope}.organizationAdminsHelper`,
    defaultMessage:
      'Organization Admins have read-only access to the whole Organization',
  },

  addAdminButton: {
    id: `${scope}.addAdminButton`,
    defaultMessage: '+ Add New Admin',
  },
  inviteAdminHeader: {
    id: `${scope}.inviteAdminHeader`,
    defaultMessage: 'Invite New Admin',
  },
  inviteAdminSubheader: {
    id: `${scope}.inviteAdminSubheader`,
    defaultMessage: 'to manage {name}',
  },
  adminEmailLabel: {
    id: `${scope}.adminEmailLabel`,
    defaultMessage: 'E-mail Address',
  },
  adminEmailPlaceholder: {
    id: `${scope}.adminEmailPlaceholder`,
    defaultMessage: 'Enter e-mail address',
  },
  inviteAdminButton: {
    id: `${scope}.inviteAdminButton`,
    defaultMessage: 'Send Invite',
  },
});
