import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import {
  EDIT_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_SUCCESS,
} from 'global/reducers/intervention';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { updateItemById, updateListItemStateById } from 'utils/reduxUtils';

import {
  CHANGE_MAIN_DASHBOARD_FILTER_DATA,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
  IMPORT_INTERVENTION_ERROR,
  IMPORT_INTERVENTION_REQUEST,
  IMPORT_INTERVENTION_SUCCESS,
  INTERVENTION_LIST_ITEM_DEFAULT_STATE,
  MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE,
  REFETCH_INTERVENTIONS,
  RESET_IMPORT_INTERVENTION_STATE,
  STAR_INTERVENTION_ERROR,
  STAR_INTERVENTION_REQUEST,
  STAR_INTERVENTION_SUCCESS,
  UNSTAR_INTERVENTION_ERROR,
  UNSTAR_INTERVENTION_REQUEST,
  UNSTAR_INTERVENTION_SUCCESS,
  UPDATE_INTERVENTION_LIST_ITEM_BY_ID,
} from './constants';

export const initialState = {
  currentFilterData: undefined,
  shouldRefetch: false,
  interventionsSize: Number.MAX_SAFE_INTEGER,
  interventions: [],
  interventionsStates: {},
  mainDashboardFilterData: MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE,
  loaders: {
    fetchInterventions: true,
    importIntervention: false,
  },
  errors: {
    fetchInterventions: null,
    importIntervention: null,
  },
  cache: {
    archiveIntervention: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const interventionsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    const updateInterventionListItemStateById = (interventionId, changes) => {
      updateListItemStateById(
        draft.interventionsStates,
        interventionId,
        changes,
        INTERVENTION_LIST_ITEM_DEFAULT_STATE,
      );
    };

    switch (type) {
      case FETCH_INTERVENTIONS_REQUEST: {
        if (state.shouldRefetch) draft.interventions = [];

        draft.shouldRefetch = false;
        if (isEmpty(state.interventions)) {
          draft.loaders.fetchInterventions = true;
        }
        draft.errors.fetchInterventions = null;
        draft.loaders.fetchInterventions = true;

        const { paginationData, filterData } = payload;

        if (state.currentFilterData !== filterData) {
          draft.currentFilterData = filterData;
          draft.interventions = [];
        }

        if (!isNullOrUndefined(paginationData)) {
          const { endIndex } = paginationData;

          const isOverflown = endIndex >= draft.interventions.length;
          const isLoading =
            draft.interventions[draft.interventions.length - 1]?.isLoading;

          if (isOverflown && !isLoading) {
            draft.interventions.push({
              ...state.interventions[state.interventions.length - 1],
              isLoading: true,
            });
          }
        }
        break;
      }
      case FETCH_INTERVENTIONS_SUCCESS: {
        draft.loaders.fetchInterventions = false;

        const { interventions, paginationData, interventionsSize } = payload;

        draft.interventionsSize = interventionsSize;

        if (!isNullOrUndefined(paginationData)) {
          const { startIndex, endIndex } = paginationData;

          const isLoading =
            state.interventions[state.interventions.length - 1]?.isLoading;
          if (isLoading) draft.interventions.pop();

          draft.interventions.splice(
            startIndex,
            endIndex - startIndex + 1,
            ...interventions,
          );
        } else draft.interventions = payload.interventions;
        break;
      }
      case FETCH_INTERVENTIONS_ERROR:
        draft.loaders.fetchInterventions = false;
        draft.errors.fetchInterventions = payload.error;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.interventions.unshift(payload.intervention);
        break;

      case EDIT_INTERVENTION_SUCCESS:
        draft.shouldRefetch = true;
        break;

      case IMPORT_INTERVENTION_REQUEST: {
        draft.loaders.importIntervention = true;
        draft.errors.importIntervention = null;
        break;
      }
      case IMPORT_INTERVENTION_SUCCESS: {
        draft.loaders.importIntervention = false;
        break;
      }
      case IMPORT_INTERVENTION_ERROR: {
        draft.loaders.importIntervention = false;
        draft.errors.importIntervention = payload.error;
        break;
      }
      case RESET_IMPORT_INTERVENTION_STATE: {
        draft.loaders.importIntervention = false;
        draft.errors.importIntervention = null;
        break;
      }

      case REFETCH_INTERVENTIONS: {
        draft.shouldRefetch = true;
        break;
      }

      case UPDATE_INTERVENTION_LIST_ITEM_BY_ID: {
        const { interventionId, changes } = payload;
        updateItemById(draft.interventions, interventionId, changes);
        break;
      }

      case STAR_INTERVENTION_REQUEST: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          starInterventionLoading: true,
        });
        break;
      }
      case STAR_INTERVENTION_SUCCESS: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          starInterventionLoading: false,
        });
        updateItemById(draft.interventions, interventionId, { starred: true });
        break;
      }
      case STAR_INTERVENTION_ERROR: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          starInterventionLoading: false,
        });
        break;
      }

      case UNSTAR_INTERVENTION_REQUEST: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          unstarInterventionLoading: true,
        });
        break;
      }
      case UNSTAR_INTERVENTION_SUCCESS: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          unstarInterventionLoading: false,
        });
        updateItemById(draft.interventions, interventionId, { starred: false });
        break;
      }
      case UNSTAR_INTERVENTION_ERROR: {
        const { interventionId } = payload;
        updateInterventionListItemStateById(interventionId, {
          unstarInterventionLoading: false,
        });
        break;
      }

      case CHANGE_MAIN_DASHBOARD_FILTER_DATA: {
        const { filterDataChanges } = payload;
        draft.mainDashboardFilterData = {
          ...draft.mainDashboardFilterData,
          ...filterDataChanges,
        };
        break;
      }
    }
  });

export default interventionsReducer;

export const withInterventionsReducer = {
  key: 'interventions',
  reducer: interventionsReducer,
};
