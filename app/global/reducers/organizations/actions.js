import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_ERROR,
  FETCH_ORGANIZATION_INTERVENTIONS_REQUEST,
  FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS,
  FETCH_ORGANIZATION_INTERVENTIONS_ERROR,
  CREATE_ORGANIZATION_INTERVENTION_REQUEST,
  CREATE_ORGANIZATION_INTERVENTION_SUCCESS,
  CREATE_ORGANIZATION_INTERVENTION_ERROR,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_ERROR,
  EDIT_ORGANIZATION_REQUEST,
  EDIT_ORGANIZATION_SUCCESS,
  EDIT_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_ERROR,
  INVITE_ADMIN_REQUEST,
  INVITE_ADMIN_SUCCESS,
  INVITE_ADMIN_ERROR,
  ADD_HEALTH_SYSTEM_REQUEST,
  ADD_HEALTH_SYSTEM_SUCCESS,
  ADD_HEALTH_SYSTEM_ERROR,
  ADD_CLINIC_REQUEST,
  ADD_CLINIC_SUCCESS,
  ADD_CLINIC_ERROR,
  SELECT_ENTITY_ACTION,
  EDIT_HEALTH_SYSTEM_REQUEST,
  EDIT_HEALTH_SYSTEM_SUCCESS,
  EDIT_HEALTH_SYSTEM_ERROR,
  DELETE_HEALTH_SYSTEM_REQUEST,
  DELETE_HEALTH_SYSTEM_SUCCESS,
  DELETE_HEALTH_SYSTEM_ERROR,
  EDIT_CLINIC_REQUEST,
  EDIT_CLINIC_SUCCESS,
  EDIT_CLINIC_ERROR,
  DELETE_CLINIC_REQUEST,
  DELETE_CLINIC_SUCCESS,
  DELETE_CLINIC_ERROR,
  FETCH_HEALTH_SYSTEM_REQUEST,
  FETCH_HEALTH_SYSTEM_SUCCESS,
  FETCH_HEALTH_SYSTEM_ERROR,
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_ERROR,
  SET_SHOULD_REFETCH_ACTION,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS,
  TOGGLE_SHOW_DELETED_ENTITIES,
} from './constants';

export const fetchOrganizationsRequest = () =>
  actionBuilder(FETCH_ORGANIZATIONS_REQUEST, {});
export const fetchOrganizationsSuccess = (organizations) =>
  actionBuilder(FETCH_ORGANIZATIONS_SUCCESS, { organizations });
export const fetchOrganizationsFailure = (error) =>
  actionBuilder(FETCH_ORGANIZATIONS_ERROR, { error });

export const fetchOrganizationInterventionsRequest = (organizationId) =>
  actionBuilder(FETCH_ORGANIZATION_INTERVENTIONS_REQUEST, { organizationId });
export const fetchOrganizationInterventionsSuccess = (interventions) =>
  actionBuilder(FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS, { interventions });
export const fetchOrganizationInterventionsFailure = (error) =>
  actionBuilder(FETCH_ORGANIZATION_INTERVENTIONS_ERROR, { error });

export const createOrganizationInterventionRequest = (organizationId) =>
  actionBuilder(CREATE_ORGANIZATION_INTERVENTION_REQUEST, { organizationId });
export const createOrganizationInterventionSuccess = (intervention) =>
  actionBuilder(CREATE_ORGANIZATION_INTERVENTION_SUCCESS, { intervention });
export const createOrganizationInterventionFailure = (error) =>
  actionBuilder(CREATE_ORGANIZATION_INTERVENTION_ERROR, { error });

export const createOrganizationRequest = () =>
  actionBuilder(CREATE_ORGANIZATION_REQUEST, {});
export const createOrganizationSuccess = (organization) =>
  actionBuilder(CREATE_ORGANIZATION_SUCCESS, { organization });
export const createOrganizationFailure = (error) =>
  actionBuilder(CREATE_ORGANIZATION_ERROR, { error });

export const fetchOrganizationRequest = (id) =>
  actionBuilder(FETCH_ORGANIZATION_REQUEST, { id });
export const fetchOrganizationSuccess = (organization) =>
  actionBuilder(FETCH_ORGANIZATION_SUCCESS, { organization });
export const fetchOrganizationFailure = (error) =>
  actionBuilder(FETCH_ORGANIZATION_ERROR, { error });

export const editOrganizationRequest = (organization) =>
  actionBuilder(EDIT_ORGANIZATION_REQUEST, { organization });
export const editOrganizationSuccess = (organization) =>
  actionBuilder(EDIT_ORGANIZATION_SUCCESS, { organization });
export const editOrganizationFailure = (error) =>
  actionBuilder(EDIT_ORGANIZATION_ERROR, { error });

export const deleteOrganizationRequest = (id) =>
  actionBuilder(DELETE_ORGANIZATION_REQUEST, { id });
