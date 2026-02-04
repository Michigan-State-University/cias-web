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
  REGISTER_FROM_INVITATION_REQUEST,
  REGISTER_FROM_INVITATION_SUCCESS,
  REGISTER_FROM_INVITATION_ERROR,
  CLEAR_ERRORS,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  success: false,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
const registerPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_PARTICIPANT_REQUEST:
      case REGISTER_FROM_INVITATION_REQUEST:
        draft.error = null;
        draft.loading = true;
        draft.success = false;
        break;
      case REGISTER_PARTICIPANT_SUCCESS:
      case REGISTER_FROM_INVITATION_SUCCESS:
        draft.error = null;
        draft.loading = false;
        draft.success = true;
        break;
      case REGISTER_PARTICIPANT_ERROR:
      case REGISTER_FROM_INVITATION_ERROR:
        draft.error = action.payload.error;
        draft.loading = false;
        draft.success = false;
        break;
      case CLEAR_ERRORS:
        draft.error = null;
    }
  });

export default registerPageReducer;
