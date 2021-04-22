import produce from 'immer';
import {
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATIONS_ERROR,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
} from './constants';

export const initialState = {
  organizations: [],
  loaders: {
    fetchOrganizations: false,
    createOrganization: false,
  },
  errors: {
    fetchOrganizations: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationsReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_ORGANIZATIONS_REQUEST: {
        draft.organizations = [];
        draft.loaders.fetchOrganizations = true;
        draft.errors.fetchOrganizations = null;
        break;
      }
      case FETCH_ORGANIZATIONS_SUCCESS: {
        draft.organizations = payload.organizations;
        draft.loaders.fetchOrganizations = false;
        break;
      }
      case FETCH_ORGANIZATIONS_ERROR: {
        draft.loaders.fetchOrganizations = false;
        draft.errors.fetchOrganizations = payload.error;
        break;
      }
      case CREATE_ORGANIZATION_REQUEST: {
        draft.loaders.createOrganization = true;
        break;
      }
      case CREATE_ORGANIZATION_SUCCESS: {
        draft.loaders.createOrganization = false;
        draft.organizations = [payload.organization, ...state.organizations];
        break;
      }
      case CREATE_ORGANIZATION_ERROR: {
        draft.loaders.createOrganization = false;
        break;
      }
    }
  });

export { organizationsReducer };
