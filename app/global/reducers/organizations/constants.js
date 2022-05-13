import camelCase from 'lodash/camelCase';

import { Roles } from 'models/User/UserRoles';

export const CREATE_ORGANIZATION_REQUEST =
  'app/organizations/CREATE_ORGANIZATION_REQUEST';
export const CREATE_ORGANIZATION_SUCCESS =
  'app/organizations/CREATE_ORGANIZATION_SUCCESS';
export const CREATE_ORGANIZATION_ERROR =
  'app/organizations/CREATE_ORGANIZATION_ERROR';

export const FETCH_ORGANIZATION_INTERVENTIONS_REQUEST =
  'app/organizations/FETCH_ORGANIZATION_INTERVENTIONS_REQUEST';
export const FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS =
  'app/organizations/FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS';
export const FETCH_ORGANIZATION_INTERVENTIONS_ERROR =
  'app/organizations/FETCH_ORGANIZATION_INTERVENTIONS_ERROR';

export const CREATE_ORGANIZATION_INTERVENTION_REQUEST =
  'app/organizations/CREATE_ORGANIZATION_INTERVENTION_REQUEST';
export const CREATE_ORGANIZATION_INTERVENTION_SUCCESS =
  'app/organizations/CREATE_ORGANIZATION_INTERVENTION_SUCCESS';
export const CREATE_ORGANIZATION_INTERVENTION_ERROR =
  'app/organizations/CREATE_ORGANIZATION_INTERVENTION_ERROR';

export const FETCH_ORGANIZATIONS_REQUEST =
  'app/organizations/FETCH_ORGANIZATIONS_REQUEST';
export const FETCH_ORGANIZATIONS_SUCCESS =
  'app/organizations/FETCH_ORGANIZATIONS_SUCCESS';
export const FETCH_ORGANIZATIONS_ERROR =
  'app/organizations/FETCH_ORGANIZATIONS_ERROR';

export const FETCH_ORGANIZATION_REQUEST =
  'app/organizations/FETCH_ORGANIZATION_REQUEST';
export const FETCH_ORGANIZATION_SUCCESS =
  'app/organizations/FETCH_ORGANIZATION_SUCCESS';
export const FETCH_ORGANIZATION_ERROR =
  'app/organizations/FETCH_ORGANIZATION_ERROR';

export const EDIT_ORGANIZATION_REQUEST =
  'app/organizations/EDIT_ORGANIZATION_REQUEST';
export const EDIT_ORGANIZATION_SUCCESS =
  'app/organizations/EDIT_ORGANIZATION_SUCCESS';
export const EDIT_ORGANIZATION_ERROR =
  'app/organizations/EDIT_ORGANIZATION_ERROR';

export const DELETE_ORGANIZATION_REQUEST =
  'app/organizations/DELETE_ORGANIZATION_REQUEST';
export const DELETE_ORGANIZATION_SUCCESS =
  'app/organizations/DELETE_ORGANIZATION_SUCCESS';
export const DELETE_ORGANIZATION_ERROR =
  'app/organizations/DELETE_ORGANIZATION_ERROR';

export const INVITE_ADMIN_REQUEST = 'app/organizations/INVITE_ADMIN_REQUEST';
export const INVITE_ADMIN_SUCCESS = 'app/organizations/INVITE_ADMIN_SUCCESS';
export const INVITE_ADMIN_ERROR = 'app/organizations/INVITE_ADMIN_ERROR';

export const FETCH_HEALTH_SYSTEM_REQUEST =
  'app/organizations/FETCH_HEALTH_SYSTEM_REQUEST';
export const FETCH_HEALTH_SYSTEM_SUCCESS =
  'app/organizations/FETCH_HEALTH_SYSTEM_SUCCESS';
export const FETCH_HEALTH_SYSTEM_ERROR =
  'app/organizations/FETCH_HEALTH_SYSTEM_ERROR';

export const ADD_HEALTH_SYSTEM_REQUEST =
  'app/organizations/ADD_HEALTH_SYSTEM_REQUEST';
export const ADD_HEALTH_SYSTEM_SUCCESS =
  'app/organizations/ADD_HEALTH_SYSTEM_SUCCESS';
export const ADD_HEALTH_SYSTEM_ERROR =
  'app/organizations/ADD_HEALTH_SYSTEM_ERROR';

