import { arraysOverlap } from 'utils/arrayUtils';

import { Roles } from './UserRoles';

const ALLOWED_EDIT_LOGO = [Roles.admin];
const ALLOWED_DOWNLOAD_INTERVENTION_CSV = [
  Roles.admin,
  Roles.teamAdmin,
  Roles.researcher,
];
const ALLOWED_ORGANIZATION_SIDEBAR_DISPLAY = [
  Roles.admin,
  Roles.eInterventionAdmin,
  Roles.clinicAdmin,
];

const FORBIDDEN_LEFT_SIDEBAR_DISPLAY = [
  Roles.participant,
  Roles.thirdParty,
  Roles.organizationAdmin,
  Roles.healthSystemAdmin,
];

const FORBIDDEN_FULL_ORGANIZATIONS_ACCESS = [Roles.clinicAdmin];

const ALLOWED_ADD_ORGANIZATION = [Roles.admin];

const ALLOWED_DELETE_ORGANIZATION = [Roles.admin];

export const RolePermissions = roles => ({
  canEditLogo: arraysOverlap(roles, ALLOWED_EDIT_LOGO),
  canDownloadInterventionCsv: arraysOverlap(
    roles,
    ALLOWED_DOWNLOAD_INTERVENTION_CSV,
  ),
  canDisplayOrganizationSidebar: arraysOverlap(
    roles,
    ALLOWED_ORGANIZATION_SIDEBAR_DISPLAY,
  ),
  canDisplayLeftSidebar: !arraysOverlap(roles, FORBIDDEN_LEFT_SIDEBAR_DISPLAY),
  canAccessOrganizations: !arraysOverlap(
    roles,
    FORBIDDEN_FULL_ORGANIZATIONS_ACCESS,
  ),
  canAddNewOrganization: arraysOverlap(roles, ALLOWED_ADD_ORGANIZATION),
  canDeleteOrganization: arraysOverlap(roles, ALLOWED_DELETE_ORGANIZATION),
});
