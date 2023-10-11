import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectLanguage = (state) => state.language || initialState;

export const makeSelectLocale = () =>
  createSelector(selectLanguage, (languageState) => languageState.locale);
