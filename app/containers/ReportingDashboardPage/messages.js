/*
 * ReportingDashboardPage Messages
 *
 * This contains all the text for the ReportingDashboardPage component.
 */
import { defineMessages } from 'react-intl';

import { EntityType } from 'global/reducers/organizations';

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
    defaultMessage: 'No Organization data found!',
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
  healthSystemAdminsHeader: {
    id: `${scope}.healthSystemAdminsHeader`,
    defaultMessage: 'Health System Admins',
  },
  healthSystemAdminsHelper: {
    id: `${scope}.healthSystemAdminsHelper`,
    defaultMessage:
      'Health System Admins have read-only access to the whole Health System',
  },
  clinicAdminsHeader: {
    id: `${scope}.clinicAdminsHeader`,
    defaultMessage: 'Clinic Admins',
  },
  clinicAdminsHelper: {
    id: `${scope}.clinicAdminsHelper`,
    defaultMessage: 'Clinic Admins have read-only access to the whole Clinic',
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
  addEntityButton: {
    id: `${scope}.addEntityButton`,
    defaultMessage: `+ Add {type, select,
      ${EntityType.organization} {Organization}
      ${EntityType.healthSystem} {Health System}
      ${EntityType.clinic} {Clinic}
    }`,
  },
  healthSystemHeader: {
    id: `${scope}.healthSystemHeader`,
    defaultMessage: 'Health System',
  },
  healthSystemLabel: {
    id: `${scope}.healthSystemLabel`,
    defaultMessage: 'Health System Name',
  },
  healthSystemPlaceholder: {
    id: `${scope}.healthSystemPlaceholder`,
    defaultMessage: 'Enter Health System Name',
  },
  clinicHeader: {
    id: `${scope}.clinicHeader`,
    defaultMessage: 'Clinic',
  },
  clinicLabel: {
    id: `${scope}.clinicLabel`,
    defaultMessage: 'Clinic Name',
  },
  clinicPlaceholder: {
    id: `${scope}.clinicPlaceholder`,
    defaultMessage: 'Enter Clinic Name',
  },
});