export const deleteOrganizationSuccess = (id) =>
  actionBuilder(DELETE_ORGANIZATION_SUCCESS, { id });
export const deleteOrganizationFailure = (error) =>
  actionBuilder(DELETE_ORGANIZATION_ERROR, { error });

export const inviteAdminRequest = (id, email, role) =>
  actionBuilder(INVITE_ADMIN_REQUEST, { email, role, id });
export const inviteAdminSuccess = (user) =>
  actionBuilder(INVITE_ADMIN_SUCCESS, { user });
export const inviteAdminFailure = (error) =>
  actionBuilder(INVITE_ADMIN_ERROR, { error });

export const fetchHealthSystemRequest = (id) =>
  actionBuilder(FETCH_HEALTH_SYSTEM_REQUEST, { id });
export const fetchHealthSystemSuccess = (healthSystem) =>
  actionBuilder(FETCH_HEALTH_SYSTEM_SUCCESS, { healthSystem });
export const fetchHealthSystemFailure = (error) =>
  actionBuilder(FETCH_HEALTH_SYSTEM_ERROR, { error });

export const addHealthSystemRequest = (organizationId, name) =>
  actionBuilder(ADD_HEALTH_SYSTEM_REQUEST, { name, organizationId });
export const addHealthSystemSuccess = (healthSystem) =>
  actionBuilder(ADD_HEALTH_SYSTEM_SUCCESS, { healthSystem });
export const addHealthSystemFailure = (error) =>
  actionBuilder(ADD_HEALTH_SYSTEM_ERROR, { error });

export const editHealthSystemRequest = (healthSystem) =>
  actionBuilder(EDIT_HEALTH_SYSTEM_REQUEST, { healthSystem });
export const editHealthSystemSuccess = (healthSystem) =>
  actionBuilder(EDIT_HEALTH_SYSTEM_SUCCESS, { healthSystem });
export const editHealthSystemFailure = (error) =>
  actionBuilder(EDIT_HEALTH_SYSTEM_ERROR, { error });

export const deleteHealthSystemRequest = (id) =>
  actionBuilder(DELETE_HEALTH_SYSTEM_REQUEST, { id });
export const deleteHealthSystemSuccess = (id) =>
  actionBuilder(DELETE_HEALTH_SYSTEM_SUCCESS, { id });
export const deleteHealthSystemFailure = (error) =>
  actionBuilder(DELETE_HEALTH_SYSTEM_ERROR, { error });

export const fetchClinicRequest = (id) =>
  actionBuilder(FETCH_CLINIC_REQUEST, { id });
export const fetchClinicSuccess = (clinic) =>
  actionBuilder(FETCH_CLINIC_SUCCESS, { clinic });
export const fetchClinicFailure = (error) =>
  actionBuilder(FETCH_CLINIC_ERROR, { error });

export const addClinicRequest = (healthSystemId, name) =>
  actionBuilder(ADD_CLINIC_REQUEST, { name, healthSystemId });
export const addClinicSuccess = (clinic) =>
  actionBuilder(ADD_CLINIC_SUCCESS, { clinic });
export const addClinicFailure = (error) =>
  actionBuilder(ADD_CLINIC_ERROR, { error });

export const editClinicRequest = (clinic) =>
  actionBuilder(EDIT_CLINIC_REQUEST, { clinic });
export const editClinicSuccess = (clinic) =>
  actionBuilder(EDIT_CLINIC_SUCCESS, { clinic });
export const editClinicFailure = (error) =>
  actionBuilder(EDIT_CLINIC_ERROR, { error });

export const deleteClinicRequest = (id, healthSystemId) =>
  actionBuilder(DELETE_CLINIC_REQUEST, { id, healthSystemId });
export const deleteClinicSuccess = (id, healthSystemId) =>
  actionBuilder(DELETE_CLINIC_SUCCESS, { id, healthSystemId });
export const deleteClinicFailure = (error) =>
  actionBuilder(DELETE_CLINIC_ERROR, { error });

export const selectEntityAction = (id, type, parentId) =>
  actionBuilder(SELECT_ENTITY_ACTION, { id, type, parentId });

export const toggleShowDeletedEntitiesAction = () =>
  actionBuilder(TOGGLE_SHOW_DELETED_ENTITIES, {});

export const setShouldRefetchAction = (type) =>
  actionBuilder(SET_SHOULD_REFETCH_ACTION, { type });

export const fetchDashboardViewSelectOptionsRequest = (organizableId) =>
  actionBuilder(FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST, { organizableId });

export const fetchDashboardViewSelectOptionsSuccess = (data) =>
  actionBuilder(FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS, { data });
export const fetchDashboardViewSelectOptionsFailure = (error) =>
  actionBuilder(FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE, { error });
