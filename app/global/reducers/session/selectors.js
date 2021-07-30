import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSession = (state) => state.session || initialState;

const makeSelectSession = () =>
  createSelector(selectSession, (substate) => substate.session);

const makeSelectCacheSession = () =>
  createSelector(selectSession, (substate) => substate.cache.session);

const makeSelectSessionLoaders = () =>
  createSelector(selectSession, (substate) => substate.loaders);

const makeSelectSessionEditLoader = () =>
  createSelector(selectSession, (substate) => substate.sessionSaving);

export {
  makeSelectSession,
  makeSelectCacheSession,
  makeSelectSessionLoaders,
  makeSelectSessionEditLoader,
};
