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
];

const FORBIDDEN_LEFT_SIDEBAR_DISPLAY = [
  Roles.participant,
  Roles.thirdParty,
  Roles.organizationAdmin,
  Roles.clinicAdmin,
];

const CAN_DISPLAY_ORGANIZATION_SIDEBAR = [Roles.healthSystemAdmin];

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
  canDisplayHealthSystemsSidebar: arraysOverlap(
    roles,
    CAN_DISPLAY_ORGANIZATION_SIDEBAR,
  ),
});
