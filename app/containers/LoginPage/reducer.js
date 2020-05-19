/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
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
        break;
      case LOGIN_SUCCESS:
        break;
      case LOGIN_ERROR:
        break;
    }
  });

export default loginPageReducer;
