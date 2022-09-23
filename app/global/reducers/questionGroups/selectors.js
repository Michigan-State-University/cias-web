import { createSelector } from 'reselect';

import { makeSelectSelectedQuestionGroupId } from 'global/reducers/questions/selectors';

import { initialState } from './reducer';

export const selectQuestionGroups = (state) =>
  state.questionGroups || initialState;

export const makeSelectQuestionGroupsState = () =>
  createSelector(selectQuestionGroups, (substate) => substate);

export const makeSelectQuestionGroups = () =>
  createSelector(selectQuestionGroups, (substate) => substate.groups);

export const makeSelectQuestionGroupsIds = () =>
  createSelector(selectQuestionGroups, (substate) =>
    substate.groups.map(({ id }) => id),
  );

export const makeSelectQuestionGroupsLoader = () =>
  createSelector(
    selectQuestionGroups,
    (substate) => substate.questionsGroupsSaving,
  );

export const makeSelectQuestionGroupsSessionId = () =>
  createSelector(selectQuestionGroups, (substate) => substate.sessionId);

export const makeSelectGetQuestionGroupLoader = () =>
  createSelector(
    selectQuestionGroups,
    (substate) => substate.loaders.questionGroupsLoading,
  );

export const makeSelectGetQuestionGroupError = () =>
  createSelector(
    selectQuestionGroups,
    (substate) => substate.errors.questionGroupsError,
  );

export const makeSelectSelectedQuestionGroup = () =>
  createSelector(
    makeSelectSelectedQuestionGroupId(),
    makeSelectQuestionGroups(),
    (selectedQuestionGroupId, questionGroups) =>
      questionGroups.find(({ id }) => id === selectedQuestionGroupId),
  );