export const EDIT_HEALTH_SYSTEM_REQUEST =
  'app/organizations/EDIT_HEALTH_SYSTEM_REQUEST';
export const EDIT_HEALTH_SYSTEM_SUCCESS =
  'app/organizations/EDIT_HEALTH_SYSTEM_SUCCESS';
export const EDIT_HEALTH_SYSTEM_ERROR =
  'app/organizations/EDIT_HEALTH_SYSTEM_ERROR';

export const DELETE_HEALTH_SYSTEM_REQUEST =
  'app/organizations/DELETE_HEALTH_SYSTEM_REQUEST';
export const DELETE_HEALTH_SYSTEM_SUCCESS =
  'app/organizations/DELETE_HEALTH_SYSTEM_SUCCESS';
export const DELETE_HEALTH_SYSTEM_ERROR =
  'app/organizations/DELETE_HEALTH_SYSTEM_ERROR';

export const FETCH_CLINIC_REQUEST = 'app/organizations/FETCH_CLINIC_REQUEST';
export const FETCH_CLINIC_SUCCESS = 'app/organizations/FETCH_CLINIC_SUCCESS';
export const FETCH_CLINIC_ERROR = 'app/organizations/FETCH_CLINIC_ERROR';

export const ADD_CLINIC_REQUEST = 'app/organizations/ADD_CLINIC_REQUEST';
export const ADD_CLINIC_SUCCESS = 'app/organizations/ADD_CLINIC_SUCCESS';
export const ADD_CLINIC_ERROR = 'app/organizations/ADD_CLINIC_ERROR';

export const EDIT_CLINIC_REQUEST = 'app/organizations/EDIT_CLINIC_REQUEST';
export const EDIT_CLINIC_SUCCESS = 'app/organizations/EDIT_CLINIC_SUCCESS';
export const EDIT_CLINIC_ERROR = 'app/organizations/EDIT_CLINIC_ERROR';

export const DELETE_CLINIC_REQUEST = 'app/organizations/DELETE_CLINIC_REQUEST';
export const DELETE_CLINIC_SUCCESS = 'app/organizations/DELETE_CLINIC_SUCCESS';
export const DELETE_CLINIC_ERROR = 'app/organizations/DELETE_CLINIC_ERROR';

export const SELECT_ENTITY_ACTION = 'app/organizations/SELECT_ENTITY_ACTION';

export const TOGGLE_SHOW_DELETED_ENTITIES =
  'app/organizations/TOGGLE_SHOW_DELETED_ENTITIES';

export const SET_SHOULD_REFETCH_ACTION =
  'app/organizations/SET_SHOULD_REFETCH_ACTION';

export const FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST =
  'app/organizations/FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST';
export const FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS =
  'app/organizations/FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS';
export const FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE =
  'app/organizations/FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE';

const RoleToEntityUrlMap = {
  [Roles.admin]: 'organizations',
  [Roles.eInterventionAdmin]: 'organizations',
  [Roles.organizationAdmin]: 'organizations',
  [Roles.healthSystemAdmin]: 'health_systems',
  [Roles.clinicAdmin]: 'health_clinics',
};

const RoleToInviteUrlMap = {
  [Roles.eInterventionAdmin]: 'invite_intervention_admin',
  [Roles.organizationAdmin]: 'invite_organization_admin',
  [Roles.healthSystemAdmin]: 'invite_health_system_admin',
  [Roles.clinicAdmin]: 'invite_health_clinic_admin',
};

export const mapRoleToInviteEndpoint = (role, id) => {
  const entityUrl = RoleToEntityUrlMap[role];
  const inviteUrl = RoleToInviteUrlMap[role];

  return `v1/${entityUrl}/${id}/invitations/${inviteUrl}`;
};

export const mapRoleToFetchEndpoint = (role, id) => {
  const entityUrl = RoleToEntityUrlMap[role];

  if (role !== Roles.clinicAdmin) return `v1/${entityUrl}/${id}`;

  return `v1/${entityUrl}?organization_id=${id}`;
};

export const mapRoleToDashboardViewJsonKey = (role) =>
  camelCase(RoleToEntityUrlMap[role]).slice(0, -1);

export const EntityType = {
  organization: 'ORGANIZATION',
  healthSystem: 'HEALTH_SYSTEM',
  clinic: 'CLINIC',
};
