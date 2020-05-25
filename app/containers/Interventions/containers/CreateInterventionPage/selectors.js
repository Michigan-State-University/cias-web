import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateInterventionPageDomain = state =>
  state.createInterventionPage || initialState;

const makeSelectCreateInterventionPage = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate,
  );

const makeSelectIntervention = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.intervention,
  );

const makeSelectQuestions = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.questions,
  );

const makeSelectQuestionTypeChooserVisiblity = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.questionTypeChooserVisibility,
  );

const makeSelectSelectedQuestionIndex = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.selectedQuestion,
  );

const makeSelectSelectedQuestion = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.questions[substate.selectedQuestion],
  );

export {
  makeSelectCreateInterventionPage,
  selectCreateInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestionTypeChooserVisiblity,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
};
