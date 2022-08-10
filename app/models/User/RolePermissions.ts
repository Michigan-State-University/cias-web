import { arraysOverlap } from 'utils/arrayUtils';
import { UserRoles } from './User';

import { Roles } from './UserRoles';

const ALLOWED_DOWNLOAD_INTERVENTION_CSV = [
  Roles.admin,
  Roles.teamAdmin,
  Roles.researcher,
  Roles.eInterventionAdmin,
];

const ALLOWED_ORGANIZATION_SIDEBAR_DISPLAY = [
  Roles.admin,
  Roles.eInterventionAdmin,
  Roles.clinicAdmin,
];

const FORBIDDEN_LEFT_SIDEBAR_DISPLAY = [
  Roles.thirdParty,
  Roles.organizationAdmin,
  Roles.healthSystemAdmin,
];

const FORBIDDEN_FULL_ORGANIZATIONS_ACCESS = [Roles.clinicAdmin];

const ALLOWED_ADD_ORGANIZATION = [Roles.admin];

const ALLOWED_DELETE_ORGANIZATION = [Roles.admin];

const ALLOWED_ASSIGN_ORGANIZATION_TO_INTERVENTION = [
  Roles.admin,
  Roles.eInterventionAdmin,
];

const ALLOWED_CAT_MH_SETTING_DISPLAY = [
  Roles.admin,
  Roles.researcher,
  Roles.eInterventionAdmin,
  Roles.teamAdmin,
];

const ALLOWED_QUICK_EXIT_ROLES = [Roles.guest, Roles.participant];

export const RolePermissions = (
  roles: UserRoles[],
): Record<string, boolean> => ({
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
  canAssignOrganizationToIntervention: arraysOverlap(
    roles,
    ALLOWED_ASSIGN_ORGANIZATION_TO_INTERVENTION,
  ),
  canDisplayCatMhSetting: arraysOverlap(roles, ALLOWED_CAT_MH_SETTING_DISPLAY),
  canUseQuickExit: arraysOverlap(roles, ALLOWED_QUICK_EXIT_ROLES),
});
