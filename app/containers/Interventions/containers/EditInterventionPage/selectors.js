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

const makeSelectIntervention = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.intervention,
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

const makeSelectLoader = loader =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => get(substate.loaders, loader, false),
  );

export {
  makeSelectEditInterventionPage,
  selectEditInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
  makeSelectQuestionSettingsVisibility,
  makeSelectLoader,
  makeSelectLoaders,
};
