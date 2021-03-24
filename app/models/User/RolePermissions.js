import { includesArray } from 'utils/includesArray';

import { Roles } from './UserRoles';

const ALLOWED_EDIT_LOGO = [Roles.admin];

export const RolePermissions = roles => ({
  canEditLogo: includesArray(roles, ALLOWED_EDIT_LOGO),
});
