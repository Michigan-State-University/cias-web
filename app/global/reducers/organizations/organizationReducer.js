import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

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
} from './constants';

export const initialState = {
  selectedEntity: null,
  organization: null,
  cache: { organization: null },
  loaders: {
    fetchOrganization: false,
    editOrganization: false,
    deleteOrganization: false,
    inviteAdmin: false,
    addHealthSystem: false,
  },
  errors: {
    fetchOrganization: null,
    editOrganization: null,
    deleteOrganization: null,
    inviteAdmin: null,
    addHealthSystem: null,
  },
  shouldRefetch: false,
};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_ORGANIZATION_REQUEST: {
        draft.loaders.fetchOrganization = true;
        draft.errors.fetchOrganization = null;
        draft.shouldRefetch = false;

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
        draft.shouldRefetch = true;
        break;
      }

      case INVITE_ADMIN_ERROR: {
        draft.loaders.inviteAdmin = false;
        draft.errors.inviteAdmin = payload.error;
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
      }
    }
  });

export { organizationReducer };
