import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the answerInterventionPage state domain
 */

const selectAnswerInterventionPageDomain = state =>
  state.answerInterventionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnswerInterventionPage
 */

const makeSelectAnswerInterventionPage = () =>
  createSelector(
    selectAnswerInterventionPageDomain,
    substate => substate,
  );

const makeSelectAnswers = () =>
  createSelector(
    selectAnswerInterventionPageDomain,
    substate => substate.answers,
  );

const makeSelectPreviewMode = () =>
  createSelector(
    selectAnswerInterventionPageDomain,
    substate => substate.previewMode,
  );

export default makeSelectAnswerInterventionPage;
export {
  selectAnswerInterventionPageDomain,
  makeSelectAnswers,
  makeSelectPreviewMode,
};
