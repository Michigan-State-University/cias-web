import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AnswerSessionPage state domain
 */

const selectAnswerSessionPageDomain = (state) =>
  state.AnswerSessionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnswerSessionPage
 */

const makeSelectAnswerSessionPage = () =>
  createSelector(selectAnswerSessionPageDomain, (substate) => substate);

const makeSelectAnswers = () =>
  createSelector(selectAnswerSessionPageDomain, (substate) => substate.answers);

const makeSelectPreviewMode = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.previewMode,
  );

const makeSelectUserSession = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.userSession,
  );

const makeSelectCurrentQuestion = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.currentQuestion,
  );

const makeSelectCurrentBlockIndex = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.currentBlockIndex,
  );

const makeSelectShowTextTranscript = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.showTextTranscript,
  );

const makeSelectPreviousUserSessionId = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.previousUserSessionId,
  );

const makeSelectVerifyPatientDataState = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    ({ verifyPatientDataLoading, verifyPatientDataError }) => ({
      loading: verifyPatientDataLoading,
      error: verifyPatientDataError,
    }),
  );

export default makeSelectAnswerSessionPage;
export {
  selectAnswerSessionPageDomain,
  makeSelectAnswers,
  makeSelectPreviewMode,
  makeSelectUserSession,
  makeSelectCurrentQuestion,
  makeSelectCurrentBlockIndex,
  makeSelectShowTextTranscript,
  makeSelectPreviousUserSessionId,
  makeSelectVerifyPatientDataState,
};
