/**
 *
 * AnswerSessionPage
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { Redirect } from 'react-router-dom';

import AudioWrapper from 'utils/audioWrapper';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import { Button } from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';
import Loader from 'components/Loader';
import { MSULogo } from 'components/Logo';
import { DESKTOP_MODE } from 'utils/previewMode';

import { makeSelectAudioInstance } from 'global/reducers/globalState';

import {
  fetchInterventionRequest,
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
} from 'global/reducers/intervention';
import logInGuestSaga from 'global/reducers/auth/sagas/logInGuest';
import { canPreview } from 'models/Status/statusPermissions';
import { finishQuestion } from 'models/Session/QuestionTypes';
import H2 from 'components/H2';
import {
  AnswerInterventionContent,
  AnswerOuterContainer,
  StyledButton,
} from './styled';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import CommonLayout from './layouts/CommonLayout';
import makeSelectAnswerSessionPage from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  submitAnswer,
  selectAnswer,
  startSession,
  changeIsAnimating,
  setFeedbackScreenSettings,
  createUserSessionRequest,
  nextQuestionRequest,
} from './actions';

const AnimationRefHelper = ({
  children,
  currentQuestion,
  currentQuestionId,
  previewMode,
  answers,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  feedbackScreenSettings,
  audioInstance,
}) => {
  const animationParentRef = useRef();
  const [refState, setRefState] = useState(null);
  useEffect(() => {
    setRefState(animationParentRef.current);
  }, [animationParentRef]);

  return (
    <AnswerInterventionContent ref={animationParentRef}>
      {children}
      {refState !== null && (
        <CharacterAnim
          animationContainer={animationParentRef.current}
          blocks={currentQuestion.narrator.blocks}
          questionId={currentQuestionId}
          settings={currentQuestion.narrator.settings}
          previewMode={previewMode}
          answers={answers}
          changeIsAnimationOngoing={changeIsAnimationOngoing}
          setFeedbackSettings={setFeedbackSettings}
          feedbackScreenSettings={feedbackScreenSettings}
          audioInstance={audioInstance}
        />
      )}
    </AnswerInterventionContent>
  );
};
AnimationRefHelper.propTypes = {
  children: PropTypes.any,
  currentQuestion: PropTypes.any,
  currentQuestionId: PropTypes.any,
  previewMode: PropTypes.any,
  answers: PropTypes.object,
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  feedbackScreenSettings: PropTypes.object,
  audioInstance: PropTypes.object,
};

export function AnswerSessionPage({
  match: { params },
  intl: { formatMessage },
  saveSelectedAnswer,
  submitAnswerRequest,
  onStartSession,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  audioInstance,
  AnswerSessionPage: {
    questionError,
    answersError,
    answers,
    questionIndex,
    interventionStarted,
    previewMode,
    isAnimationOngoing,
    feedbackScreenSettings,
    userSession,
    userSessionLoading,
    nextQuestionLoading,
    nextQuestionError,
    currentQuestion,
  },
  isPreview,
  interventionStatus,
  fetchIntervention,
  createUserSession,
  nextQuestion,
}) {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ key: 'logInGuest', saga: logInGuestSaga });
  useInjectReducer({ key: 'AnswerSessionPage', reducer });
  useInjectSaga({ key: 'AnswerSessionPage', saga });
  const { sessionId, interventionId, index } = params;

  useEffect(() => {
    if (isPreview) fetchIntervention(interventionId);
  }, [interventionId]);

  const previewPossible = !(isPreview && !canPreview(interventionStatus));

  useEffect(() => {
    createUserSession(sessionId);
  }, []);

  useEffect(() => {
    if (userSession) nextQuestion(userSession.id, index);
  }, [userSession]);

  if (questionError)
    return (
      <Redirect
        to={{
          pathname: '/not-found-page',
          state: {
            header: formatMessage(messages.noEntranceHeader),
            text: formatMessage(messages.noEntranceText),
          },
        }}
      />
    );

  const currentQuestionId = currentQuestion ? currentQuestion.id : null;

  const saveAnswer = () =>
    submitAnswerRequest(
      currentQuestionId,
      get(currentQuestion, 'settings.required', false),
      get(currentQuestion, 'type', ''),
      sessionId,
      userSession.id,
    );

  const renderQuestion = () => {
    const {
      settings: { proceed_button: proceedButton, required },
    } = currentQuestion;
    const selectAnswerProp = answerBody => {
      saveSelectedAnswer({
        id: currentQuestionId,
        answerBody,
      });
    };

    const answerBody = answers[currentQuestionId]
      ? answers[currentQuestionId].answerBody
      : [];

    const isAnswered = () => !(Array.isArray(answerBody) && !answerBody.length);

    const isButtonDisabled = () => required && !isAnswered();

    const sharedProps = {
      selectAnswer: selectAnswerProp,
      answerBody,
      formatMessage,
      questionIndex,
      saveAnswer,
      showError: toast.error,
      feedbackScreenSettings,
      setFeedbackSettings,
      isAnimationOngoing,
    };

    const isLastScreen = currentQuestion.type === finishQuestion.id;

    return (
      <Row justify="center" width="100%">
        <AppContainer $width="100%">
          <CommonLayout currentQuestion={currentQuestion} />
          <Row mt={10}>
            {renderQuestionByType(currentQuestion, sharedProps)}
          </Row>
          {!isLastScreen &&
            (isNullOrUndefined(proceedButton) || proceedButton) &&
            !isAnimationOngoing && (
              <Row width="100%" my={20}>
                <Button
                  data-cy="continue-button"
                  disabled={isButtonDisabled()}
                  margin={20}
                  width="180px"
                  loading={currentQuestion.loading || nextQuestionLoading}
                  onClick={saveAnswer}
                  title={formatMessage(messages.nextQuestion)}
                />
              </Row>
            )}
        </AppContainer>
      </Row>
    );
  };

  const startInterventionAsync = async () => {
    await audioInstance.prepareAutoPlay();

    onStartSession();
  };

  const startButtonText = () => {
    if (previewPossible || isNullOrUndefined(previewPossible))
      return isPreview
        ? formatMessage(messages.startPreview)
        : formatMessage(messages.startSession);
    return formatMessage(messages.previewDisabled);
  };

  const renderPage = () => <>{renderQuestion()}</>;

  if (nextQuestionLoading && interventionStarted) return <Loader />;

  const isDesktop = previewMode === DESKTOP_MODE;
  return (
    <Column height="100%">
      <Box
        display="flex"
        align="center"
        justify="center"
        height="100%"
        width="100%"
      >
        <Helmet>
          <title>Answer Session</title>
          <meta name="description" content="Answer Session" />
        </Helmet>
        <AnswerOuterContainer
          previewMode={previewMode}
          interventionStarted={interventionStarted}
        >
          {interventionStarted && nextQuestionError && (
            <Column align="center" mt={30}>
              <H2 textAlign="center" mb={30}>
                {formatMessage(messages.nextQuestionError)}
              </H2>
              <StyledButton
                loading={nextQuestionLoading}
                onClick={() => nextQuestion(userSession.id)}
                title={formatMessage(messages.refetchQuestion)}
                isDesktop={isDesktop}
              />
            </Column>
          )}
          {!interventionStarted && !nextQuestionError && (
            <StyledButton
              loading={userSessionLoading || nextQuestionLoading}
              disabled={!previewPossible}
              onClick={startInterventionAsync}
              title={startButtonText()}
              isDesktop={isDesktop}
            />
          )}
          {interventionStarted && !nextQuestionError && (
            <>
              <Box width="100%">
                <Row justify="end" padding={30}>
                  <MSULogo
                    {...(isDesktop
                      ? { position: 'absolute', right: '30px' }
                      : {})}
                  />
                </Row>
                {!nextQuestionLoading &&
                  currentQuestion &&
                  interventionStarted && (
                    <AnimationRefHelper
                      currentQuestion={currentQuestion}
                      currentQuestionId={currentQuestionId}
                      previewMode={previewMode}
                      answers={answers}
                      changeIsAnimationOngoing={changeIsAnimationOngoing}
                      setFeedbackSettings={setFeedbackSettings}
                      feedbackScreenSettings={feedbackScreenSettings}
                      audioInstance={audioInstance}
                    >
                      {renderPage()}
                    </AnimationRefHelper>
                  )}
              </Box>
              {answersError && <ErrorAlert errorText={answersError} />}
            </>
          )}
        </AnswerOuterContainer>
      </Box>
    </Column>
  );
}

AnswerSessionPage.propTypes = {
  match: PropTypes.object,
  intl: PropTypes.object,
  AnswerSessionPage: PropTypes.object,
  saveSelectedAnswer: PropTypes.func,
  submitAnswerRequest: PropTypes.func,
  onStartSession: PropTypes.func,
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  audioInstance: PropTypes.shape(AudioWrapper),
  isPreview: PropTypes.bool,
  interventionStatus: PropTypes.string,
  fetchIntervention: PropTypes.func,
  createUserSession: PropTypes.func,
  nextQuestion: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  AnswerSessionPage: makeSelectAnswerSessionPage(),
  audioInstance: makeSelectAudioInstance(),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  submitAnswerRequest: submitAnswer,
  saveSelectedAnswer: selectAnswer,
  onStartSession: startSession,
  changeIsAnimationOngoing: changeIsAnimating,
  setFeedbackSettings: setFeedbackScreenSettings,
  fetchIntervention: fetchInterventionRequest,
  createUserSession: createUserSessionRequest,
  nextQuestion: nextQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const AnswerSessionPageWithIntl = injectIntl(AnswerSessionPage);

export default compose(
  withConnect,
  memo,
)(AnswerSessionPageWithIntl);
