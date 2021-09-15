import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { archived } from 'models/Status/StatusTypes';
import { EDIT_INTERVENTION_SUCCESS } from 'global/reducers/intervention/constants';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import {
  ARCHIVE_INTERVENTION_ERROR,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
  COPY_INTERVENTION_SUCCESS,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_SUCCESS,
} from './constants';

import { CREATE_INTERVENTION_SUCCESS } from '../intervention';

export const initialState = {
  filterData: undefined,
  shouldRefetch: false,
  interventionsSize: Number.MAX_SAFE_INTEGER,
  interventions: [],
  fetchInterventionLoading: true,
  fetchInterventionError: null,
  cache: {
    archiveIntervention: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const interventionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INTERVENTIONS_REQUEST: {
        if (state.shouldRefetch) draft.interventions = [];

        draft.shouldRefetch = false;
        if (isEmpty(state.interventions)) draft.fetchInterventionLoading = true;
        draft.fetchInterventionError = null;
        draft.fetchInterventionLoading = true;

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
        draft.fetchInterventionLoading = false;

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
        draft.fetchInterventionLoading = false;
        draft.fetchInterventionError = action.payload.error;
        break;
      case CREATE_INTERVENTION_SUCCESS:
      case COPY_INTERVENTION_SUCCESS:
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
    }
  });

export default interventionsReducer;
