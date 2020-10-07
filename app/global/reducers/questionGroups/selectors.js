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
