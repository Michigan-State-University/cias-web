import { createSelector } from 'reselect';

import { initialState } from './reducer';

export const selectQuestionGroups = state =>
  state.questionGroups || initialState;

export const makeSelectQuestionGroupsState = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate,
  );

export const makeSelectQuestionGroups = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.groups,
  );

export const makeSelectDefaultGroupId = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.groups.find(({ default: dft }) => dft === true).id,
  );

export const makeSelectQuestionGroupsLoader = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.questionsGroupsSaving,
  );

export const makeSelectQuestionGroupsInterventionId = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.interventionId,
  );

export const makeSelectGetQuestionGroupLoader = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.loaders.questionGroupsLoading,
  );
