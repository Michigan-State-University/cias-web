import produce from 'immer';
import set from 'lodash/set';
import union from 'lodash/union';
import get from 'lodash/get';

import { defaultMapper } from 'utils/mapResponseObjects';
import interventionSettingsReducer from './interventionSettings/reducer';
import {
  FETCH_PROBLEM_REQUEST,
  FETCH_PROBLEM_SUCCESS,
  FETCH_PROBLEM_ERROR,
  CREATE_PROBLEM_REQUEST,
  CREATE_PROBLEM_SUCCESS,
  CREATE_PROBLEM_ERROR,
  EDIT_PROBLEM_REQUEST,
  EDIT_PROBLEM_SUCCESS,
  EDIT_PROBLEM_ERROR,
  SEND_PROBLEM_CSV_REQUEST,
  SEND_PROBLEM_CSV_SUCCESS,
  SEND_PROBLEM_CSV_ERROR,
  COPY_INTERVENTION_SUCCESS,
  REORDER_INTERVENTION_LIST,
  UPDATE_INTERVENTION_SETTINGS,
  CHANGE_CURRENT_INTERVENTION,
  REORDER_INTERVENTION_LIST_SUCCESS,
  REORDER_INTERVENTION_LIST_ERROR,
  CHANGE_ACCESS_SETTING_REQUEST,
  CHANGE_ACCESS_SETTING_SUCCESS,
  CHANGE_ACCESS_SETTING_ERROR,
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_SUCCESS,
  ENABLE_USER_ACCESS_ERROR,
  FETCH_USERS_WITH_ACCESS_REQUEST,
  FETCH_USERS_WITH_ACCESS_SUCCESS,
  FETCH_USERS_WITH_ACCESS_ERROR,
  REVOKE_USER_ACCESS_REQUEST,
  REVOKE_USER_ACCESS_SUCCESS,
  REVOKE_USER_ACCESS_ERROR,
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_ERROR,
  CREATE_INTERVENTION_SUCCESS,
  SEND_INTERVENTION_INVITE_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
  RESEND_INTERVENTION_INVITE_REQUEST,
} from './constants';

