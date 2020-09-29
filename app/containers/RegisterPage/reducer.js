/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_RESEARCHER_REQUEST,
  REGISTER_RESEARCHER_SUCCESS,
  REGISTER_RESEARCHER_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_PARTICIPANT_REQUEST:
      case REGISTER_RESEARCHER_REQUEST:
        draft.error = null;
        draft.loading = true;
        break;
      case REGISTER_PARTICIPANT_SUCCESS:
      case REGISTER_RESEARCHER_SUCCESS:
        draft.error = null;
        draft.loading = false;
        break;
      case REGISTER_PARTICIPANT_ERROR:
      case REGISTER_RESEARCHER_ERROR:
        draft.error = action.payload.error;
        draft.loading = false;
        break;
    }
  });

export default registerPageReducer;
