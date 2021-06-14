/**
 *
 * AnswerSessionPage
 *
 */

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { Redirect, useLocation } from 'react-router-dom';
import { useContainerQuery } from 'react-container-query';
import { Markup } from 'interweave';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';

import { colors } from 'theme';
import AudioWrapper from 'utils/audioWrapper';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { DESKTOP_MODE } from 'utils/previewMode';

import { additionalBreakpoints } from 'components/Container/containerBreakpoints';
import Text from 'components/Text';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import { Button } from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';
import Loader from 'components/Loader';
import { MSULogo } from 'components/Logo';
import H2 from 'components/H2';
import H3 from 'components/H3';

import { makeSelectAudioInstance } from 'global/reducers/globalState';

import globalMessages from 'global/i18n/globalMessages';
import {
  fetchInterventionRequest,
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
} from 'global/reducers/intervention';
import {
  editPhoneNumberQuestionSaga,
  REDIRECT_QUERY_KEY,
} from 'global/reducers/auth';
import logInGuestSaga from 'global/reducers/auth/sagas/logInGuest';
import { canPreview } from 'models/Status/statusPermissions';
import { finishQuestion } from 'models/Session/QuestionTypes';
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
  clearError,
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

  const settings = {
    ...currentQuestion.narrator.settings,
    ...currentQuestion.settings,
  };

  return (
    <AnswerInterventionContent ref={animationParentRef}>
      {children}
      {refState !== null && (
        <CharacterAnim
          animationContainer={animationParentRef.current}
          blocks={currentQuestion.narrator.blocks}
          questionId={currentQuestionId}
          settings={settings}
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

const IS_DESKTOP = 'IS_DESKTOP';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: additionalBreakpoints.desktopSm,
  },
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
  clearErrors,
}) {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ key: 'logInGuest', saga: logInGuestSaga });
  useInjectReducer({ key: 'AnswerSessionPage', reducer });
  useInjectSaga({ key: 'AnswerSessionPage', saga });
  useInjectSaga({ key: 'editPhoneNumber', saga: editPhoneNumberQuestionSaga });

  const {
    settings: {
      required,
      proceed_button: proceedButton,
      narratorSkippable,
    } = {},
  } = currentQuestion ?? {};

  const [containerQueryParams, pageRef] = useContainerQuery(QUERY);

  const isDesktop = useMemo(
    () => previewMode === DESKTOP_MODE && containerQueryParams[IS_DESKTOP],
    [previewMode, containerQueryParams],
  );

  const logoStyles = useMemo(() => {
    if (isDesktop) return { position: 'absolute', right: '30px' };

    return {};
  }, [containerQueryParams, isDesktop]);

  const { logoUrl } = userSession ?? {};

  const isNewUserSession = useMemo(() => {
    const { lastAnswerAt } = userSession ?? {};

    return !lastAnswerAt;
  }, [userSession]);

  const isUserSessionFinished = useMemo(() => {
    const { finishedAt } = userSession ?? {};

    return Boolean(finishedAt);
  }, [userSession]);

  const location = useLocation();

  const { sessionId, interventionId, index } = params;

  useEffect(() => {
    if (isPreview) fetchIntervention(interventionId);
  }, [interventionId]);

  const previewPossible =
    !(isPreview && !canPreview(interventionStatus)) && !isUserSessionFinished;

  useEffect(() => {
    createUserSession(sessionId);

    return clearErrors;
  }, []);

  useEffect(() => {
    if (userSession) nextQuestion(userSession.id, index);
  }, [userSession]);

  if (questionError) {
    const queryParams = new URLSearchParams(location.search);

    queryParams.append(
      REDIRECT_QUERY_KEY,
      encodeURIComponent(location.pathname),
    );

    return <Redirect to={`/no-access?${queryParams.toString()}`} />;
  }

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
    const selectAnswerProp = (answerBody, selectedByUser = true) => {
      saveSelectedAnswer({
        id: currentQuestionId,
        answerBody,
        selectedByUser,
      });
    };

    const { [currentQuestionId]: answer } = answers;
    const answerBody = answers[currentQuestionId]?.answerBody ?? [];

    const isAnswered = () =>
      answer &&
      Array.isArray(answer.answerBody) &&
      answer.answerBody.length &&
      answer.selectedByUser;

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
      isDesktop,
    };

    const isLastScreen = currentQuestion.type === finishQuestion.id;

    const canSkipNarrator = narratorSkippable || !isAnimationOngoing;

    const shouldRenderButton =
      !isLastScreen &&
      (isNullOrUndefined(proceedButton) || proceedButton) &&
      canSkipNarrator;

    return (
      <Row justify="center" width="100%">
        <AppContainer $width="100%">
          <CommonLayout currentQuestion={currentQuestion} />
          <Row>{renderQuestionByType(currentQuestion, sharedProps)}</Row>
          {required && (
            <Text color={colors.sonicSilver} mt={40} ml={20}>
              <Markup
                content={formatMessage(globalMessages.questionRequired)}
                noWrap
              />
            </Text>
          )}
          {shouldRenderButton && (
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

  const continueButtonText = () => {
    if (previewPossible || isNullOrUndefined(previewPossible))
      return isPreview
        ? formatMessage(messages.continuePreview)
        : formatMessage(messages.continueSession);
    return formatMessage(messages.previewDisabled);
  };

  const buttonText = () => {
    if (isUserSessionFinished) return formatMessage(messages.sessionFinished);

    if (isNewUserSession || Boolean(index)) return startButtonText();

    return continueButtonText();
  };

  const renderPage = () => <>{renderQuestion()}</>;

  if (nextQuestionLoading && interventionStarted) return <Loader />;

  return (
    <Column height="100%" ref={pageRef}>
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
            <>
              <H3 textAlign="center" color={colors.flamingo} mb={50}>
                {formatMessage(messages.wcagWarning)}
              </H3>
              <StyledButton
                loading={userSessionLoading || nextQuestionLoading}
                disabled={!previewPossible}
                onClick={startInterventionAsync}
                title={buttonText()}
                isDesktop={isDesktop}
              />
            </>
          )}
          {interventionStarted && !nextQuestionError && (
            <>
              <Box width="100%">
                <Row justify="end" padding={30} pb={isDesktop ? 10 : 0}>
                  <MSULogo logoUrl={logoUrl} {...logoStyles} />
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
  clearErrors: PropTypes.func,
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
  clearErrors: clearError,
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
