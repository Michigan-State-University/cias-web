/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: '',
  formData: {
    username: '',
    password: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.formData = {
          username: action.payload.username,
          password: action.payload.password,
        };
        draft.error = '';
        draft.loading = true;
        break;
      case LOGIN_SUCCESS:
        draft.error = '';
        draft.loading = false;
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
    }
  });

export default loginPageReducer;
