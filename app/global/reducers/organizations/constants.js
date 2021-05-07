import { Roles } from 'models/User/UserRoles';

export const CREATE_ORGANIZATION_REQUEST =
  'app/organizations/CREATE_ORGANIZATION_REQUEST';
export const CREATE_ORGANIZATION_SUCCESS =
  'app/organizations/CREATE_ORGANIZATION_SUCCESS';
export const CREATE_ORGANIZATION_ERROR =
  'app/organizations/CREATE_ORGANIZATION_ERROR';

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

export const ADD_HEALTH_SYSTEM_REQUEST =
  'app/organizations/ADD_HEALTH_SYSTEM_REQUEST';
export const ADD_HEALTH_SYSTEM_SUCCESS =
  'app/organizations/ADD_HEALTH_SYSTEM_SUCCESS';
export const ADD_HEALTH_SYSTEM_ERROR =
  'app/organizations/ADD_HEALTH_SYSTEM_ERROR';

export const ADD_CLINIC_REQUEST = 'app/organizations/ADD_CLINIC_REQUEST';
export const ADD_CLINIC_SUCCESS = 'app/organizations/ADD_CLINIC_SUCCESS';
export const ADD_CLINIC_ERROR = 'app/organizations/ADD_CLINIC_ERROR';

export const SELECT_ENTITY_ACTION = 'app/organizations/SELECT_ENTITY_ACTION';

export const RoleToEndpointMap = {
  [Roles.eInterventionAdmin]: 'invite_intervention_admin',
  [Roles.organizationAdmin]: 'invite_organization_admin',
};

export const EntityType = {
  organization: 'ORGANIZATION',
  healthSystem: 'HEALTH_SYSTEM',
  clinic: 'CLINIC',
};
