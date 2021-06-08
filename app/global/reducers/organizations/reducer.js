import produce from 'immer';

import {
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATIONS_ERROR,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_SUCCESS,
  EDIT_ORGANIZATION_SUCCESS,
} from './constants';

import {
  organizationReducer,
  initialState as organizationInitialState,
} from './organizationReducer';

export const initialState = {
  organizations: [],
  organization: organizationInitialState,
  cache: { organization: null },
  loaders: {
    fetchOrganizations: false,
    createOrganization: false,
  },
  errors: {
    fetchOrganizations: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.organization = organizationReducer(state.organization, action);

    const { type, payload } = action;
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

      case EDIT_ORGANIZATION_SUCCESS: {
        draft.organizations = state.organizations.map(organization => {
          if (organization.id === payload.organization.id)
            return { ...payload.organization };

          return organization;
        });
        break;
      }

      case DELETE_ORGANIZATION_SUCCESS: {
        draft.organizations = state.organizations.filter(
          ({ id }) => id !== payload.id,
        );
        break;
      }
    }
  });

export { organizationsReducer };
