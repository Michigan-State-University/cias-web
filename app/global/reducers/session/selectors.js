import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSession = (state) => state.session || initialState;

const makeSelectSession = () =>
  createSelector(selectSession, (substate) => substate.session);

const makeSelectCacheSession = () =>
  createSelector(selectSession, (substate) => substate.cache.session);

const makeSelectSessionLoader = (name) =>
  createSelector(selectSession, ({ loaders }) => loaders[name]);

const makeSelectSessionEditLoader = () =>
  createSelector(selectSession, (substate) => substate.sessionSaving);

const makeSelectSessionError = (name) =>
  createSelector(selectSession, ({ errors }) => errors[name]);

export {
  makeSelectSession,
  makeSelectCacheSession,
  makeSelectSessionLoader,
  makeSelectSessionEditLoader,
  makeSelectSessionError,
};
