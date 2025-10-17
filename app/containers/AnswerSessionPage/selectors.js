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

const makeSelectVideoStats = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.videoStats,
  );

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

const makeSelectPreviousUserSessionId = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.previousUserSessionId,
  );

const makeSelectInterventionStarted = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.interventionStarted,
  );

const makeSelectIsAnimationOngoing = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.isAnimationOngoing,
  );

const makeSelectShowTextReadingControls = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.showTextReadingControls,
  );

const makeSelectVerifyPatientDataState = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    ({ verifyPatientDataLoading, verifyPatientDataError }) => ({
      loading: verifyPatientDataLoading,
      error: verifyPatientDataError,
    }),
  );

const makeSelectHfhsPatientDetail = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    ({ hfhsPatientDetail }) => hfhsPatientDetail,
  );

const makeSelectUserSessionLanguageCode = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.userSession?.languageCode,
  );

const makeSelectQuestionLanguageCode = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    (substate) => substate.currentQuestion?.question_language,
  );

const makeSelectVerifyQRCodeState = () =>
  createSelector(
    selectAnswerSessionPageDomain,
    ({ verifyQRCodeLoading, verifyQRCodeError }) => ({
      loading: verifyQRCodeLoading,
      error: verifyQRCodeError,
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
  makeSelectPreviousUserSessionId,
  makeSelectInterventionStarted,
  makeSelectIsAnimationOngoing,
  makeSelectShowTextReadingControls,
  makeSelectVerifyPatientDataState,
  makeSelectHfhsPatientDetail,
  makeSelectUserSessionLanguageCode,
  makeSelectQuestionLanguageCode,
  makeSelectVideoStats,
  makeSelectVerifyQRCodeState,
};
