import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AnswerSessionPage state domain
 */

const selectAnswerSessionPageDomain = state =>
  state.AnswerSessionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnswerSessionPage
 */

const makeSelectAnswerSessionPage = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    substate => substate,
  );

const makeSelectAnswers = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    substate => substate.answers,
  );

const makeSelectPreviewMode = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    substate => substate.previewMode,
  );

export default makeSelectAnswerSessionPage;
export {
  selectAnswerSessionPageDomain,
  makeSelectAnswers,
  makeSelectPreviewMode,
};