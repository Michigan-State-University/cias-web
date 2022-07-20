import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectAuth = (state) => state.auth || initialState;

export const makeSelectAuth = () =>
  createSelector(selectAuth, (authState) => authState);

export const makeSelectUser = () =>
  createSelector(selectAuth, (authState) => authState.user);

export const makeSelectPhoneNumberPreview = () =>
  createSelector(selectAuth, (authState) => authState.phoneNumberPreview);

export const makeSelectUserRoles = () =>
  createSelector(selectAuth, (authState) => authState.user.roles);

export const makeSelectErrors = (error) =>
  createSelector(selectAuth, (authState) =>
    error ? authState.errors[error] : authState.errors,
  );

export const makeSelectLoaders = (loader) =>
  createSelector(selectAuth, (authState) =>
    loader ? authState.loaders[loader] : authState.loaders,
  );

export const makeSelectLoginFormData = () =>
  createSelector(selectAuth, (authState) => authState.loginFormData);

export const makeSelectVerificationNeeded = () =>
  createSelector(selectAuth, (authState) => authState.verificationCodeNeeded);

export const makeSelectVerificationSuccess = () =>
  createSelector(selectAuth, (authState) => authState.verificationCodeSuccess);

export const makeSelectUserId = () =>
  createSelector(selectAuth, (authState) => authState.user?.id);

export const makeSelectIsUserLoggedIn = () =>
  createSelector(selectAuth, (authState) => Boolean(authState.user));
