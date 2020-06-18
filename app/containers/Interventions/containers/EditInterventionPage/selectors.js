import { createSelector } from 'reselect';
import get from 'lodash/get';
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

const makeSelectOnePropertyFromSelectedQuestion = property =>
  createSelector(
    selectEditInterventionPageDomain,
    substate =>
      get(substate.questions[substate.selectedQuestion], property, null),
  );

export {
  makeSelectEditInterventionPage,
  selectEditInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
  makeSelectQuestionSettingsVisibility,
  makeSelectOnePropertyFromSelectedQuestion,
};
