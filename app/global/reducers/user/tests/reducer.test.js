import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createUser } from 'utils/reducerCreators';
import userReducer, { initialState } from '../reducer';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  EDIT_OTHER_USER_REQUEST,
  EDIT_OTHER_USER_SUCCESS,
  EDIT_OTHER_USER_ERROR,
  ADD_OTHER_USER_AVATAR_REQUEST,
  ADD_OTHER_USER_AVATAR_SUCCESS,
  ADD_OTHER_USER_AVATAR_ERROR,
  DELETE_OTHER_USER_AVATAR_REQUEST,
  DELETE_OTHER_USER_AVATAR_SUCCESS,
  DELETE_OTHER_USER_AVATAR_ERROR,
  CHANGE_ACTIVATE_STATUS_REQUEST,
  CHANGE_ACTIVATE_STATUS_SUCCESS,
  CHANGE_ACTIVATE_STATUS_ERROR,
} from '../constants';

describe('intervention reducer', () => {
  const mockState = {
    ...initialState,
    user: createUser(),
    cache: { user: createUser(1) },
  };

  it('FETCH_USER_REQUEST', () => {
    const action = actionBuilder(FETCH_USER_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.user = true;
    expectedState.errors.user = null;
    expectedState.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USER_SUCCESS', () => {
    const payloadUser = createUser();

    const action = actionBuilder(FETCH_USER_SUCCESS, payloadUser);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.user = false;
    expectedState.user = payloadUser;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USER_FAILURE', () => {
    const payloadError = 'test-error';

    const action = actionBuilder(FETCH_USER_FAILURE, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.user = false;
    expectedState.errors.user = payloadError;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_OTHER_USER_REQUEST', () => {
    const action = actionBuilder(EDIT_OTHER_USER_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.user = mockState.user;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_OTHER_USER_SUCCESS', () => {
    const payloadUser = { user: createUser(3) };
    const action = actionBuilder(EDIT_OTHER_USER_SUCCESS, payloadUser);

    const expectedState = cloneDeep(mockState);
    expectedState.cache.user = null;
    expectedState.user = payloadUser.user;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });
  it('EDIT_OTHER_USER_FAILURE', () => {
    const action = actionBuilder(EDIT_OTHER_USER_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.user = mockState.cache.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('ADD_OTHER_USER_AVATAR_REQUEST', () => {
    const payloadAvatar = { imageUrl: 'test-avatar' };
    const action = actionBuilder(ADD_OTHER_USER_AVATAR_REQUEST, payloadAvatar);

    const expectedState = cloneDeep(mockState);
    expectedState.user.avatar = payloadAvatar.imageUrl;
    expectedState.cache.user = mockState.user;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('ADD_OTHER_USER_AVATAR_SUCCESS', () => {
    const payloadUser = { user: createUser(3) };

    const action = actionBuilder(ADD_OTHER_USER_AVATAR_SUCCESS, payloadUser);

    const expectedState = cloneDeep(mockState);
    expectedState.user = payloadUser.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('ADD_OTHER_USER_AVATAR_ERROR', () => {
    const action = actionBuilder(ADD_OTHER_USER_AVATAR_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.user = mockState.cache.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('DELETE_OTHER_USER_AVATAR_REQUEST', () => {
    const action = actionBuilder(DELETE_OTHER_USER_AVATAR_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.user.avatar = null;
    expectedState.cache.user = mockState.user;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('DELETE_OTHER_USER_AVATAR_SUCCESS', () => {
    const payloadUser = { user: createUser(3) };

    const action = actionBuilder(DELETE_OTHER_USER_AVATAR_SUCCESS, payloadUser);

    const expectedState = cloneDeep(mockState);
    expectedState.user = payloadUser.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('DELETE_OTHER_USER_AVATAR_ERROR', () => {
    const action = actionBuilder(DELETE_OTHER_USER_AVATAR_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.user = mockState.cache.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_REQUEST', () => {
    const payloadActive = { active: false };
    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_REQUEST, payloadActive);

    const expectedState = cloneDeep(mockState);
    expectedState.user.active = payloadActive.active;
    expectedState.cache.user = mockState.user;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_SUCCESS', () => {
    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_ACTIVATE_STATUS_ERROR', () => {
    const action = actionBuilder(CHANGE_ACTIVATE_STATUS_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.user = mockState.cache.user;
    expectedState.cache.user = null;

    expect(userReducer(mockState, action)).toEqual(expectedState);
  });
});
