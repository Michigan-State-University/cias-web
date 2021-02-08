import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createUser } from 'utils/reducerCreators';
import userListReducer, { initialState } from '../reducer';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CHANGE_ACTIVATE_STATUS_REQUEST,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
  CHANGE_ACTIVATE_STATUS_FAILURE,
  ADD_USER_TO_LIST,
} from '../constants';

describe('userList reducer', () => {
  const users = [createUser(), createUser(1), createUser(2)];

  const mockState = {
    ...initialState,
  };

  const mockStateWithUsers = {
    ...initialState,
    users,
    usersSize: users.length,
    cache: { users },
  };

  it('FETCH_USERS', () => {
    const action = actionBuilder(FETCH_USERS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.usersLoading = true;
    expectedState.usersError = null;

    expect(userListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_SUCCESS', () => {
    const payloadUsers = { users, usersSize: users.length };

    const action = actionBuilder(FETCH_USERS_SUCCESS, payloadUsers);

    const expectedState = cloneDeep(mockState);
    expectedState.users = payloadUsers.users;
    expectedState.cache.users = payloadUsers.users;
    expectedState.usersSize = payloadUsers.usersSize;
    expectedState.usersLoading = false;

    expect(userListReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_FAILURE', () => {
    const payloadError = 'test-error';

    const action = actionBuilder(FETCH_USERS_FAILURE, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.usersError = payloadError;
    expectedState.usersLoading = false;

    expect(userListReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_REQUEST', () => {
    const index = 0;
    const payload = { id: users[index].id, active: false, showInactive: true };

    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, payload);

    const expectedState = cloneDeep(mockStateWithUsers);
    expectedState.cache.users = mockStateWithUsers.users;
    expectedState.users[index].active = payload.active;

    expect(userListReducer(mockStateWithUsers, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_SUCCESS', () => {
    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, {});

    const expectedState = cloneDeep(mockStateWithUsers);

    expect(userListReducer(mockStateWithUsers, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_FAILURE', () => {
    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_FAILURE, {});

    const expectedState = cloneDeep(mockStateWithUsers);
    expectedState.users = mockStateWithUsers.cache.users;

    expect(userListReducer(mockStateWithUsers, action)).toEqual(expectedState);
  });

  it('ADD_USER_TO_LIST', () => {
    const userPayload = { user: createUser(4) };

    const action = actionBuilder(ADD_USER_TO_LIST, userPayload);

    const expectedState = cloneDeep(mockStateWithUsers);
    expectedState.users = [userPayload.user, ...mockStateWithUsers.users];

    expect(userListReducer(mockStateWithUsers, action)).toEqual(expectedState);
  });
});
