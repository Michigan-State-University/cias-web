/**
 *
 * AnswerSessionPage
 *
 */

import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
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

import { colors, elements, themeColors } from 'theme';

import AudioWrapper from 'utils/audioWrapper';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { DESKTOP_MODE, I_PHONE_8_PLUS_MODE } from 'utils/previewMode';
import { CHARACTER_FIXED_POSITION_QUESTIONS } from 'utils/characterConstants';
import LocalStorageService from 'utils/localStorageService';
import useQuery from 'utils/useQuery';
import { arrayBufferToBase64 } from 'utils/arrayBufferToBase64';

import {
  makeSelectAudioInstance,
  makeSelectInterventionDynamicElementsDirection,
  makeSelectInterventionFixedElementsDirection,
} from 'global/reducers/globalState';
import {
  fetchInterventionRequest,
  fetchInterventionSaga,
  makeSelectInterventionStatus,
  interventionReducer,
  makeSelectInterventionId,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import {
  editPhoneNumberQuestionSaga,
  editUserSaga,
  updateUsersTimezoneSaga,
} from 'global/reducers/auth';
import logInGuestSaga from 'global/reducers/auth/sagas/logInGuest';
import {
  ChatWidgetReducer,
  chatWidgetReducerKey,
  setChatEnabled,
} from 'global/reducers/chatWidget';
import {
  RoutePath,
  REDIRECT_QUERY_KEY,
  INTERVENTION_LANGUAGE_QUERY_KEY,
  SKIP_WARNING_SCREEN_QUERY_KEY,
} from 'global/constants';

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
import { changeLocale as changeLocaleAction } from 'containers/AppLanguageProvider/actions';

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
  setTransitionalUserSessionId as setTransitionalUserSessionIdAction,
  saveQuickExitEventRequest,
  fetchUserSessionRequest,
  fetchPreviousQuestionRequest,
  selectVideoStats,
} from './actions';
import BranchingScreen from './components/BranchingScreen';
import {
  FULL_SIZE_QUESTIONS,
  CONFIRMABLE_QUESTIONS,
  NO_CONTINUE_BUTTON_QUESTIONS,
} from './constants';
import { ActionButtons } from './components/ActionButtons';
import AnswerSessionPageFooter from './components/AnswerSessionPageFooter';
import ScreenBackButton from './components/ScreenBackButton';
import { GoToDashboardButton } from './components/GoToDashboardButton';

