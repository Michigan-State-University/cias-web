/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { REGISTER_SUCCESS } from 'containers/RegisterPage/constants';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: '',
  newAccountPopup: false,
  formData: {
    email: '',
    password: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.formData = {
          email: action.payload.email,
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
      case REGISTER_SUCCESS:
        draft.newAccountPopup = true;
        break;
    }
  });

export default loginPageReducer;
