import { createSelector } from 'reselect';
// import uniqBy from 'lodash/uniqBy';
// import { selectQuestions } from '../questions';

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
