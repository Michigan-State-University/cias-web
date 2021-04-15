import { includesArray } from 'utils/includesArray';

import { Roles } from './UserRoles';

const ALLOWED_EDIT_LOGO = [Roles.admin];
const ALLOWED_DOWNLOAD_INTERVENTION_CSV = [
  Roles.admin,
  Roles.teamAdmin,
  Roles.researcher,
];

export const RolePermissions = roles => ({
  canEditLogo: includesArray(roles, ALLOWED_EDIT_LOGO),
  canDownloadInterventionCsv: includesArray(
    roles,
    ALLOWED_DOWNLOAD_INTERVENTION_CSV,
  ),
});
