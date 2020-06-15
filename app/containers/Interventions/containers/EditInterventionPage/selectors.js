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
    substate =>
      substate.questions.length > 0
        ? substate.questions[substate.selectedQuestion]
        : null,
  );

export {
  makeSelectEditInterventionPage,
  selectEditInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestionTypeChooserVisiblity,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectSelectedQuestion,
  makeSelectQuestionSettingsVisibility,
};
