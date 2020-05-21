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

const makeSelectQuestionTypeChooserVisiblity = () =>
  createSelector(
    selectCreateInterventionPageDomain,
    substate => substate.questionTypeChooserVisibility,
  );

export {
  makeSelectCreateInterventionPage,
  selectCreateInterventionPageDomain,
  makeSelectIntervention,
  makeSelectQuestionTypeChooserVisiblity,
};
