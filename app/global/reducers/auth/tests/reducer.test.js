import { authReducer, initialState } from 'global/reducers/auth/reducer';
import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createUser } from 'utils/reducerCreators';
import {
  LOG_IN_USER,
  LOG_OUT,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_EMAIL_REQUEST,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  ADD_AVATAR_REQUEST,
  ADD_AVATAR_SUCCESS,
  ADD_AVATAR_ERROR,
  DELETE_AVATAR_REQUEST,
  DELETE_AVATAR_SUCCESS,
  DELETE_AVATAR_ERROR,
  CHANGE_ERROR_STATUS,
} from '../constants';

const createState = (key, value) => ({
  ...initialState,
  [key]: value,
});

describe('authReducer', () => {
  let state;
  beforeEach(() => {
    state = cloneDeep(initialState);
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    const action = {};

    expect(authReducer(undefined, action)).toEqual(expectedResult);
  });

  it('test LOG_IN_USER action', () => {
    const expectedResult = createState('user', createUser());
    const action = actionBuilder(LOG_IN_USER, { user: createUser() });

    expect(authReducer(undefined, action)).toEqual(expectedResult);
  });

  it('test LOG_OUT action', () => {
    const logInUserState = createState('user', createUser());
    const action = actionBuilder(LOG_OUT, {});

    expect(authReducer(logInUserState, action)).toEqual(initialState);
  });

  it('test EDIT_USER action', () => {
    const editedUser = { ...createUser(), firstName: 'after test' };
    const actionRequest = actionBuilder(EDIT_USER_REQUEST, {
      user: editedUser,
    });
    const actionSuccess = actionBuilder(EDIT_USER_SUCCESS, {});
    const actionError = actionBuilder(EDIT_USER_ERROR, {});

    const afterEditUserStateRequest = createState('user', editedUser);

    expect(authReducer(undefined, actionRequest)).toEqual(
      afterEditUserStateRequest,
    );

    const afterEditSuccessUserState = {
      ...afterEditUserStateRequest,
      cache: { user: editedUser },
    };

    expect(authReducer(afterEditUserStateRequest, actionSuccess)).toEqual(
      afterEditSuccessUserState,
    );
    const userFromCacheState = {
      ...createState('cache', { user: editedUser }),
      user: editedUser,
    };
    const editUserStateError = createState('cache', { user: editedUser });
    expect(authReducer(editUserStateError, actionError)).toEqual(
      userFromCacheState,
    );
  });

  it('test CHANGE_PASSWORD_REQUEST action', () => {
    const actionRequest = actionBuilder(CHANGE_PASSWORD_REQUEST, {});
    const requestState = cloneDeep(initialState);
    requestState.errors.changePasswordError = null;
    requestState.loaders.changePasswordLoading = true;

    expect(authReducer(undefined, actionRequest)).toEqual(requestState);
  });

  it('test CHANGE_PASSWORD_SUCCESS action', () => {
    const actionRequest = actionBuilder(CHANGE_PASSWORD_SUCCESS, {});
    const requestState = cloneDeep(initialState);
    requestState.errors.changePasswordError = null;
    requestState.loaders.changePasswordLoading = false;

    expect(authReducer(undefined, actionRequest)).toEqual(requestState);
  });

  it('test CHANGE_PASSWORD_ERROR action', () => {
    const error = 'test-error';
    const actionRequest = actionBuilder(CHANGE_PASSWORD_ERROR, { error });
    const requestState = cloneDeep(initialState);
    requestState.errors.changePasswordError = error;
    requestState.loaders.changePasswordLoading = false;

    expect(authReducer(undefined, actionRequest)).toEqual(requestState);
  });

  it('test CHANGE_EMAIL_REQUEST action', () => {
    const actionRequest = actionBuilder(CHANGE_EMAIL_REQUEST);
    const requestState = cloneDeep(initialState);
    requestState.errors.changeEmailError = null;
    requestState.loaders.changeEmailLoading = true;

    expect(authReducer(undefined, actionRequest)).toEqual(requestState);
  });

  it('test CHANGE_EMAIL_SUCCESS action', () => {
    const newEmail = 'newtest@test.com';
    const actionRequest = actionBuilder(CHANGE_EMAIL_SUCCESS, {
      user: { email: newEmail },
    });
    const requestState = createState('user', createUser());
    const successState = createState('user', {
      ...createUser(),
      email: newEmail,
    });
    requestState.errors.changeEmailError = null;
    requestState.loaders.changeEmailLoading = false;

    expect(authReducer(requestState, actionRequest)).toEqual(successState);
  });

  it('test CHANGE_EMAIL_ERROR action', () => {
    const error = 'test-error';
    const actionRequest = actionBuilder(CHANGE_EMAIL_ERROR, { error });
    const requestState = cloneDeep(initialState);
    requestState.errors.changeEmailError = error;
    requestState.loaders.changeEmailLoading = false;

    expect(authReducer(undefined, actionRequest)).toEqual(requestState);
  });

  it('test ADD_AVATAR_REQUEST action', () => {
    const imageUrl = 'http://www.test.com/test.png';
    const actionRequest = actionBuilder(ADD_AVATAR_REQUEST, { imageUrl });
    const initState = createState('user', createUser());
    const addAvatarState = createState('user', {
      ...createUser(),
      avatar: imageUrl,
    });

    expect(authReducer(initState, actionRequest)).toEqual(addAvatarState);
  });

  it('test ADD_AVATAR_SUCCESS action', () => {
    const imageUrl = 'http://www.test.com/test.png';
    const userWithAvatar = { ...createUser(), avatar: imageUrl };
    const actionSuccess = actionBuilder(ADD_AVATAR_SUCCESS, {
      user: userWithAvatar,
    });

    const initState = createState('user', { ...createUser() });
    const successState = {
      ...initState,
      cache: { user: createUser() },
      user: userWithAvatar,
    };

    expect(authReducer(initState, actionSuccess)).toEqual(successState);
  });

  it('test ADD_AVATAR_ERROR action', () => {
    const actionRequest = actionBuilder(ADD_AVATAR_ERROR, {});
    const initState = { ...initialState, cache: { user: createUser() } };
    const errorState = { ...initState, user: createUser() };

    expect(authReducer(initState, actionRequest)).toEqual(errorState);
  });

  it('test DELETE_AVATAR_REQUEST action', () => {
    const imageUrl = 'http://www.test.com/test.png';
    const actionRequest = actionBuilder(DELETE_AVATAR_REQUEST, {});
    const initState = createState('user', {
      ...createUser(),
      avatar: imageUrl,
    });
    const deleteAvatarState = createState('user', {
      ...createUser(),
      avatar: null,
    });

    expect(authReducer(initState, actionRequest)).toEqual(deleteAvatarState);
  });

  it('test DELETE_AVATAR_SUCCESS action', () => {
    const actionRequest = actionBuilder(DELETE_AVATAR_SUCCESS, {
      user: createUser(),
    });

    const initState = createState('user', {
      ...createUser(),
    });

    const deleteAvatarState = {
      ...initState,
      cache: { user: createUser() },
    };

    expect(authReducer(initState, actionRequest)).toEqual(deleteAvatarState);
  });

  it('test DELETE_AVATAR_ERROR action', () => {
    const actionRequest = actionBuilder(DELETE_AVATAR_ERROR, {});

    const initState = createState('cache', {
      user: { ...createUser() },
    });

    const deleteAvatarState = {
      ...initState,
      user: createUser(),
    };

    expect(authReducer(initState, actionRequest)).toEqual(deleteAvatarState);
  });

  it('test CHANGE_ERROR_STATUS action', () => {
    const error = 'Test error';
    const actionRequest = actionBuilder(CHANGE_ERROR_STATUS, {
      error: 'changePasswordError',
      value: error,
    });
    const changeStatusState = {
      ...initialState,
      errors: {
        changePasswordError: error,
        changeEmailError: null,
      },
    };
    expect(authReducer(undefined, actionRequest)).toEqual(changeStatusState);
  });
});
