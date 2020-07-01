/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_REQUEST:
        draft.error = '';
        draft.loading = true;
        break;
      case REGISTER_SUCCESS:
        draft.error = '';
        draft.loading = false;
        break;
      case REGISTER_FAILURE:
        draft.error = action.payload;
        draft.loading = false;
        break;
    }
  });

export default registerPageReducer;
