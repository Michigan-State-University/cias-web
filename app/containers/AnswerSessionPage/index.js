/**
 *
 * AnswerSessionPage
 *
 */

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { Redirect, useLocation } from 'react-router-dom';
import { useContainerQuery } from 'react-container-query';
import { Hidden, Visible } from 'react-grid-system';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import Color from 'color';

import ccIcon from 'assets/svg/closed-captions.svg';

import { colors, elements, themeColors } from 'theme';

import AudioWrapper from 'utils/audioWrapper';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { DESKTOP_MODE, I_PHONE_8_PLUS_MODE } from 'utils/previewMode';
import { makeSelectAudioInstance } from 'global/reducers/globalState';
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
import { UserSessionType } from 'models/UserSession/UserSession';
import { QuestionTypes } from 'models/Question';

import QuestionTranscript from 'containers/QuestionTranscript';
import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';

import {
  additionalBreakpoints,
  containerBreakpoints,
} from 'components/Container/containerBreakpoints';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import { Button } from 'components/Button';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';
import Loader from 'components/Loader';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import { ConfirmationModal } from 'components/Modal';
import Img from 'components/Img';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import { SkipQuestionButton } from './components/SkipQuestionButton';
import CommonLayout from './layouts/CommonLayout';

import makeSelectAnswerSessionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  AnswerInterventionContent,
  AnswerOuterContainer,
  StyledButton,
} from './styled';
import {
  submitAnswer,
  selectAnswer,
  startSession,
  changeIsAnimating,
  setFeedbackScreenSettings,
  createUserSessionRequest,
  nextQuestionRequest,
  clearError,
  toggleTextTranscriptAction,
  setTransitionalUserSessionId as setTransitionalUserSessionIdAction,
} from './actions';
import BranchingScreen from './components/BranchingScreen';
import {
  NOT_SKIPPABLE_QUESTIONS,
  FULL_SIZE_QUESTIONS,
  CONFIRMABLE_QUESTIONS,
} from './constants';

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

  const isFullSize = FULL_SIZE_QUESTIONS.includes(currentQuestion.type);

  return (
    <AnswerInterventionContent
      isFullSize={isFullSize}
      ref={animationParentRef}
      id={ANSWER_SESSION_CONTAINER_ID}
    >
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
const IS_XXL = 'IS_XXL';
const IS_MOBILE = 'IS_MOBILE';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: additionalBreakpoints.desktopSm,
  },
  [IS_MOBILE]: {
    maxWidth: containerBreakpoints.sm,
  },
  [IS_XXL]: {
    minWidth: containerBreakpoints.xxl,
  },
};

