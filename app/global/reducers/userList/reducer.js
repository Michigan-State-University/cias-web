/*
 *
 * UserList reducer
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

export const initialState = {
  users: [],
  usersError: null,
  usersLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const userListReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_USERS:
        if (isEmpty(draft.problems)) draft.usersLoading = true;
        draft.usersError = null;
        break;
      case FETCH_USERS_SUCCESS:
        draft.users = payload;
        draft.usersLoading = false;
        break;
      case FETCH_USERS_FAILURE:
        draft.usersError = payload;
        draft.usersLoading = false;
        break;
    }
  });

export default userListReducer;