const AnimationRefHelper = ({
  children,
  currentQuestion,
  currentQuestionId,
  previewMode,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  feedbackScreenSettings,
  audioInstance,
  dynamicElementsDirection,
}) => {
  const animationParentRef = useRef();
  const [refState, setRefState] = useState(null);
  const [blocksWithAudio, setBlocksWithAudio] = useState(null);

  const eagerLoadAudioData = useCallback(async () => {
    const { blocks } = currentQuestion.narrator;
    if (blocks.length) {
      const equippedBlocks = await Promise.all(
        blocks.map(async (block) => {
          if (block.audio_urls) {
            const base64s = await Promise.all(
              block.audio_urls.map(async (url) => {
                const file = await fetch(`${process.env.API_URL}${url}`);
                if (file.status === 200) {
                  const contentType = file.headers.get('Content-Type');
                  const arrayBuffer = await file.arrayBuffer();
                  if (arrayBuffer.byteLength === 0) {
                    return '';
                  }
                  const base64String = arrayBufferToBase64(arrayBuffer);
                  return `data:${contentType};base64,${base64String}`;
                }
                return '';
              }),
            );
            return { audios_base64: base64s, ...block };
          }
          let reflections = [];
          if (block.reflections) {
            reflections = await Promise.all(
              block.reflections.map(async (reflectionBlock) => {
                if (reflectionBlock.audio_urls) {
                  const base64s = await Promise.all(
                    reflectionBlock.audio_urls.map(async (url) => {
                      const file = await fetch(`${process.env.API_URL}${url}`);
                      if (file.status === 200) {
                        const contentType = file.headers.get('Content-Type');
                        const arrayBuffer = await file.arrayBuffer();
                        if (arrayBuffer.byteLength === 0) {
                          return '';
                        }
                        const base64String = arrayBufferToBase64(arrayBuffer);
                        return `data:${contentType};base64,${base64String}`;
                      }
                      return '';
                    }),
                  );

                  return { audios_base64: base64s, ...reflectionBlock };
                }
              }),
            );
          }
          let targetValues = [];
          if (block.target_value) {
            const isTargetValueArray = Array.isArray(block.target_value);
            if (isTargetValueArray) {
              targetValues = await Promise.all(
                block.target_value.map(async (targetValue) => {
                  if (targetValue.audio_urls) {
                    const base64s = await Promise.all(
                      targetValue.audio_urls.map(async (url) => {
                        const file = await fetch(
                          `${process.env.API_URL}${url}`,
                        );
                        if (file.status === 200) {
                          const contentType = file.headers.get('Content-Type');
                          const arrayBuffer = await file.arrayBuffer();
                          if (arrayBuffer.byteLength === 0) {
                            return '';
                          }
                          const base64String = arrayBufferToBase64(arrayBuffer);
                          return `data:${contentType};base64,${base64String}`;
                        }
                        return '';
                      }),
                    );

                    return { audios_base64: base64s, ...targetValue };
                  }
                }),
              );
            } else {
              const base64s = await Promise.all(
                block.target_value.audio_urls.map(async (url) => {
                  const file = await fetch(`${process.env.API_URL}${url}`);
                  if (file.status === 200) {
                    const contentType = file.headers.get('Content-Type');
                    const arrayBuffer = await file.arrayBuffer();
                    if (arrayBuffer.byteLength === 0) {
                      return '';
                    }
                    const base64String = arrayBufferToBase64(arrayBuffer);
                    return `data:${contentType};base64,${base64String}`;
                  }
                  return '';
                }),
              );
              targetValues = { audios_base64: base64s, ...block.target_value };
            }
            return { ...block, target_value: targetValues, reflections };
          }
          return block;
        }),
      );
      await setBlocksWithAudio(equippedBlocks);
    }
  }, []);

  useEffect(() => {
    eagerLoadAudioData();
  }, [eagerLoadAudioData]);

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
      {refState !== null && blocksWithAudio !== null && (
        <CharacterAnim
          animationContainer={animationParentRef.current}
          blocks={blocksWithAudio}
          questionId={currentQuestionId}
          settings={settings}
          previewMode={previewMode}
          changeIsAnimationOngoing={changeIsAnimationOngoing}
          setFeedbackSettings={setFeedbackSettings}
          feedbackScreenSettings={feedbackScreenSettings}
          audioInstance={audioInstance}
          dynamicElementsDirection={dynamicElementsDirection}
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
  dynamicElementsDirection: PropTypes.string,
};

const IS_DESKTOP = 'IS_DESKTOP';
const IS_MOBILE = 'IS_MOBILE';

const QUERY = {
  [IS_DESKTOP]: {
    minWidth: additionalBreakpoints.desktopSm,
  },
  [IS_MOBILE]: {
    maxWidth: containerBreakpoints.sm,
  },
};

export function AnswerSessionPage({
  match: { params },
  saveSelectedAnswer,
  saveVideoStats,
  submitAnswerRequest,
  onStartSession,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  audioInstance,
  AnswerSessionPage: {
    questionError,
    answersError,
    answers,
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
    showTextReadingControls,
    transitionalUserSessionId,
    fetchPreviousQuestionLoading,
  },
  isPreview,
  interventionStatus,
  fetchedInterventionId,
  fetchInterventionLoading,
  fetchIntervention,
  fetchUserSession,
  createUserSession,
  nextQuestion,
  clearErrors,
  setTransitionalUserSessionId,
  setLiveChatEnabled,
  saveQuickExitEvent,
  fetchPreviousQuestion,
  fixedElementsDirection,
  dynamicElementsDirection,
  changeLocale,
}) {
  const { formatMessage } = useIntl();
  const history = useHistory();

  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  useInjectSaga({ key: 'logInGuest', saga: logInGuestSaga });
  useInjectSaga({ key: 'updateUsersTimezone', saga: updateUsersTimezoneSaga });
  useInjectSaga({ key: 'editUser', saga: editUserSaga });
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

  const [videoStart, setVideoStart] = useState(null);
  const [videoEnd, setVideoEnd] = useState(null);
  const [videoProgress, setVideoProgress] = useState(null);

  const {
    type,
    settings: {
      required,
      proceed_button: proceedButton,
      narrator_skippable: narratorSkippable,
      min_length: minLength,
      max_length: maxLength,
    } = {},
    narrator: {
      blocks: narratorBlocks,
      settings: {
        character,
        extra_space_for_narrator: extraSpaceForNarrator,
      } = {},
    } = {},
    first_question: isFirstScreen,
    question_language: questionLanguage,
  } = currentQuestion ?? {};

  const [containerQueryParams, pageRef] = useContainerQuery(QUERY);

  const checkIfDesktop = (containerQuery) =>
    isPreview ? previewMode === DESKTOP_MODE && containerQuery : containerQuery;

  const { isDesktop, isMobile, isMobilePreview } = useMemo(
    () => ({
      isDesktop: checkIfDesktop(containerQueryParams[IS_DESKTOP]),
      isMobile: isPreview
        ? previewMode === I_PHONE_8_PLUS_MODE
        : containerQueryParams[IS_MOBILE],
      isMobilePreview: isPreview && previewMode === I_PHONE_8_PLUS_MODE,
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
    skipWarningScreen,
  } = userSession ?? {};

  const isNewUserSession = useMemo(() => {
    const { lastAnswerAt, started } = userSession ?? {};

    // keeping lastAnswerAt check for existing user sessions
    return !lastAnswerAt && !started;
  }, [userSession]);

  const isUserSessionFinished = useMemo(() => {
    const { finishedAt } = userSession ?? {};

    return Boolean(finishedAt);
  }, [userSession]);

  const isAuthenticated = LocalStorageService.isAuthenticated();
  const isGuestUser = isAuthenticated && !LocalStorageService.getState();

  const isCatMhSession = userSessionType === UserSessionType.CAT_MH;

  const location = useLocation();

  const lang = useQuery(INTERVENTION_LANGUAGE_QUERY_KEY);
  const skipWarningQuery = useQuery(SKIP_WARNING_SCREEN_QUERY_KEY);

  const shouldSkipWarning = useMemo(() => {
    if (typeof skipWarningScreen === 'boolean') {
      return skipWarningScreen;
    }
    return skipWarningQuery !== 'false';
  }, [skipWarningScreen, skipWarningQuery]);

  useEffect(() => {
    if (questionLanguage) {
      changeLocale(questionLanguage);
    } else if (lang) {
      changeLocale(lang);
    }
  }, [lang, questionLanguage]);

  const { sessionId, interventionId, index } = params;

  useEffect(() => {
    if (
      isPreview &&
      interventionId !== fetchedInterventionId &&
      !fetchInterventionLoading
    ) {
      fetchIntervention(interventionId);
    }
  }, [interventionId]);

  useEffect(() => {
    if (currentQuestionId) {
      saveVideoStats(
        { videoStart, videoProgress, videoEnd },
        currentQuestionId,
      );
    }
  }, [videoStart, videoProgress, videoEnd]);

  const previewPossible =
    !(isPreview && !canPreview(interventionStatus)) &&
    (!isUserSessionFinished || (isGuestUser && isUserSessionFinished));

  useEffect(() => {
    if (isAuthenticated && !userSession) {
      fetchUserSession(sessionId);
    }
    return clearErrors;
  }, []);

  useEffect(() => {
    if (isUserSessionFinished && isGuestUser && !interventionStarted) {
      LocalStorageService.clearHeaders();
    }
  }, [isUserSessionFinished, isGuestUser, interventionStarted]);

  useEffect(() => {
    if (!userSession || isUserSessionFinished) return;

    if (!nextQuestionLoading) {
      const questionId = userSession.lastAnswerAt ? null : index;
      nextQuestion(userSessionId, questionId);
    }

    if (userSession.liveChatEnabled && interventionId) {
      setLiveChatEnabled(interventionId);
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
      confirmAction: () => history.push(RoutePath.DASHBOARD),
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

  useEffect(() => {
    if (
      shouldSkipWarning &&
      !interventionStarted &&
      !userSessionLoading &&
      !nextQuestionLoading &&
      !fetchInterventionLoading &&
      previewPossible !== false &&
      !isUserSessionFinished &&
      (userSession || !isAuthenticated || isGuestUser)
    ) {
      startInterventionAsync();
    }
  }, [
    shouldSkipWarning,
    interventionStarted,
    userSessionLoading,
    nextQuestionLoading,
    fetchInterventionLoading,
    previewPossible,
    isUserSessionFinished,
    userSession,
    isAuthenticated,
    isGuestUser,
  ]);

  if (questionError) {
    const queryParams = new URLSearchParams(location.search);

    queryParams.append(
      REDIRECT_QUERY_KEY,
      encodeURIComponent(location.pathname),
    );

    return <Redirect to={`${RoutePath.FORBIDDEN}?${queryParams.toString()}`} />;
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
    if (CONFIRMABLE_QUESTIONS.includes(type)) {
      setConfirmContinueQuestionModalVisible(true);
    } else saveAnswer(false);
  };

  const renderQuestionTranscript = (isRightSide) => {
    const renderTranscriptComponent = (styles) => (
      <Box mt={isRightSide ? 0 : 30} {...styles}>
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
            {renderTranscriptComponent({
              width: 300,
              height: 600,
              position: 'fixed',
              right: 24,
              top: 130 + (isPreview ? elements.navbarHeight : 0),
            })}
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

  const renderQuestion = () => {
    const selectAnswerProp = (answerBody) => {
      saveSelectedAnswer(answerBody, currentQuestionId);
    };

    const { [currentQuestionId]: answer } = answers;
    const answerBody = answer?.answerBody ?? [];

    const continueButtonLoading =
      currentQuestion.loading || nextQuestionLoading || answer?.loading;

    const isNumericQuestion = currentQuestion.type === QuestionTypes.NUMBER;
    const isCurrencyQuestion = currentQuestion.type === QuestionTypes.CURRENCY;

    const isAnswered = () => {
      if (!answer) {
        return false;
      }

      if (!Array.isArray(answerBody) || !answerBody.length) {
        return false;
      }

      switch (type) {
        case QuestionTypes.PHONE: {
          const { confirmed, timezone } = answerBody[0]?.value ?? {};
          return confirmed && timezone;
        }
        case QuestionTypes.NUMBER: {
          const { value } = answerBody[0] ?? {};
          const numberOfDigits = `${value}` === 'NaN' ? 0 : `${value}`.length;
          if (minLength && maxLength)
            return numberOfDigits <= maxLength && numberOfDigits >= minLength;
          if (minLength) return numberOfDigits >= minLength;
          if (maxLength) return numberOfDigits <= maxLength;
          return true;
        }
        case QuestionTypes.CURRENCY: {
          const { value } = answerBody[0] ?? {};
          return value && !!value.match(/\d/);
        }
        default:
          return true;
      }
    };

    const isButtonDisabled = () =>
      (required || isNumericQuestion || isCurrencyQuestion) && !isAnswered();

    const sharedProps = {
      selectAnswer: selectAnswerProp,
      answerBody,
      formatMessage,
      saveAnswer,
      showError: toast.error,
      feedbackScreenSettings,
      setFeedbackSettings,
      isAnimationOngoing,
      isDesktop,
      isMobile,
      isPreview,
      previewMode,
      isMobilePreview,
      userSessionId: userSession?.id,
      disabled: continueButtonLoading,
      continueButtonLoading,
      dynamicElementsDirection,
    };

    const isLastScreen = currentQuestion.type === finishQuestion.id;

    const canSkipNarrator =
      narratorSkippable || !isAnimationOngoing || narratorBlocks.length === 0;

    const shouldRenderContinueButton =
      (isNullOrUndefined(proceedButton) || proceedButton) &&
      canSkipNarrator &&
      !NO_CONTINUE_BUTTON_QUESTIONS.includes(type);

    const backButtonDisabled =
      continueButtonLoading || isCatMhSession || isFirstScreen || isLastScreen;

    const backButtonDisabledMessage = () => {
      if (isCatMhSession) {
        return formatMessage(messages.backButtonDisabledCatMh);
      }
      if (isFirstScreen) {
        return formatMessage(messages.backButtonDisabledFirstScreen);
      }
      if (isLastScreen) {
        return formatMessage(messages.backButtonDisabledLastScreen);
      }
    };

    const onBackButtonClick = () => {
      if (userSessionId && currentQuestionId) {
        fetchPreviousQuestion(userSessionId, currentQuestionId);
      }
    };

    const narratorExtraSpace = CHARACTER_CONFIGS[character].size.height;

    return (
      <Row justify="center" width="100%">
        <AppContainer $width="100%">
          <Box
            lang={languageCode}
            width="100%"
            pt={extraSpaceForNarrator ? narratorExtraSpace : 0}
          >
            <CommonLayout
              currentQuestion={currentQuestion}
              isMobile={isMobile}
              shouldDisablePlayer={isAnimationOngoing}
              onVideoStart={setVideoStart}
              onVideoEnd={setVideoEnd}
              onVideoProgress={setVideoProgress}
            />

            <Row>{renderQuestionByType(currentQuestion, sharedProps)}</Row>
          </Box>

          {isNarratorPositionFixed && (
            <Row
              mt={isMobile ? 32 : 16}
              align={isMobile ? 'end' : 'center'}
              gap={16}
              dir={fixedElementsDirection}
            >
              <ScreenBackButton
                onClick={onBackButtonClick}
                disabled={backButtonDisabled}
                disabledMessage={backButtonDisabledMessage()}
              />
              <AnimationRefHelper
                currentQuestion={currentQuestion}
                currentQuestionId={currentQuestionId}
                previewMode={previewMode}
                changeIsAnimationOngoing={changeIsAnimationOngoing}
                setFeedbackSettings={setFeedbackSettings}
                feedbackScreenSettings={feedbackScreenSettings}
                audioInstance={audioInstance}
                dynamicElementsDirection={dynamicElementsDirection}
              >
                <ActionButtons
                  questionType={type}
                  questionRequired={required}
                  isCatMhSession={isCatMhSession}
                  skipQuestionButtonDisabled={continueButtonLoading}
                  onSkipQuestionClick={() => setSkipQuestionModalVisible(true)}
                  renderContinueButton={shouldRenderContinueButton}
                  continueButtonDisabled={isButtonDisabled()}
                  continueButtonLoading={continueButtonLoading}
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
            <Row align="center" gap={16} dir={fixedElementsDirection}>
              <ScreenBackButton
                onClick={onBackButtonClick}
                disabled={backButtonDisabled}
                disabledMessage={backButtonDisabledMessage()}
              />
              <ActionButtons
                questionType={type}
                questionRequired={required}
                isCatMhSession={isCatMhSession}
                skipQuestionButtonDisabled={continueButtonLoading}
                onSkipQuestionClick={() => setSkipQuestionModalVisible(true)}
                renderContinueButton={shouldRenderContinueButton}
                continueButtonDisabled={isButtonDisabled()}
                continueButtonLoading={continueButtonLoading}
                onContinueClick={onContinueButton}
              />
            </Row>
          )}

          {renderQuestionTranscript(false)}
        </AppContainer>
      </Row>
    );
  };

  const startInterventionAsync = async () => {
    await audioInstance.prepareAutoPlay();
    if (userSession && !isUserSessionFinished) {
      onStartSession();
      return;
    }
    if (isUserSessionFinished && isGuestUser) {
      // create new user session as a different guest user
      LocalStorageService.clearHeaders();
    }
    createUserSession(sessionId);
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
    if (isUserSessionFinished) {
      if (isGuestUser) return startButtonText();
      return formatMessage(messages.sessionFinished);
    }
    if (isNewUserSession || Boolean(index)) return startButtonText();

    return continueButtonText();
  };

  const resetTransitionalUserSessionId = () =>
    setTransitionalUserSessionId(null);

  const beforeQuickExit = () => {
    saveQuickExitEvent(userSessionId, isPreview);
  };

  const showLoader =
    (nextQuestionLoading || fetchPreviousQuestionLoading) &&
    interventionStarted;

  const showAutoStartLoader =
    shouldSkipWarning &&
    !interventionStarted &&
    (userSessionLoading || nextQuestionLoading || fetchInterventionLoading);

  const isFullSize =
    interventionStarted &&
    currentQuestion &&
    FULL_SIZE_QUESTIONS.includes(currentQuestion.type);

  const { multipleFillSessionAvailable, userInterventionId } =
    location.state ?? {};
  const showGoToDashboardButton =
    multipleFillSessionAvailable && userInterventionId;

  return (
    <Column
      height="100%"
      ref={pageRef}
      id={ANSWER_SESSION_PAGE_ID}
      maxHeight="100vh"
      background={isMobilePreview ? undefined : themeColors.sessionBackground}
    >
      {quickExitEnabled && (
        <QuickExit
          isMobilePreview={isMobilePreview}
          beforeQuickExit={beforeQuickExit}
        />
      )}

      <Column filled overflow="auto">
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
        {showAutoStartLoader && <Loader />}
        {!showLoader && !showAutoStartLoader && (
          <>
            <ConfirmationModal
              visible={skipQuestionModalVisible}
              onClose={() => setSkipQuestionModalVisible(false)}
              description={formatMessage(messages.skipQuestionModalHeader)}
              content={formatMessage(messages.skipQuestionModalMessage)}
              cancelButtonText={formatMessage(
                messages.skipQuestionModalCancelButtonText,
              )}
              confirmationButtonText={formatMessage(
                messages.skipQuestionModalConfirmationButtonText,
              )}
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
                  `confirmContinueModalMessage.${QuestionTypes.TLFB_EVENTS}`
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
                <title>
                  {formatMessage(messages.pageTitle, { isPreview })}
                </title>
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
                {!interventionStarted &&
                  !nextQuestionError &&
                  !shouldSkipWarning && (
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
                        {showGoToDashboardButton && (
                          <GoToDashboardButton
                            userInterventionId={userInterventionId}
                            isDesktop={isDesktop}
                          />
                        )}
                      </Row>
                      <Box
                        position="absolute"
                        bottom={isDesktop ? 48 : 90}
                        mx={24}
                      >
                        <H3 textAlign="center" color={themeColors.warning}>
                          {formatMessage(messages.wcagWarning)}
                        </H3>
                      </Box>
                    </Column>
                  )}
                {interventionStarted && !nextQuestionError && (
                  <>
                    <Box
                      id={ANSWER_SESSION_CONTAINER_ID}
                      position="relative"
                      height="100%"
                      maxHeight="100vh"
                      width="100%"
                      borderRadius="0px"
                      display="flex"
                      direction="column"
                    >
                      <Box
                        width="100%"
                        overflow={isMobilePreview ? 'auto' : undefined}
                        filled
                        display="flex"
                        direction="column"
                      >
                        <Row
                          padding={!isDesktop || isMobile ? 30 : 0}
                          pb={isDesktop || (!isDesktop && logoUrl) ? 24 : 0}
                          pt={
                            isMobile && extraSpaceForNarrator && !logoUrl
                              ? 0
                              : undefined
                          }
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
                          !transitionalUserSessionId && (
                            <ScreenWrapper isFullSize={isFullSize}>
                              {isNarratorPositionFixed && renderQuestion()}
                              {!isNarratorPositionFixed && (
                                <AnimationRefHelper
                                  currentQuestion={currentQuestion}
                                  currentQuestionId={currentQuestionId}
                                  previewMode={previewMode}
                                  changeIsAnimationOngoing={
                                    changeIsAnimationOngoing
                                  }
                                  setFeedbackSettings={setFeedbackSettings}
                                  feedbackScreenSettings={
                                    feedbackScreenSettings
                                  }
                                  audioInstance={audioInstance}
                                  dynamicElementsDirection={
                                    dynamicElementsDirection
                                  }
                                >
                                  {renderQuestion()}
                                </AnimationRefHelper>
                              )}
                            </ScreenWrapper>
                          )}

                        {answersError && (
                          <ErrorAlert errorText={answersError} />
                        )}
                      </Box>
                      {isMobilePreview && (
                        <AnswerSessionPageFooter
                          settings={{
                            showTextTranscript,
                            showTextReadingControls,
                          }}
                          isMobilePreview
                          isPreview={isPreview}
                        />
                      )}
                    </Box>
                  </>
                )}
              </AnswerOuterContainer>
            </Box>
          </>
        )}
      </Column>

      {!isMobilePreview && interventionStarted && !nextQuestionError && (
        <AnswerSessionPageFooter
          settings={{
            showTextTranscript,
            showTextReadingControls,
          }}
          isMobilePreview={false}
          isPreview={isPreview}
        />
      )}
    </Column>
  );
}

AnswerSessionPage.propTypes = {
  match: PropTypes.object,
  AnswerSessionPage: PropTypes.object,
  saveSelectedAnswer: PropTypes.func,
  saveVideoStats: PropTypes.func,
  submitAnswerRequest: PropTypes.func,
  onStartSession: PropTypes.func,
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  audioInstance: PropTypes.shape(AudioWrapper),
  isPreview: PropTypes.bool,
  interventionStatus: PropTypes.string,
  fetchedInterventionId: PropTypes.string,
  fetchInterventionLoading: PropTypes.bool,
  fetchIntervention: PropTypes.func,
  fetchUserSession: PropTypes.func,
  createUserSession: PropTypes.func,
  nextQuestion: PropTypes.func,
  clearErrors: PropTypes.func,
  setTransitionalUserSessionId: PropTypes.func,
  setLiveChatEnabled: PropTypes.func,
  saveQuickExitEvent: PropTypes.func,
  fetchPreviousQuestion: PropTypes.func,
  fixedElementsDirection: PropTypes.string,
  dynamicElementsDirection: PropTypes.string,
  changeLocale: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  AnswerSessionPage: makeSelectAnswerSessionPage(),
  audioInstance: makeSelectAudioInstance(),
  interventionStatus: makeSelectInterventionStatus(),
  fetchedInterventionId: makeSelectInterventionId(),
  fetchInterventionLoading: makeSelectInterventionLoader(
    'fetchInterventionLoading',
  ),
  fixedElementsDirection: makeSelectInterventionFixedElementsDirection(),
  dynamicElementsDirection: makeSelectInterventionDynamicElementsDirection(),
});

const mapDispatchToProps = {
  submitAnswerRequest: submitAnswer,
  saveSelectedAnswer: selectAnswer,
  saveVideoStats: selectVideoStats,
  onStartSession: startSession,
  changeIsAnimationOngoing: changeIsAnimating,
  setFeedbackSettings: setFeedbackScreenSettings,
  fetchIntervention: fetchInterventionRequest,
  fetchUserSession: fetchUserSessionRequest,
  createUserSession: createUserSessionRequest,
  nextQuestion: nextQuestionRequest,
  clearErrors: clearError,
  setTransitionalUserSessionId: setTransitionalUserSessionIdAction,
  setLiveChatEnabled: setChatEnabled,
  saveQuickExitEvent: saveQuickExitEventRequest,
  fetchPreviousQuestion: fetchPreviousQuestionRequest,
  changeLocale: changeLocaleAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AnswerSessionPage);
