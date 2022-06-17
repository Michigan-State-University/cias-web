import camelCase from 'lodash/camelCase';
import { Roles } from './UserRoles';

const RoleToEntityUrlMap = {
  [Roles.Admin]: 'organizations',
  [Roles.EInterventionAdmin]: 'organizations',
  [Roles.OrganizationAdmin]: 'organizations',
  [Roles.HealthSystemAdmin]: 'health_systems',
  [Roles.ClinicAdmin]: 'health_clinics',
};

const RoleToInviteUrlMap = {
  [Roles.EInterventionAdmin]: 'invite_intervention_admin',
  [Roles.OrganizationAdmin]: 'invite_organization_admin',
  [Roles.HealthSystemAdmin]: 'invite_health_system_admin',
  [Roles.ClinicAdmin]: 'invite_health_clinic_admin',
};

export const mapRoleToInviteEndpoint = (
  role: keyof typeof RoleToInviteUrlMap,
  id: string,
) => {
  const entityUrl = RoleToEntityUrlMap[role];
  const inviteUrl = RoleToInviteUrlMap[role];

  return `v1/${entityUrl}/${id}/invitations/${inviteUrl}`;
};

export const mapRoleToFetchEndpoint = (
  role: keyof typeof RoleToInviteUrlMap,
  id: string,
) => {
  const entityUrl = RoleToEntityUrlMap[role];

  if (role !== Roles.ClinicAdmin) return `v1/${entityUrl}/${id}`;

  return `v1/${entityUrl}?organization_id=${id}`;
};

export const mapRoleToDashboardViewJsonKey = (
  role: keyof typeof RoleToInviteUrlMap,
) => camelCase(RoleToEntityUrlMap[role]).slice(0, -1);
