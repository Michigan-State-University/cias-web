import { createSelector } from 'reselect';
import { get } from 'lodash';

import { initialState } from './reducer';

const selectEditInterventionPageDomain = state =>
  state.editInterventionPage || initialState;

const makeSelectEditInterventionPage = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate,
  );

const makeSelectQuestions = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questions,
  );

const makeSelectQuestionSettingsVisibility = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questionSettingsVisibility,
  );

const makeSelectSelectedQuestionIndex = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.selectedQuestion,
  );

const makeSelectSelectedQuestion = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questions[substate.selectedQuestion],
  );

const makeSelectLoaders = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.loaders,
  );

const makeSelectAnimationPosition = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.animationPosition,
  );

const makeSelectLoader = loader =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => get(substate.loaders, loader, false),
  );

const makeSelectQuestionsLength = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questions.length,
  );

export {
  makeSelectEditInterventionPage,
  selectEditInterventionPageDomain,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
  makeSelectQuestionSettingsVisibility,
  makeSelectLoader,
  makeSelectLoaders,
  makeSelectAnimationPosition,
  makeSelectQuestionsLength,
};
