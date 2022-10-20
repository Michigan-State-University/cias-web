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
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useContainerQuery } from 'react-container-query';
import { Hidden, Visible } from 'react-grid-system';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import Color from 'color';

import ccIcon from 'assets/svg/closed-captions.svg';

import { colors, elements, themeColors } from 'theme';

import AudioWrapper from 'utils/audioWrapper';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { DESKTOP_MODE, I_PHONE_8_PLUS_MODE } from 'utils/previewMode';
import { CHARACTER_FIXED_POSITION_QUESTIONS } from 'utils/characterConstants';
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
import {
  ChatWidgetReducer,
  chatWidgetReducerKey,
  setChatEnabled,
} from 'global/reducers/chatWidget';
import { canPreview } from 'models/Status/statusPermissions';
import { finishQuestion } from 'models/Session/QuestionTypes';
import { UserSessionType } from 'models/UserSession/UserSession';
import { QuestionTypes } from 'models/Question';
import { CHARACTER_CONFIGS } from 'models/Character';

import QuestionTranscript from 'containers/QuestionTranscript';
import {
  ANSWER_SESSION_PAGE_ID,
  ANSWER_SESSION_CONTAINER_ID,
} from 'containers/App/constants';

import {
  additionalBreakpoints,
  containerBreakpoints,
} from 'components/Container/containerBreakpoints';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';
import Loader from 'components/Loader';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import { ConfirmationModal, ModalType, useModal } from 'components/Modal';
import Img from 'components/Img';
import QuickExit from 'components/QuickExit';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import CommonLayout from './layouts/CommonLayout';

import makeSelectAnswerSessionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  AnswerInterventionContent,
  AnswerOuterContainer,
  ScreenWrapper,
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
  saveQuickExitEventRequest,
} from './actions';
import BranchingScreen from './components/BranchingScreen';
import {
  NOT_SKIPPABLE_QUESTIONS,
  FULL_SIZE_QUESTIONS,
  CONFIRMABLE_QUESTIONS,
} from './constants';
import { ActionButtons } from './components/ActionButtons';

