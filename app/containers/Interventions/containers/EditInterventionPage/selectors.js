import { createSelector } from 'reselect';
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

const makeSelectQuestionTypeChooserVisiblity = () =>
  createSelector(
    selectEditInterventionPageDomain,
    substate => substate.questionTypeChooserVisibility,
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

export {
  makeSelectEditInterventionPage,
  selectEditInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestionTypeChooserVisiblity,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
};