export const initialState = {
  currentInterventionIndex: 0,
  problem: null,
  cache: {
    problem: null,
  },
  loaders: {
    fetchProblemLoading: true,
    createProblemLoading: false,
    sendCsvLoading: false,
    editProblem: false,
    changeAccessSettingLoading: false,
    fetchUserAccessLoading: false,
    createInterventionLoading: false,
    sendInterventionLoading: false,
    resendInterventionLoading: {
      email: null,
    },
  },
  errors: {
    fetchProblemError: null,
    createProblemError: null,
    changeAccessSettingError: null,
    fetchUserAccessError: null,
    createInterventionError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const problemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROBLEM_REQUEST:
        if (state.problem && action.payload.id === state.problem.id) break;
        draft.loaders.fetchProblemLoading = true;
        draft.loaders.fetchProblemError = null;
        draft.problem = null;
        break;
      case FETCH_PROBLEM_SUCCESS:
        draft.loaders.fetchProblemLoading = false;
        // to discuss the solution in the future, FETCH_PROBLEM_SUCCESS overwrites FETCH_USERS_WITH_ACCESS_SUCCESS
        const temp = get(draft.problem, 'usersWithAccess', null);
        draft.problem = action.payload.problem;
        set(draft.problem, 'usersWithAccess', temp);
        draft.cache.problem = action.payload.problem;
        break;
      case FETCH_PROBLEM_ERROR:
        draft.loaders.fetchProblemLoading = false;
        draft.errors.fetchProblemError = action.payload.error;
        break;
      case CREATE_PROBLEM_REQUEST:
        draft.loaders.createProblemLoading = true;
        draft.loaders.createProblemError = null;
        break;
      case CREATE_PROBLEM_SUCCESS:
        draft.loaders.createProblemLoading = false;
        break;
      case CREATE_PROBLEM_ERROR:
        break;
      case EDIT_PROBLEM_REQUEST:
        set(draft.problem, action.payload.path, action.payload.value);
        break;
      case EDIT_PROBLEM_SUCCESS:
        draft.problem = action.payload.problem;
        draft.cache.problem = action.payload.problem;
        break;
      case EDIT_PROBLEM_ERROR:
        draft.problem = draft.cache.problem;
        break;
      case SEND_PROBLEM_CSV_REQUEST:
        draft.loaders.sendCsvLoading = true;
        break;
      case SEND_PROBLEM_CSV_SUCCESS:
        draft.loaders.sendCsvLoading = false;
        break;
      case SEND_PROBLEM_CSV_ERROR:
        draft.loaders.sendCsvLoading = false;
        break;
      case COPY_INTERVENTION_SUCCESS:
        draft.problem.interventions.push(
          defaultMapper(action.payload.intervention),
        );
        break;
      case REORDER_INTERVENTION_LIST:
        draft.cache.problem = state.problem;
        draft.problem.interventions = action.payload.reorderedList;
        break;
      case CHANGE_CURRENT_INTERVENTION:
        draft.currentInterventionIndex = action.payload.index;
        break;
      case UPDATE_INTERVENTION_SETTINGS: {
        const interventionIndex = draft.problem.interventions.findIndex(
          intervention =>
            intervention.id === action.payload.data.interventionId,
        );

        if (interventionIndex > -1) {
          draft.currentInterventionIndex = interventionIndex;
          draft.loaders.editProblem = true;

          draft.problem.interventions[interventionIndex] = {
            ...interventionSettingsReducer(
              draft.problem.interventions[interventionIndex],
              action.payload,
            ),
          };
        }
        break;
      }

      case SEND_INTERVENTION_INVITE_REQUEST: {
        const interventionIndex = draft.problem.interventions.findIndex(
          intervention => intervention.id === action.payload.interventionId,
        );

        if (interventionIndex > -1) {
          draft.currentInterventionIndex = interventionIndex;
          draft.loaders.sendInterventionLoading = true;

          draft.cache.problem = state.problem;
          const { emails } = action.payload;
          const uniqEmails = union(
            state.problem.interventions[interventionIndex].emails,
            emails,
          );

          draft.problem.interventions[interventionIndex].emails = uniqEmails;
        }

        break;
      }

      case SEND_INTERVENTION_INVITE_SUCCESS:
        draft.loaders.sendInterventionLoading = false;
        draft.loaders.resendInterventionLoading =
          initialState.loaders.resendInterventionLoading;
        break;

      case SEND_INTERVENTION_INVITE_ERROR:
        draft.loaders.sendInterventionLoading = false;
        draft.loaders.resendInterventionLoading =
          initialState.loaders.resendInterventionLoading;
        draft.problem = draft.cache.problem;
        break;

      case RESEND_INTERVENTION_INVITE_REQUEST:
        draft.loaders.resendInterventionLoading = {
          email: action.payload.emails[0],
        };
        break;

      case REORDER_INTERVENTION_LIST_SUCCESS:
        draft.cache.problem = draft.problem;
        break;
      case REORDER_INTERVENTION_LIST_ERROR:
        draft.problem = state.cache.problem;
        break;
      case CHANGE_ACCESS_SETTING_REQUEST:
        draft.problem.shared_to = action.payload.setting;
        draft.cache.problem = state.problem;
        break;
      case CHANGE_ACCESS_SETTING_SUCCESS:
        draft.cache.problem = draft.problem;
        break;
      case CHANGE_ACCESS_SETTING_ERROR:
        draft.problem = state.cache.problem;
        break;
      case ENABLE_USER_ACCESS_REQUEST:
        draft.loaders.enableAccessLoading = true;
        break;
      case ENABLE_USER_ACCESS_SUCCESS:
        draft.loaders.enableAccessLoading = false;
        draft.problem.usersWithAccess = [
          ...state.problem.usersWithAccess,
          ...action.payload.emails,
        ];
        break;
      case ENABLE_USER_ACCESS_ERROR:
        draft.loaders.enableAccessLoading = false;
        draft.errors.enableAccessError = action.payload.error;
        break;
      case FETCH_USERS_WITH_ACCESS_REQUEST:
        draft.loaders.fetchUserAccessLoading = true;
        break;
      case FETCH_USERS_WITH_ACCESS_SUCCESS:
        draft.loaders.fetchUserAccessLoading = false;
        draft.errors.fetchUserAccessError = null;
        draft.problem.usersWithAccess = action.payload.userAccess;
        break;
      case FETCH_USERS_WITH_ACCESS_ERROR:
        draft.loaders.fetchUserAccessLoading = false;
        draft.errors.fetchUserAccessError = action.payload.message;
        break;
      case REVOKE_USER_ACCESS_REQUEST:
        let userIndex = state.problem.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.problem.usersWithAccess[userIndex].loading = true;
        break;
      case REVOKE_USER_ACCESS_SUCCESS:
        draft.problem.usersWithAccess = state.problem.usersWithAccess.filter(
          ({ id }) => id !== action.payload.userId,
        );
        break;
      case REVOKE_USER_ACCESS_ERROR:
        userIndex = state.problem.usersWithAccess.findIndex(
          ({ id }) => id === action.payload.userId,
        );
        draft.problem.usersWithAccess[userIndex].loading = false;
        break;
      case CREATE_INTERVENTION_REQUEST:
        draft.loaders.createInterventionLoading = true;
        break;
      case CREATE_INTERVENTION_SUCCESS:
        draft.problem.interventions = [
          ...state.problem.interventions,
          action.payload.intervention,
        ];
        draft.loaders.createInterventionLoading = false;
        break;
      case CREATE_INTERVENTION_ERROR:
        draft.loaders.createInterventionLoading = false;
        draft.errors.createInterventionError = action.payload.error;
        break;
    }
  });

export default problemReducer;
