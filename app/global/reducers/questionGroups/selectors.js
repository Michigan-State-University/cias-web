import { createSelector } from 'reselect';

import { DefaultGroupType } from 'models/Intervention/GroupTypes';
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
    substate =>
      substate.groups.find(({ type }) => type === DefaultGroupType).id,
  );

export const makeSelectQuestionGroupsIds = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.groups.map(({ id }) => id),
  );

export const makeSelectQuestionGroupsLoader = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.questionsGroupsSaving,
  );

export const makeSelectQuestionGroupsInterventionId = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.sessionId,
  );

export const makeSelectGetQuestionGroupLoader = () =>
  createSelector(
    selectQuestionGroups,
    substate => substate.loaders.questionGroupsLoading,
  );
