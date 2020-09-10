import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

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
