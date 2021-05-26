import produce from 'immer';

import {
  FETCH_HEALTH_SYSTEMS_ERROR,
  FETCH_HEALTH_SYSTEMS_REQUEST,
  FETCH_HEALTH_SYSTEMS_SUCCESS,
} from './constants';

export const initialState = {
  healthSystems: [],
  healthSystemsLoading: false,
  healthSystemError: null,
};

/* eslint-disable default-case, no-param-reassign */
const healthSystemsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case FETCH_HEALTH_SYSTEMS_REQUEST: {
        draft.healthSystemsLoading = true;
        draft.healthSystemError = null;
        break;
      }
      case FETCH_HEALTH_SYSTEMS_SUCCESS: {
        draft.healthSystemsLoading = false;
        draft.healthSystems = payload.healthSystems;
        break;
      }

      case FETCH_HEALTH_SYSTEMS_ERROR: {
        draft.healthSystemsLoading = false;
        draft.healthSystemError = payload.error;
        break;
      }
    }
  });

export { healthSystemsReducer };
