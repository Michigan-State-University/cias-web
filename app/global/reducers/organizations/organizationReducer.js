import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

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
} from './constants';

export const initialState = {
  organization: null,
  cache: { organization: null },
  loaders: {
    fetchOrganization: false,
    editOrganization: false,
    deleteOrganization: false,
    inviteAdmin: false,
  },
  errors: {
    fetchOrganization: null,
    editOrganization: null,
    deleteOrganization: null,
    inviteAdmin: null,
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
        draft.organization = merge(state.organization, payload.organization);
        draft.loaders.editOrganization = true;
        draft.errors.editOrganization = null;
        break;
      }

      case EDIT_ORGANIZATION_SUCCESS: {
        draft.cache.organization = merge(
          state.cache.organization,
          payload.organization,
        );
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
    }
  });

export { organizationReducer };
