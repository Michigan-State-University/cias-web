import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import { findIndexById } from 'utils/arrayUtils';

import {
  FETCH_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_INTERVENTIONS_REQUEST,
  FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS,
  FETCH_ORGANIZATION_INTERVENTIONS_ERROR,
  CREATE_ORGANIZATION_INTERVENTION_REQUEST,
  CREATE_ORGANIZATION_INTERVENTION_SUCCESS,
  CREATE_ORGANIZATION_INTERVENTION_ERROR,
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
  SELECT_ENTITY_ACTION,
  EDIT_HEALTH_SYSTEM_REQUEST,
  EDIT_HEALTH_SYSTEM_SUCCESS,
  EDIT_HEALTH_SYSTEM_ERROR,
  DELETE_HEALTH_SYSTEM_REQUEST,
  DELETE_HEALTH_SYSTEM_SUCCESS,
  DELETE_HEALTH_SYSTEM_ERROR,
  ADD_CLINIC_REQUEST,
  ADD_CLINIC_SUCCESS,
  ADD_CLINIC_ERROR,
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
  EntityType,
} from './constants';

import { healthSystemReducer } from './healthSystemReducer';

export const initialState = {
  selectedEntity: null,
  organization: null,
  cache: { organization: null },
  loaders: {
    fetchOrganization: false,
    editOrganization: false,
    deleteOrganization: false,
    inviteAdmin: false,
    fetchHealthSystem: false,
    addHealthSystem: false,
    editHealthSystem: false,
    deleteHealthSystem: false,
    fetchClinic: false,
    addClinic: false,
    editClinic: false,
    deleteClinic: false,
    fetchOrganizationInterventions: false,
    createOrganizationIntervention: false,
  },
  errors: {
    fetchOrganization: null,
    editOrganization: null,
    deleteOrganization: null,
    inviteAdmin: null,
    fetchHealthSystem: null,
    addHealthSystem: null,
    editHealthSystem: null,
    deleteHealthSystem: null,
    fetchClinic: null,
    addClinic: null,
    editClinic: null,
    deleteClinic: null,
    fetchOrganizationInterventions: null,
  },
  shouldRefetch: {
    [EntityType.organization]: false,
    [EntityType.healthSystem]: false,
    [EntityType.clinic]: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case FETCH_ORGANIZATION_REQUEST: {
        draft.loaders.fetchOrganization = true;
        draft.errors.fetchOrganization = null;
        draft.shouldRefetch[EntityType.organization] = false;

        if (payload.id !== state.organization?.id) draft.organization = null;
        break;
      }

      case FETCH_ORGANIZATION_SUCCESS: {
        draft.organization = payload.organization;
        draft.cache.organization = cloneDeep(payload.organization);
        draft.loaders.fetchOrganization = false;
        draft.errors.fetchOrganization = null;
        break;
      }

      case FETCH_ORGANIZATION_ERROR: {
        draft.loaders.fetchOrganization = false;
        draft.errors.fetchOrganization = payload.error;
        break;
      }

      case EDIT_ORGANIZATION_REQUEST: {
        draft.organization = {
          ...state.cache.organization,
          ...payload.organization,
        };
        draft.loaders.editOrganization = true;
        draft.errors.editOrganization = null;
        break;
      }

      case EDIT_ORGANIZATION_SUCCESS: {
        draft.cache.organization = {
          ...state.cache.organization,
          ...payload.organization,
        };
        draft.loaders.editOrganization = false;
        draft.errors.editOrganization = null;
        break;
      }

      case EDIT_ORGANIZATION_ERROR: {
        draft.organization = state.cache.organization;
        draft.loaders.editOrganization = false;
        draft.errors.editOrganization = payload.error;
        break;
      }

      case DELETE_ORGANIZATION_REQUEST: {
        draft.loaders.deleteOrganization = true;
        draft.errors.deleteOrganization = null;
        break;
      }

      case DELETE_ORGANIZATION_SUCCESS: {
        draft.organization = null;
        draft.loaders.deleteOrganization = false;
        draft.errors.deleteOrganization = null;
        break;
      }

      case DELETE_ORGANIZATION_ERROR: {
        draft.loaders.deleteOrganization = false;
        draft.errors.deleteOrganization = payload.error;
        break;
      }

      case INVITE_ADMIN_REQUEST: {
        draft.loaders.inviteAdmin = true;
        draft.errors.inviteAdmin = null;
        break;
      }

      case INVITE_ADMIN_SUCCESS: {
        draft.loaders.inviteAdmin = false;
        draft.errors.inviteAdmin = null;

        switch (state.selectedEntity.type) {
          case EntityType.organization:
            draft.shouldRefetch[EntityType.organization] = true;
            break;
          case EntityType.healthSystem:
            draft.shouldRefetch[EntityType.healthSystem] = true;
            break;
          case EntityType.clinic:
            draft.shouldRefetch[EntityType.clinic] = true;
            break;
        }

        break;
      }

      case INVITE_ADMIN_ERROR: {
        draft.loaders.inviteAdmin = false;
        draft.errors.inviteAdmin = payload.error;
        break;
      }

      case FETCH_HEALTH_SYSTEM_REQUEST: {
        draft.loaders.fetchHealthSystem = true;
        draft.errors.fetchHealthSystem = null;
        draft.shouldRefetch[EntityType.healthSystem] = false;
        break;
      }

      case FETCH_HEALTH_SYSTEM_SUCCESS: {
        draft.loaders.fetchHealthSystem = false;
        draft.errors.fetchHealthSystem = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.healthSystem.id,
        );

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.healthSystem.id,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[index] = healthSystemReducer(
            state.cache.organization.healthSystems[index],
            action,
          );

        break;
      }

      case FETCH_HEALTH_SYSTEM_ERROR: {
        draft.loaders.fetchHealthSystem = false;
        draft.errors.fetchHealthSystem = payload.error;
        break;
      }

      case ADD_HEALTH_SYSTEM_REQUEST: {
        draft.loaders.addHealthSystem = true;
        draft.errors.inviteAdmin = null;
        break;
      }

      case ADD_HEALTH_SYSTEM_SUCCESS: {
        draft.loaders.addHealthSystem = false;
        draft.errors.inviteAdmin = null;

        if (state.organization.id === payload.healthSystem.organizationId) {
          draft.organization.healthSystems.unshift(payload.healthSystem);
          draft.cache.organization.healthSystems.unshift(payload.healthSystem);
        }
        break;
      }

      case ADD_HEALTH_SYSTEM_ERROR: {
        draft.loaders.addHealthSystem = false;
        draft.errors.inviteAdmin = payload.error;
        break;
      }

      case SELECT_ENTITY_ACTION: {
        draft.selectedEntity = payload;
        break;
      }

      case EDIT_HEALTH_SYSTEM_REQUEST: {
        draft.loaders.editHealthSystem = true;
        draft.errors.editHealthSystem = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.healthSystem.id,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );
        break;
      }

      case EDIT_HEALTH_SYSTEM_SUCCESS: {
        draft.loaders.editHealthSystem = false;
        draft.errors.editHealthSystem = null;

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.healthSystem.id,
        );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[cacheIndex] =
            payload.healthSystem;
        break;
      }

      case EDIT_HEALTH_SYSTEM_ERROR: {
        draft.loaders.editHealthSystem = false;
        draft.errors.editHealthSystem = payload.error;

        draft.organization.healthSystems = cloneDeep(
          state.cache.organization.healthSystems,
        );

        break;
      }

      case DELETE_HEALTH_SYSTEM_REQUEST: {
        draft.loaders.deleteHealthSystem = true;
        draft.errors.deleteHealthSystem = null;
        break;
      }

      case DELETE_HEALTH_SYSTEM_SUCCESS: {
        draft.loaders.deleteHealthSystem = false;
        draft.errors.deleteHealthSystem = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.id,
        );

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.id,
        );

        if (index !== -1) draft.organization.healthSystems.splice(index, 1);

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems.splice(cacheIndex, 1);

        break;
      }

      case DELETE_HEALTH_SYSTEM_ERROR: {
        draft.loaders.deleteHealthSystem = false;
        draft.errors.deleteHealthSystem = payload.error;
        break;
      }

      case FETCH_CLINIC_REQUEST: {
        draft.loaders.fetchClinic = true;
        draft.errors.fetchClinic = null;
        draft.shouldRefetch[EntityType.clinic] = false;
        break;
      }

      case FETCH_CLINIC_SUCCESS: {
        draft.loaders.fetchClinic = false;
        draft.errors.fetchClinic = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[index] = healthSystemReducer(
            state.cache.organization.healthSystems[index],
            action,
          );

        break;
      }

      case FETCH_CLINIC_ERROR: {
        draft.loaders.fetchClinic = false;
        draft.errors.fetchClinic = payload.error;
        break;
      }

      case ADD_CLINIC_REQUEST: {
        draft.loaders.addClinic = true;
        draft.errors.addClinic = null;
        break;
      }

      case ADD_CLINIC_SUCCESS: {
        draft.loaders.addClinic = false;
        draft.errors.addClinic = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[
            cacheIndex
          ] = healthSystemReducer(
            state.cache.organization.healthSystems[cacheIndex],
            action,
          );

        break;
      }

      case ADD_CLINIC_ERROR: {
        draft.loaders.addClinic = false;
        draft.errors.addClinic = payload.error;
        break;
      }

      case EDIT_CLINIC_REQUEST: {
        draft.loaders.editClinic = true;
        draft.errors.editClinic = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );

        break;
      }

      case EDIT_CLINIC_SUCCESS: {
        draft.loaders.editClinic = false;
        draft.errors.editClinic = null;

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[
            cacheIndex
          ] = healthSystemReducer(
            state.cache.organization.healthSystems[cacheIndex],
            action,
          );

        break;
      }

      case EDIT_CLINIC_ERROR: {
        draft.loaders.editClinic = false;
        draft.errors.editClinic = payload.error;

        draft.organization.healthSystems = cloneDeep(
          state.cache.organization.healthSystems,
        );

        break;
      }

      case DELETE_CLINIC_REQUEST: {
        draft.loaders.deleteClinic = true;
        draft.errors.deleteClinic = null;
        break;
      }

      case DELETE_CLINIC_SUCCESS: {
        draft.loaders.deleteClinic = false;
        draft.errors.deleteClinic = null;

        const index = findIndexById(
          state.organization.healthSystems,
          payload.healthSystemId,
        );

        const cacheIndex = findIndexById(
          state.cache.organization.healthSystems,
          payload.healthSystemId,
        );

        if (index !== -1)
          draft.organization.healthSystems[index] = healthSystemReducer(
            state.organization.healthSystems[index],
            action,
          );

        if (cacheIndex !== -1)
          draft.cache.organization.healthSystems[
            cacheIndex
          ] = healthSystemReducer(
            state.cache.organization.healthSystems[cacheIndex],
            action,
          );

        break;
      }

      case DELETE_CLINIC_ERROR: {
        draft.loaders.deleteClinic = false;
        draft.errors.deleteClinic = payload.error;
        break;
      }

      case FETCH_ORGANIZATION_INTERVENTIONS_REQUEST: {
        draft.organization.interventions = null;
        draft.loaders.fetchOrganizationInterventions = true;
        draft.errors.fetchOrganizationInterventions = null;
        break;
      }
      case FETCH_ORGANIZATION_INTERVENTIONS_SUCCESS: {
        draft.organization.interventions = payload.interventions;
        draft.loaders.fetchOrganizationInterventions = false;

        break;
      }
      case FETCH_ORGANIZATION_INTERVENTIONS_ERROR: {
        draft.loaders.fetchOrganizationInterventions = false;
        draft.errors.fetchOrganizationInterventions = payload.error;
        break;
      }
      case CREATE_ORGANIZATION_INTERVENTION_REQUEST: {
        draft.loaders.addOrganizationIntervention = true;
        break;
      }
      case CREATE_ORGANIZATION_INTERVENTION_SUCCESS: {
        draft.organization.interventions = [
          ...state.organization.interventions,
          payload.intervention,
        ];
        draft.loaders.addOrganizationIntervention = false;

        break;
      }
      case CREATE_ORGANIZATION_INTERVENTION_ERROR: {
        draft.loaders.addOrganizationIntervention = false;
        break;
      }
    }
  });

export { organizationReducer };
