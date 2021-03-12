import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const makeSelectAuth = () =>
  createSelector(
    selectAuth,
    authState => authState,
  );

export const makeSelectUser = () =>
  createSelector(
    selectAuth,
    authState => authState.user,
  );

export const makeSelectPhoneNumberPreview = () =>
  createSelector(
    selectAuth,
    authState => authState.phoneNumberPreview,
  );

export const makeSelectUserRoles = () =>
  createSelector(
    selectAuth,
    authState => authState.user.roles,
  );

export const makeSelectErrors = error =>
  createSelector(
    selectAuth,
    authState => (error ? authState.errors[error] : authState.errors),
  );

export const makeSelectLoaders = loader =>
  createSelector(
    selectAuth,
    authState => (loader ? authState.loaders[loader] : authState.loaders),
  );
