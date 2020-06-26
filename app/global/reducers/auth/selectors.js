import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

const makeSelectAuth = () =>
  createSelector(
    selectAuth,
    authState => authState,
  );

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.headers.token,
  );

const makeSelectHeaders = () =>
  createSelector(
    selectAuth,
    authState => authState.headers,
  );

const makeSelectIsLoggedIn = () =>
  createSelector(
    selectAuth,
    authState => authState.isLoggedIn,
  );

const makeSelectUser = () =>
  createSelector(
    selectAuth,
    authState => authState.user,
  );

export {
  makeSelectAuth,
  makeSelectToken,
  makeSelectIsLoggedIn,
  makeSelectHeaders,
  makeSelectUser,
};
