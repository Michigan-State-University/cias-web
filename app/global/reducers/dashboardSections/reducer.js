import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import { findIndexById } from 'utils/arrayUtils';
import { dashboardSectionReducer } from './dashboardSectionReducer';
import {
  ADD_SECTION_ERROR,
  ADD_SECTION_REQUEST,
  ADD_SECTION_SUCCESS,
  DELETE_SECTION_ERROR,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  EDIT_SECTION_ERROR,
  EDIT_SECTION_REQUEST,
  EDIT_SECTION_SUCCESS,
  FETCH_SECTION_ERROR,
  FETCH_SECTION_REQUEST,
  FETCH_SECTION_SUCCESS,
  FETCH_SECTIONS_ERROR,
  FETCH_SECTIONS_REQUEST,
  FETCH_SECTIONS_SUCCESS,
} from './constants';

export const initialState = {
  dashboardSections: [],
  singleDashboardSection: null,
  cache: { dashboardSections: [], singleDashboardSection: null },
  loaders: {
    fetchDashboardSectionLoader: false,
    fetchDashboardSectionsLoader: false,
    editDashboardSectionLoader: false,
    addDashboardSectionLoader: false,
    deleteDashboardSectionLoader: false,
  },
  errors: {
    fetchDashboardSectionError: null,
    fetchDashboardSectionsError: null,
    editDashboardSectionError: null,
    addDashboardSectionError: null,
    deleteDashboardSectionError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case ADD_SECTION_REQUEST: {
        draft.loaders.addDashboardSectionLoader = true;
        draft.errors.addDashboardSectionError = null;
        break;
      }

      case ADD_SECTION_SUCCESS: {
        draft.loaders.addDashboardSectionLoader = false;
        draft.errors.addDashboardSectionError = null;

        draft.dashboardSections.push(payload.dashboardSection);
        draft.cache.dashboardSections.push(cloneDeep(payload.dashboardSection));
        break;
      }
      case ADD_SECTION_ERROR: {
        draft.loaders.addDashboardSectionLoader = false;
        draft.errors.addDashboardSectionError = payload.error;
        break;
      }

      case DELETE_SECTION_REQUEST: {
        draft.loaders.deleteDashboardSectionLoader = true;
        draft.errors.deleteDashboardSectionError = null;
        break;
      }

      case DELETE_SECTION_SUCCESS: {
        draft.loaders.deleteDashboardSectionLoader = false;
        draft.errors.deleteDashboardSectionError = null;
        break;
      }
      case DELETE_SECTION_ERROR: {
        draft.loaders.deleteDashboardSectionLoader = false;
        draft.errors.deleteDashboardSectionError = payload.error;
        break;
      }

      case EDIT_SECTION_REQUEST: {
        draft.loaders.editDashboardSectionLoader = true;
        draft.errors.editDashboardSectionError = null;

        const index = findIndexById(
          state.dashboardSections,
          payload.dashboardSectionId,
        );

        if (index !== -1)
          draft.dashboardSections[index] = dashboardSectionReducer(
            state.cache.dashboardSections[index],
            action,
          );

        break;
      }

      case EDIT_SECTION_SUCCESS: {
        draft.loaders.editDashboardSectionLoader = false;
        draft.errors.editDashboardSectionError = null;

        const index = findIndexById(
          state.cache.dashboardSections,
          payload.dashboardSectionId,
        );

        if (index !== -1)
          draft.cache.dashboardSections[index] = dashboardSectionReducer(
            state.cache.dashboardSections[index],
            action,
          );
        break;
      }

      case EDIT_SECTION_ERROR: {
        draft.loaders.editDashboardSectionLoader = false;
        draft.errors.editDashboardSectionError = payload.error;
        break;
      }

      case FETCH_SECTION_REQUEST: {
        draft.loaders.fetchDashboardSectionLoader = true;
        draft.errors.fetchDashboardSectionError = null;
        break;
      }

      case FETCH_SECTION_SUCCESS: {
        draft.loaders.fetchDashboardSectionLoader = false;
        draft.errors.fetchDashboardSectionError = null;

        draft.singleDashboardSection = payload.dashboardSection;
        draft.cache.singleDashboardSection = cloneDeep(
          payload.dashboardSection,
        );
        break;
      }

      case FETCH_SECTION_ERROR: {
        draft.loaders.fetchDashboardSectionLoader = false;
        draft.errors.fetchDashboardSectionError = payload.error;
        break;
      }

      case FETCH_SECTIONS_REQUEST: {
        draft.loaders.fetchDashboardSectionsLoader = true;
        draft.errors.fetchDashboardSectionsError = null;
        break;
      }

      case FETCH_SECTIONS_SUCCESS: {
        draft.loaders.fetchDashboardSectionsLoader = false;
        draft.errors.fetchDashboardSectionsError = null;

        draft.dashboardSections = payload.dashboardSections;
        draft.cache.dashboardSections = cloneDeep(payload.dashboardSections);
        break;
      }

      case FETCH_SECTIONS_ERROR: {
        draft.loaders.fetchDashboardSectionsLoader = false;
        draft.errors.fetchDashboardSectionsError = payload.error;
        break;
      }
    }
  });

export { dashboardSectionsReducer };
