import { createSelector } from 'reselect';

import { initialState } from './reducer';

const copyModal = state => state.copyModal || initialState;

export const makeSelectSessionsState = () =>
  createSelector(
    copyModal,
    substate => substate,
  );

export const makeSelectInterventions = () =>
  createSelector(
    copyModal,
    substate => substate.interventions,
  );

export const makeSelectSessions = () =>
  createSelector(
    copyModal,
    substate => substate.sessions,
  );

export const makeSelectQuestionGroups = () =>
  createSelector(
    copyModal,
    substate => substate.questionGroups,
  );

export const makeSelectCopyModalLoaders = () =>
  createSelector(
    copyModal,
    substate => substate.loaders,
  );

export const makeSelectSavedIds = () =>
  createSelector(
    copyModal,
    substate => substate.currentIds,
  );

export const makeSelectQuestions = () =>
  createSelector(
    copyModal,
    substate =>
      (substate.questionGroups || []).map(({ questions }) => questions).flat(),
  );
