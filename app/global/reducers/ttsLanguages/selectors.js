import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectTTSLanguagesState = state =>
  state.ttsLanguages || initialState;

export const makeSelectLanguagesState = () =>
  createSelector(
    selectTTSLanguagesState,
    substate => substate.languages,
  );

export const makeSelectVoicesState = () =>
  createSelector(
    selectTTSLanguagesState,
    substate => substate.voices,
  );
