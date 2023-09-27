import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import {
  assignDraftItems,
  assignDraftItemsById,
  updateItemById,
} from 'utils/reduxUtils';
import {
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
  SET_SHOULD_REFETCH_ACTION,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS,
  FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST,
  TOGGLE_SHOW_DELETED_ENTITIES,
} from './constants';

import { healthSystemReducer } from './healthSystemReducer';

export const initialState = {
  selectedEntity: null,
  organization: null,
  organizationSelectData: null,
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
    fetchDashboardViewSelect: false,
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
    fetchDashboardViewSelect: null,
  },
  shouldRefetch: {
    [EntityType.organization]: false,
    [EntityType.healthSystem]: false,
    [EntityType.clinic]: false,
  },
  showDeletedEntities: false,
};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
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
          ...cloneDeep(state.organization),
          ...payload.organization,
        };
        draft.loaders.editOrganization = true;
        draft.errors.editOrganization = null;
        break;
      }

      case EDIT_ORGANIZATION_SUCCESS: {
        draft.cache.organization = {
          ...cloneDeep(state.cache.organization),
          ...payload.organization,
        };
        draft.loaders.editOrganization = false;
        draft.errors.editOrganization = null;
        break;
      }

      case EDIT_ORGANIZATION_ERROR: {
        assignDraftItems(draft.cache.organization, draft.organization);
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

        updateItemById(
          draft.organization.healthSystems,
          payload.healthSystem.id,
          (item) => healthSystemReducer(item, action),
        );
        updateItemById(
          draft.cache.organization.healthSystems,
          payload.healthSystem.id,
          (item) => healthSystemReducer(item, action),
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
          draft.cache.organization.healthSystems.unshift(
            cloneDeep(payload.healthSystem),
          );
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
        updateItemById(
          draft.organization.healthSystems,
          payload.healthSystem.id,
          (item) => healthSystemReducer(item, action),
        );

        break;
      }

      case EDIT_HEALTH_SYSTEM_SUCCESS: {
        draft.loaders.editHealthSystem = false;
        draft.errors.editHealthSystem = null;
        assignDraftItemsById(
          draft.organization.healthSystems,
          draft.cache.organization.healthSystems,
          payload.healthSystem.id,
        );

        break;
      }

      case EDIT_HEALTH_SYSTEM_ERROR: {
        draft.loaders.editHealthSystem = false;
        draft.errors.editHealthSystem = payload.error;

        assignDraftItems(
          draft.cache.organization.healthSystems,
          draft.organization.healthSystems,
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

        updateItemById(draft.organization.healthSystems, payload.id, (item) =>
          healthSystemReducer(item, action),
        );
        assignDraftItemsById(
          draft.organization.healthSystems,
          draft.cache.organization.healthSystems,
          payload.id,
        );

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

        updateItemById(
          draft.organization.healthSystems,
          payload.clinic.healthSystemId,
          (item) => healthSystemReducer(item, action),
        );
        updateItemById(
          draft.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
          (item) => healthSystemReducer(item, action),
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

        updateItemById(
          draft.organization.healthSystems,
          payload.clinic.healthSystemId,
          (item) => healthSystemReducer(item, action),
        );
        updateItemById(
          draft.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
          (item) => healthSystemReducer(item, action),
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

        updateItemById(
          draft.organization.healthSystems,
          payload.clinic.healthSystemId,
          (item) => healthSystemReducer(item, action),
        );

        break;
      }

      case EDIT_CLINIC_SUCCESS: {
        draft.loaders.editClinic = false;
        draft.errors.editClinic = null;

        assignDraftItemsById(
          draft.organization.healthSystems,
          draft.cache.organization.healthSystems,
          payload.clinic.healthSystemId,
        );

        break;
      }

      case EDIT_CLINIC_ERROR: {
        draft.loaders.editClinic = false;
        draft.errors.editClinic = payload.error;

        assignDraftItems(
          draft.cache.organization.healthSystems,
          draft.organization.healthSystems,
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

        updateItemById(
          draft.organization.healthSystems,
          payload.healthSystemId,
          (item) => healthSystemReducer(item, action),
        );
        updateItemById(
          draft.cache.organization.healthSystems,
          payload.healthSystemId,
          (item) => healthSystemReducer(item, action),
        );

        break;
      }

      case DELETE_CLINIC_ERROR: {
        draft.loaders.deleteClinic = false;
        draft.errors.deleteClinic = payload.error;
        break;
      }

      case SET_SHOULD_REFETCH_ACTION: {
        draft.shouldRefetch[payload.type ?? state.selectedEntity.type] = true;
        break;
      }

      case FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_REQUEST: {
        draft.organizationSelectData = null;
        draft.loaders.fetchDashboardViewSelect = true;
        draft.errors.fetchDashboardViewSelect = null;
        break;
      }

      case FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_SUCCESS: {
        draft.organizationSelectData = payload.data;
        draft.loaders.fetchDashboardViewSelect = false;
        break;
      }

      case FETCH_DASHBOARD_VIEW_SELECT_OPTIONS_FAILURE: {
        draft.loaders.fetchDashboardViewSelect = false;
        draft.errors.fetchDashboardViewSelect = payload.error;
        break;
      }

      case TOGGLE_SHOW_DELETED_ENTITIES: {
        draft.showDeletedEntities = !state.showDeletedEntities;
      }
    }
  });

export { organizationReducer };
