import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the global state domain
 */

const selectGlobalStateDomain = (state) => state.global || initialState;

const selectFileDownloadDomain = createSelector(
  selectGlobalStateDomain,
  (substate) => substate.fileDownload,
);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GlobalState
 */

export const makeSelectGlobalState = () =>
  createSelector(selectGlobalStateDomain, (substate) => substate);

export const makeSelectAudioInstance = () =>
  createSelector(selectGlobalStateDomain, (substate) => substate.audioInstance);

export const makeSelectFile = (file) =>
  createSelector(
    selectFileDownloadDomain,
    (substate) => substate.cachedFiles[file],
  );

export const makeSelectFileDownloadLoading = () =>
  createSelector(selectFileDownloadDomain, (substate) => substate.isLoading);

export const makeSelectNavbarHeight = () =>
  createSelector(selectGlobalStateDomain, ({ navbarHeight }) => navbarHeight);
