import produce from 'immer';

import {
  FETCH_SESSIONS_ERROR,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
} from './constants';

export const initialState = {
  sessions: null,
  fetchSessionLoading: true,
  fetchSessionError: null,
};

/* eslint-disable default-case, no-param-reassign */

export const interventionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SESSIONS_REQUEST:
        if (!draft.sessions) draft.fetchSessionLoading = true;
        draft.fetchSessionError = null;
        break;
      case FETCH_SESSIONS_SUCCESS:
        draft.fetchSessionLoading = false;
        draft.sessions = action.payload.sessions;
        break;
      case FETCH_SESSIONS_ERROR:
        draft.fetchSessionLoading = false;
        draft.fetchSessionError = action.payload.error;
        break;
    }
  });

export default interventionsReducer;
