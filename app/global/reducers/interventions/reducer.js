import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { archived } from 'models/Status/StatusTypes';
import {
  EDIT_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_SUCCESS,
} from 'global/reducers/intervention';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  ARCHIVE_INTERVENTION_ERROR,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
  IMPORT_INTERVENTION_ERROR,
  IMPORT_INTERVENTION_REQUEST,
  IMPORT_INTERVENTION_SUCCESS,
  REFETCH_INTERVENTIONS,
  RESET_IMPORT_INTERVENTION_STATE,
} from './constants';

export const initialState = {
  filterData: undefined,
  shouldRefetch: false,
  interventionsSize: Number.MAX_SAFE_INTEGER,
  interventions: [],
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
export const interventionsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_INTERVENTIONS_REQUEST: {
        if (state.shouldRefetch) draft.interventions = [];

        draft.shouldRefetch = false;
        if (isEmpty(state.interventions)) {
          draft.loaders.fetchInterventions = true;
        }
        draft.errors.fetchInterventions = null;
        draft.loaders.fetchInterventions = true;

        const {
          payload: { paginationData, filterData },
        } = action;

        if (state.filterData !== filterData) {
          draft.filterData = filterData;
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

        const {
          payload: { interventions, paginationData, interventionsSize },
        } = action;

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
        } else draft.interventions = action.payload.interventions;
        break;
      }
      case FETCH_INTERVENTIONS_ERROR:
        draft.loaders.fetchInterventions = false;
        draft.errors.fetchInterventions = action.payload.error;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.interventions.unshift(action.payload.intervention);
        break;
      case ARCHIVE_INTERVENTION_REQUEST:
        let interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex].status = archived;
        draft.cache.archiveIntervention =
          state.interventions[interventionIndex];
        break;
      case ARCHIVE_INTERVENTION_SUCCESS:
        draft.shouldRefetch = true;
        draft.cache.archiveIntervention = null;
        break;
      case ARCHIVE_INTERVENTION_ERROR:
        interventionIndex = draft.interventions.findIndex(
          ({ id }) => id === action.payload.interventionId,
        );
        draft.interventions[interventionIndex] =
          state.cache.archiveIntervention;
        draft.cache.archiveIntervention = null;
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
        draft.errors.importIntervention = action.payload.error;
        break;
      }
      case RESET_IMPORT_INTERVENTION_STATE: {
        draft.loaders.importIntervention = false;
        draft.errors.importIntervention = null;
        break;
      }

      case REFETCH_INTERVENTIONS:
        draft.shouldRefetch = true;
        break;
    }
  });

export default interventionsReducer;