const AnimationRefHelper = ({
  children,
  currentQuestion,
  currentQuestionId,
  previewMode,
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
  setLiveChatEnabled,
  saveQuickExitEvent,
}) {
  const { formatMessage } = useIntl();
  const history = useHistory();

  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ key: 'logInGuest', saga: logInGuestSaga });
  useInjectReducer({ key: 'AnswerSessionPage', reducer });
  useInjectSaga({ key: 'AnswerSessionPage', saga });
  useInjectSaga({ key: 'editPhoneNumber', saga: editPhoneNumberQuestionSaga });
  useInjectReducer({ key: chatWidgetReducerKey, reducer: ChatWidgetReducer });

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

  const checkIfDesktop = (containerQuery) =>
    isPreview ? previewMode === DESKTOP_MODE && containerQuery : containerQuery;

  const { isDesktop, isMobile, transcriptIconFixedPosition } = useMemo(
    () => ({
      isDesktop: checkIfDesktop(containerQueryParams[IS_DESKTOP]),
      transcriptIconFixedPosition: checkIfDesktop(containerQueryParams[IS_XXL]),
      isMobile: isPreview
        ? previewMode === I_PHONE_8_PLUS_MODE
        : containerQueryParams[IS_MOBILE],
    }),
    [previewMode, containerQueryParams, isPreview],
  );

  const {
    id: userSessionId,
    logoUrl,
    imageAlt,
    languageCode,
    type: userSessionType,
    quickExitEnabled,
  } = userSession ?? {};

  const isNewUserSession = useMemo(() => {
    const { lastAnswerAt } = userSession ?? {};

    return !lastAnswerAt;
  }, [userSession]);

  const isUserSessionFinished = useMemo(() => {
    const { finishedAt } = userSession ?? {};

    return Boolean(finishedAt);
  }, [userSession]);

  const isCatMhSession = userSessionType === UserSessionType.CAT_MH;

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
  }, [sessionId]);

  useEffect(() => {
    if (userSession) {
      nextQuestion(userSessionId, index);
      if (userSession.liveChatEnabled && interventionId) {
        setLiveChatEnabled(interventionId);
      }
    }
  }, [userSession]);

  const { openModal, Modal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      icon: 'info',
      visible: true,
      confirmationButtonColor: themeColors.primary,
      confirmationButtonText: formatMessage(messages.goBackToHomePage),
      confirmationButtonStyles: { width: 'auto', px: 30 },
      confirmAction: () => history.push('/'),
      description: formatMessage(messages.catMhErrorModalTitle),
      content: nextQuestionError?.error?.response?.data?.body ?? '',
      hideCloseButton: true,
      hideCancelButton: true,
      maxWidth: 500,
      contentContainerStyles: { px: 20, py: 20 },
      disableClose: true,
    },
  });

  useEffect(() => {
    if (nextQuestionError && isCatMhSession) {
      openModal();
    }
  }, [nextQuestionError]);

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
      userSessionId,
      skipped,
    );

  const isNarratorPositionFixed =
    CHARACTER_FIXED_POSITION_QUESTIONS.includes(type);

  const onContinueButton = () => {
    if (CONFIRMABLE_QUESTIONS.includes(type))
      setConfirmContinueQuestionModalVisible(true);
    else saveAnswer(false);
  };

  const renderQuestionTranscript = (isRightSide) => {
    const renderTranscriptComponent = ({ maxWidth, height }) => (
      <Box mt={isRightSide ? 120 : 30} maxWidth={maxWidth} height={height}>
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
      isMobilePreview: isPreview && previewMode !== DESKTOP_MODE,
      userSessionId: userSession?.id,
    };

    const isLastScreen = currentQuestion.type === finishQuestion.id;

    const canSkipNarrator = narratorSkippable || !isAnimationOngoing;

    const shouldRenderSkipQuestionButton =
      !isCatMhSession &&
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

          {isNarratorPositionFixed && (
            <Row mt={isMobile ? 32 : 16}>
              <AnimationRefHelper
                currentQuestion={currentQuestion}
                currentQuestionId={currentQuestionId}
                previewMode={previewMode}
                changeIsAnimationOngoing={changeIsAnimationOngoing}
                setFeedbackSettings={setFeedbackSettings}
                feedbackScreenSettings={feedbackScreenSettings}
                audioInstance={audioInstance}
              >
                <ActionButtons
                  renderSkipQuestionButton={shouldRenderSkipQuestionButton}
                  skipQuestionButtonDisabled={skipQuestionButtonDisabled}
                  onSkipQuestionClick={() => setSkipQuestionModalVisible(true)}
                  renderContinueButton={shouldRenderContinueButton}
                  continueButtonDisabled={isButtonDisabled()}
                  continueButtonLoading={isLoading}
                  onContinueClick={onContinueButton}
                  containerStyle={{
                    my: 0,
                    height:
                      CHARACTER_CONFIGS[
                        currentQuestion.narrator.settings.character
                      ]?.size?.height,
                    align: isMobile ? 'end' : 'center',
                  }}
                  continueButtonStyle={{
                    margin: 0,
                  }}
                />
              </AnimationRefHelper>
            </Row>
          )}

          {!isNarratorPositionFixed && (
            <ActionButtons
              renderSkipQuestionButton={shouldRenderSkipQuestionButton}
              skipQuestionButtonDisabled={skipQuestionButtonDisabled}
              onSkipQuestionClick={() => setSkipQuestionModalVisible(true)}
              renderContinueButton={shouldRenderContinueButton}
              continueButtonDisabled={isButtonDisabled()}
              continueButtonLoading={isLoading}
              onContinueClick={onContinueButton}
            />
          )}

          {renderQuestionTranscript(false)}
          {renderTranscriptToggleIcon()}
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

  const resetTransitionalUserSessionId = () =>
    setTransitionalUserSessionId(null);

  const beforeQuickExit = () => {
    saveQuickExitEvent(userSessionId, isPreview);
  };

  const showLoader = nextQuestionLoading && interventionStarted;

  const isFullSize =
    interventionStarted &&
    currentQuestion &&
    FULL_SIZE_QUESTIONS.includes(currentQuestion.type);

  return (
    <Column height="100%" ref={pageRef} id={ANSWER_SESSION_PAGE_ID}>
      {quickExitEnabled && (
        <QuickExit
          isMobilePreview={isPreview && previewMode === I_PHONE_8_PLUS_MODE}
          beforeQuickExit={beforeQuickExit}
        />
      )}

      {interventionStarted && !nextQuestionError && logoUrl && isDesktop && (
        <Row justify="start" pl={24} pt={24}>
          <Img
            maxHeight={elements.interventionLogoSize.height}
            maxWidth={elements.interventionLogoSize.width}
            src={logoUrl}
            aria-label={imageAlt}
          />
        </Row>
      )}

      {showLoader && <Loader />}
      {!showLoader && (
        <>
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
              messages[
                `confirmContinueModalMessage${QuestionTypes.TLFB_EVENTS}`
              ],
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

          <Modal />

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
              previewMode={isPreview ? previewMode : DESKTOP_MODE}
              interventionStarted={interventionStarted}
            >
              {interventionStarted && nextQuestionError && (
                <Column align="center" mt={30}>
                  <H2 textAlign="center" mb={30}>
                    {formatMessage(messages.nextQuestionError)}
                  </H2>
                  <StyledButton
                    loading={nextQuestionLoading}
                    onClick={() => nextQuestion(userSessionId)}
                    title={formatMessage(messages.refetchQuestion)}
                    isDesktop={isDesktop}
                  />
                </Column>
              )}
              {!interventionStarted && !nextQuestionError && (
                <Column justify="center" height="100%" position="relative">
                  <Row direction="column" align="center">
                    <Box mx={32} maxWidth={600}>
                      <H2 textAlign="center" mb={50}>
                        {formatMessage(messages.fillHeader)}
                      </H2>
                    </Box>
                    <StyledButton
                      loading={userSessionLoading || nextQuestionLoading}
                      disabled={!previewPossible}
                      onClick={startInterventionAsync}
                      title={buttonText()}
                      isDesktop={isDesktop}
                    />
                  </Row>
                  <Box
                    position="absolute"
                    bottom={
                      userSession?.liveChatEnabled && !isDesktop ? 90 : 48
                    }
                    mx={24}
                  >
                    <H3 textAlign="center" color={themeColors.warning}>
                      {formatMessage(messages.wcagWarning)}
                    </H3>
                  </Box>
                </Column>
              )}
              {interventionStarted && !nextQuestionError && (
                <Box
                  id={ANSWER_SESSION_CONTAINER_ID}
                  position="relative"
                  height="100%"
                  width="100%"
                  borderRadius="0px"
                >
                  <Box width="100%">
                    <Row
                      padding={!isDesktop || isMobile ? 30 : 0}
                      pb={isDesktop || (!isDesktop && logoUrl) ? 24 : 0}
                      width="100%"
                    >
                      {!isDesktop && (
                        <Row>
                          <Img
                            maxHeight={elements.interventionLogoSize.height}
                            maxWidth={elements.interventionLogoSize.width}
                            src={logoUrl}
                            aria-label={imageAlt}
                          />
                        </Row>
                      )}
                      {renderQuestionTranscript(true)}
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
                        <ScreenWrapper isFullSize={isFullSize}>
                          {isNarratorPositionFixed && renderPage()}
                          {!isNarratorPositionFixed && (
                            <AnimationRefHelper
                              currentQuestion={currentQuestion}
                              currentQuestionId={currentQuestionId}
                              previewMode={previewMode}
                              changeIsAnimationOngoing={
                                changeIsAnimationOngoing
                              }
                              setFeedbackSettings={setFeedbackSettings}
                              feedbackScreenSettings={feedbackScreenSettings}
                              audioInstance={audioInstance}
                            >
                              {renderPage()}
                            </AnimationRefHelper>
                          )}
                        </ScreenWrapper>
                      )}
                  </Box>
                  {answersError && <ErrorAlert errorText={answersError} />}
                </Box>
              )}
            </AnswerOuterContainer>
          </Box>
        </>
      )}
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
  setLiveChatEnabled: PropTypes.func,
  saveQuickExitEvent: PropTypes.func,
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
  setLiveChatEnabled: setChatEnabled,
  saveQuickExitEvent: saveQuickExitEventRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AnswerSessionPage);
