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
      ORGANIZATION {Organization}
      HEALTH_SYSTEM {Health System}
      CLINIC {Clinic}
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
  reportingInterventions: {
    id: `${scope}.reportingInterventions`,
    defaultMessage: 'Reporting interventions',
  },
  addReportingIntervention: {
    id: `${scope}.addReportingIntervention`,
    defaultMessage: 'Add reporting intervention',
  },
  userGoBack: {
    id: `${scope}.userGoBack`,
    defaultMessage: '< Back to Unit Settings',
  },
  userFirstNameLabel: {
    id: `${scope}.userFirstNameLabel`,
    defaultMessage: 'First Name',
  },
  userFirstNamePlaceholder: {
    id: `${scope}.userFirstNamePlaceholder`,
    defaultMessage: 'Enter First Name',
  },
  userLastNameLabel: {
    id: `${scope}.userLastNameLabel`,
    defaultMessage: 'Last Name',
  },
  userLastNamePlaceholder: {
    id: `${scope}.userLastNamePlaceholder`,
    defaultMessage: 'Enter Last Name',
  },
  userRoleLabel: {
    id: `${scope}.userRoleLabel`,
    defaultMessage: 'Role',
  },
  userRolePlaceholder: {
    id: `${scope}.userRolePlaceholder`,
    defaultMessage: 'Enter Role',
  },
  userEmailLabel: {
    id: `${scope}.userEmailLabel`,
    defaultMessage: 'E-mail Address',
  },
  userEmailPlaceholder: {
    id: `${scope}.userEmailPlaceholder`,
    defaultMessage: 'Enter E-mail Address',
  },
  userActivate: {
    id: `${scope}.userActivate`,
    defaultMessage: 'Activate account',
  },
  userDeactivate: {
    id: `${scope}.userDeactivate`,
    defaultMessage: 'Deactivate account',
  },
  deactivateAccountConfirm: {
    id: `${scope}.deactivateAccountConfirm`,
    defaultMessage: 'Are you sure you want to deactivate this account?',
  },
  activateAccountConfirm: {
    id: `${scope}.activateAccountConfirm`,
    defaultMessage: 'Are you sure you want to activate this account?',
  },
  allTime: {
    id: `${scope}.allTime`,
    defaultMessage: 'All time',
  },
  singleYear: {
    id: `${scope}.singleYear`,
    defaultMessage: 'One year',
  },
  xDays: {
    id: `${scope}.xDays`,
    defaultMessage: '{numberOfDays} days',
  },
  filterData: {
    id: `${scope}.filterData`,
    defaultMessage: 'Filter data',
  },
  fieldCannotBeEmpty: {
    id: `${scope}.fieldCannotBeEmpty`,
    defaultMessage: '{field} cannot be empty',
  },
  deleteEntityModalTitle: {
    id: `${scope}.deleteOrganizationModalTitle`,
    defaultMessage: 'Are you sure you want to delete this {type}?',
  },
  deleteEntityModalHeader: {
    id: `${scope}.deleteOrganizationModalHeader`,
    defaultMessage: `{type} <b>{name}</b> will be permanently deleted.<br /><br />
      This operation cannot be undone and you will not be able to do any changes.<br /><br />
      You will still be able to access charts and their data for this {type} and filter by it.`,
  },
  showDeletedEntitiesToggle: {
    id: `${scope}.showDeletedEntitiesToggle`,
    defaultMessage: 'Show deleted elements',
  },
});