export function AnswerSessionPage({
  match: { params },
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
    showTextTranscript,
    transitionalUserSessionId,
  },
  isPreview,
  interventionStatus,
  fetchIntervention,
  createUserSession,
  nextQuestion,
  clearErrors,
  toggleTextTranscript,
  setTransitionalUserSessionId,
}) {
  const { formatMessage } = useIntl();

  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ key: 'logInGuest', saga: logInGuestSaga });
  useInjectReducer({ key: 'AnswerSessionPage', reducer });
  useInjectSaga({ key: 'AnswerSessionPage', saga });
  useInjectSaga({ key: 'editPhoneNumber', saga: editPhoneNumberQuestionSaga });

  const [skipQuestionModalVisible, setSkipQuestionModalVisible] =
    useState(false);
  const [
    confirmContinueQuestionModalVisible,
    setConfirmContinueQuestionModalVisible,
  ] = useState(false);

  const {
    type,
    settings: {
      required,
      proceed_button: proceedButton,
      narrator_skippable: narratorSkippable,
    } = {},
  } = currentQuestion ?? {};

  const [containerQueryParams, pageRef] = useContainerQuery(QUERY);

  const { isDesktop, isMobile, transcriptIconFixedPosition } = useMemo(
    () => ({
      isDesktop:
        previewMode === DESKTOP_MODE && containerQueryParams[IS_DESKTOP],
      transcriptIconFixedPosition:
        previewMode === DESKTOP_MODE && containerQueryParams[IS_XXL],
      isMobile:
        previewMode === I_PHONE_8_PLUS_MODE || containerQueryParams[IS_MOBILE],
    }),
    [previewMode, containerQueryParams],
  );

  const logoStyles = useMemo(() => {
    if (isDesktop) return { position: 'absolute', right: '30px' };

    return {};
  }, [containerQueryParams, isDesktop]);

  const {
    logoUrl,
    imageAlt,
    languageCode,
    type: userSessionType,
  } = userSession ?? {};

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

  const saveAnswer = (skipped = false) =>
    submitAnswerRequest(
      currentQuestionId,
      get(currentQuestion, 'settings.required', false),
      get(currentQuestion, 'type', ''),
      sessionId,
      userSession.id,
      skipped,
    );

  const onContinueButton = () => {
    if (CONFIRMABLE_QUESTIONS.includes(type))
      setConfirmContinueQuestionModalVisible(true);
    else saveAnswer(false);
  };

  const renderQuestionTranscript = (isRightSide) => {
    const renderTranscriptComponent = ({ maxWidth, height }) => (
      <Box
        mt={30}
        mb={isFullSize && transcriptIconFixedPosition ? 30 : undefined}
        maxWidth={maxWidth}
        height={height}
      >
        <QuestionTranscript
          question={currentQuestion}
          language={languageCode}
        />
      </Box>
    );

    const renderRightSide = () => {
      if (isDesktop && !isFullSize)
        return (
          <Visible xxl>
            {renderTranscriptComponent({ maxWidth: 300, height: 600 })}
          </Visible>
        );

      return undefined;
    };

    const renderBottomSide = () => {
      if (isDesktop && !isFullSize)
        return (
          <Hidden xxl>
            {renderTranscriptComponent({ maxWidth: '100%', height: 300 })}
          </Hidden>
        );

      return renderTranscriptComponent({ maxWidth: '100%', height: 300 });
    };

    if (!showTextTranscript) return null;

    if (isRightSide) return renderRightSide();

    return renderBottomSide();
  };

  const renderTranscriptToggleIcon = () => {
    const transcriptToggleIcon = (
      <Icon
        width={22}
        src={ccIcon}
        onClick={toggleTextTranscript}
        fill={showTextTranscript ? themeColors.text : ''}
      />
    );

    if (transcriptIconFixedPosition) {
      return (
        <Row position="fixed" right={30} bottom={30}>
          {transcriptToggleIcon}
        </Row>
      );
    }

    return (
      <Row pt={15} pb={15}>
        {transcriptToggleIcon}
      </Row>
    );
  };

  const renderQuestion = () => {
    const selectAnswerProp = (answerBody, selectedByUser = true) => {
      saveSelectedAnswer({
        id: currentQuestionId,
        answerBody,
        selectedByUser,
      });
    };

    const { [currentQuestionId]: answer } = answers;
    const answerBody = answer?.answerBody ?? [];

    const isLoading =
      currentQuestion.loading || nextQuestionLoading || answer?.loading;
    const skipQuestionButtonDisabled = required || isLoading;

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
      isMobile,
      previewMode,
      isMobilePreview: previewMode !== DESKTOP_MODE,
      userSessionId: userSession?.id,
    };

    const isLastScreen = currentQuestion.type === finishQuestion.id;

    const canSkipNarrator = narratorSkippable || !isAnimationOngoing;

    const shouldRenderSkipQuestionButton =
      userSessionType !== UserSessionType.CAT_MH &&
      !isLastScreen &&
      !NOT_SKIPPABLE_QUESTIONS.includes(type);

    const shouldRenderContinueButton =
      !isLastScreen &&
      (isNullOrUndefined(proceedButton) || proceedButton) &&
      canSkipNarrator;

    return (
      <Row justify="center" width="100%">
        <AppContainer $width="100%">
          <Box lang={languageCode} width="100%">
            <CommonLayout currentQuestion={currentQuestion} />

            <Row>{renderQuestionByType(currentQuestion, sharedProps)}</Row>
          </Box>

          <Row width="100%" my={20} justify="end" align="center">
            {shouldRenderSkipQuestionButton && (
              <SkipQuestionButton
                onClick={() => setSkipQuestionModalVisible(true)}
                disabled={skipQuestionButtonDisabled}
              />
            )}

            {shouldRenderContinueButton && (
              <Button
                data-cy="continue-button"
                disabled={isButtonDisabled()}
                margin={20}
                width="180px"
                onClick={onContinueButton}
                loading={isLoading}
                title={formatMessage(messages.nextQuestion)}
              />
            )}
          </Row>

          {renderQuestionTranscript(false)}
          {renderTranscriptToggleIcon()}
        </AppContainer>
      </Row>
    );
  };

  const startSessionAsync = async () => {
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

  const pageHeaderText = () =>
    isPreview
      ? formatMessage(messages.previewHeader)
      : formatMessage(messages.fillHeader);

  const renderPage = () => <>{renderQuestion()}</>;

  const resetTransitionalUserSessionId = () =>
    setTransitionalUserSessionId(null);

  if (nextQuestionLoading && interventionStarted) return <Loader />;
  const isFullSize =
    interventionStarted &&
    currentQuestion &&
    FULL_SIZE_QUESTIONS.includes(currentQuestion.type);

  return (
    <Column height="100%" ref={pageRef}>
      <ConfirmationModal
        visible={skipQuestionModalVisible}
        onClose={() => setSkipQuestionModalVisible(false)}
        description={formatMessage(messages.skipQuestionModalHeader)}
        content={formatMessage(messages.skipQuestionModalMessage)}
        confirmAction={() => saveAnswer(true)}
        hideCloseButton
        contentContainerStyles={{
          mb: 20,
        }}
        isMobile={isMobile}
      />

      <ConfirmationModal
        icon="info"
        visible={confirmContinueQuestionModalVisible}
        onClose={() => setConfirmContinueQuestionModalVisible(false)}
        description={formatMessage(messages.confirmContinueModalHeader)}
        content={formatMessage(
          messages[`confirmContinueModalMessage${QuestionTypes.TLFB_EVENTS}`],
        )}
        confirmAction={() => saveAnswer(false)}
        confirmationButtonText={formatMessage(
          messages.confirmContinueModalConfirmText,
        )}
        cancelButtonText={formatMessage(
          messages.confirmContinueModalCancelText,
        )}
        confirmationButtonColor="primary"
        cancelButtonStyles={{
          color: Color(themeColors.primary).alpha(0.1).hexa(),
          textColor: themeColors.primary,
          hoverColor: colors.white,
          hoverTextColor: themeColors.primary,
          inverted: false,
        }}
        contentContainerStyles={{
          mb: 20,
          mt: 10,
        }}
        hideCloseButton
        isMobile={isMobile}
      />

      <Box
        display="flex"
        align="center"
        justify="center"
        height="100%"
        width="100%"
      >
        <Helmet>
          <title>{formatMessage(messages.pageTitle, { isPreview })}</title>
        </Helmet>

        <AnswerOuterContainer
          isFullSize={isFullSize}
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
              <H2 textAlign="center" mb={50}>
                {pageHeaderText()}
              </H2>
              <H3 textAlign="center" color={themeColors.warning} mb={50}>
                {formatMessage(messages.wcagWarning)}
              </H3>
              <StyledButton
                loading={userSessionLoading || nextQuestionLoading}
                disabled={!previewPossible}
                onClick={startSessionAsync}
                title={buttonText()}
                isDesktop={isDesktop}
              />
            </>
          )}
          {interventionStarted && !nextQuestionError && (
            <>
              <Box width="100%">
                <Row padding={30} pb={isDesktop ? 10 : 0}>
                  <Box {...logoStyles}>
                    <Row justify="end">
                      {logoUrl && (
                        <Img
                          maxHeight={elements.interventionLogoSize.height}
                          maxWidth={elements.interventionLogoSize.width}
                          src={logoUrl}
                          aria-label={imageAlt}
                        />
                      )}
                    </Row>

                    {renderQuestionTranscript(true)}
                  </Box>
                </Row>

                {transitionalUserSessionId && (
                  <BranchingScreen
                    resetTransitionalUserSessionId={
                      resetTransitionalUserSessionId
                    }
                  />
                )}

                {!nextQuestionLoading &&
                  currentQuestion &&
                  interventionStarted &&
                  !transitionalUserSessionId && (
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
  toggleTextTranscript: PropTypes.func,
  setTransitionalUserSessionId: PropTypes.func,
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
  toggleTextTranscript: toggleTextTranscriptAction,
  setTransitionalUserSessionId: setTransitionalUserSessionIdAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AnswerSessionPage);
