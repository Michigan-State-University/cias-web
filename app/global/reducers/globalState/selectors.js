import { createSelector } from 'reselect';
import { getLangDir } from 'rtl-detect';

import { isAppLanguageSupported } from 'i18n';

import { makeSelectInterventionLanguageCode } from 'global/reducers/intervention';
import { makeSelectUserSessionLanguageCode } from 'containers/AnswerSessionPage/selectors';
import { makeSelectLocale } from 'containers/AppLanguageProvider';

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

export const makeSelectInterventionElementsLanguageCode = () =>
  createSelector(
    makeSelectInterventionLanguageCode(),
    makeSelectUserSessionLanguageCode(),
    (interventionLanguageCode, userSessionLanguageCode) =>
      interventionLanguageCode ?? userSessionLanguageCode,
  );

// Hardcoded/fixed UI elements, e.g. back, skip and continue buttons
export const makeSelectInterventionFixedElementsDirection = () =>
  createSelector(
    makeSelectInterventionElementsLanguageCode(),
    makeSelectLocale(),
    (languageCode, appLocale) =>
      getLangDir(
        languageCode && isAppLanguageSupported(languageCode)
          ? languageCode
          : appLocale,
      ),
  );

// Defined the by researcher, e.g. question title and subtitle, answers' labels
export const makeSelectInterventionDynamicElementsDirection = () =>
  createSelector(
    makeSelectInterventionElementsLanguageCode(),
    makeSelectLocale(),
    (languageCode, appLocale) => getLangDir(languageCode ?? appLocale),
  );
