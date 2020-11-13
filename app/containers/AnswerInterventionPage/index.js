/**
 *
 * AnswerInterventionPage
 *
 */

import React, { memo, useEffect, useRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
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
  fetchProblemRequest,
  fetchProblemSaga,
  makeSelectProblemStatus,
  problemReducer,
} from 'global/reducers/problem';
import { canPreview } from 'models/Status/statusPermissions';
import {
  BackButton,
  AnswerInterventionContent,
  AnswerOuterContainer,
  StyledButton,
} from './styled';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import CommonLayout from './layouts/CommonLayout';
import makeSelectAnswerInterventionPage from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  fetchQuestions,
  submitAnswer,
  selectAnswer,
  setQuestionIndex,
  startIntervention,
  changeIsAnimating,
  setFeedbackScreenSettings,
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

export function AnswerInterventionPage({
  match: { params },
  intl: { formatMessage },
  fetchQuestionsAction,
  saveSelectedAnswer,
  submitAnswerRequest,
  setQuestionIndexAction,
  onStartIntervention,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  audioInstance,
  answerInterventionPage: {
    interventionQuestions,
    questionError,
    questionLoading,
    answersError,
    answers,
    questionIndex,
    interventionStarted,
    previewMode,
    isAnimationOngoing,
    feedbackScreenSettings,
  },
  isPreview,
  problemStatus,
  fetchProblem,
}) {
  useInjectReducer({ key: 'problem', reducer: problemReducer });
  useInjectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });
  useInjectReducer({ key: 'answerInterventionPage', reducer });
  useInjectSaga({ key: 'answerInterventionPage', saga });
  const { interventionId, index, problemId } = params;

  useEffect(() => {
    if (isPreview) fetchProblem(problemId);
  }, [problemId]);

  const previewPossible = !(isPreview && !canPreview(problemStatus));

  useEffect(() => {
    fetchQuestionsAction(interventionId);
  }, []);

  useEffect(() => {
    if (interventionQuestions.length !== 0) {
      const startQuestionIndex = !index
        ? 0
        : interventionQuestions.findIndex(({ id }) => id === index);
      setQuestionIndexAction(startQuestionIndex);
    }
  }, [interventionQuestions.length]);

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

  const assignCurrentQuestion = () => {
    const question = interventionQuestions[questionIndex];

    if (!question) return null;

    return question;
  };

  const currentQuestion = interventionQuestions
    ? assignCurrentQuestion()
    : null;

  const currentQuestionId = currentQuestion ? currentQuestion.id : null;

  const saveAnswer = nextQuestionIndex =>
    submitAnswerRequest(
      currentQuestionId,
      nextQuestionIndex,
      get(currentQuestion, 'settings.required', false),
      get(currentQuestion, 'type', ''),
    );

  const setQuestion = question => setQuestionIndexAction(question);

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
    };
    const handleBackClick = () => {
      if (answers[currentQuestionId]) {
        saveAnswer(questionIndex - 1);
      } else {
        setQuestion(questionIndex - 1);
      }
    };

    return (
      <Row justify="center" width="100%">
        <AppContainer $width="100%">
          <Row width="100%" mt={5} height={30}>
            {questionIndex !== 0 && currentQuestion && (
              <BackButton onClick={handleBackClick}>
                <FormattedMessage {...messages.previousQuestion} />
              </BackButton>
            )}
          </Row>
          <CommonLayout currentQuestion={currentQuestion} />
          <Row mt={10}>
            {renderQuestionByType(currentQuestion, sharedProps)}
          </Row>
          {(isNullOrUndefined(proceedButton) || proceedButton) &&
            !isAnimationOngoing && (
              <Row width="100%" my={20}>
                <Button
                  disabled={isButtonDisabled()}
                  margin={20}
                  width="180px"
                  loading={currentQuestion.loading}
                  onClick={() => {
                    saveAnswer(questionIndex + 1);
                  }}
                  title={formatMessage(
                    questionIndex !== interventionQuestions.length - 1
                      ? messages.nextQuestion
                      : messages.submitAnswer,
                  )}
                />
              </Row>
            )}
        </AppContainer>
      </Row>
    );
  };

  const startInterventionAsync = async () => {
    await audioInstance.prepareAutoPlay();

    onStartIntervention();
  };

  const startButtonText = () => {
    if (previewPossible || isNullOrUndefined(previewPossible))
      return isPreview
        ? formatMessage(messages.startPreview)
        : formatMessage(messages.startSession);
    return formatMessage(messages.previewDisabled);
  };

  const renderPage = () => <Fragment>{renderQuestion()}</Fragment>;

  if (questionLoading) return <Loader />;

  const isDesktop = previewMode === DESKTOP_MODE;
  return (
    <Column height="100%">
      {interventionStarted && (
        <Row justify="end" padding={30}>
          <MSULogo />
        </Row>
      )}
      <Box
        display="flex"
        align="center"
        justify="center"
        height="100%"
        width="100%"
      >
        <Helmet>
          <title>Answer Intervention</title>
          <meta name="description" content="Answer Intervention" />
        </Helmet>
        <AnswerOuterContainer
          previewMode={previewMode}
          interventionStarted={interventionStarted}
        >
          {!interventionStarted && (
            <StyledButton
              disabled={!previewPossible}
              onClick={startInterventionAsync}
              title={startButtonText()}
              isDesktop={isDesktop}
            />
          )}
          {interventionStarted && (
            <Fragment>
              <Box width="100%">
                {!questionLoading && currentQuestion && interventionStarted && (
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
              {!questionLoading && !currentQuestion && (
                <Box mt={50}>
                  <FormattedMessage {...messages.completeIntervention} />
                </Box>
              )}
            </Fragment>
          )}
        </AnswerOuterContainer>
      </Box>
    </Column>
  );
}

AnswerInterventionPage.propTypes = {
  match: PropTypes.object,
  intl: PropTypes.object,
  answerInterventionPage: PropTypes.object,
  saveSelectedAnswer: PropTypes.func,
  fetchQuestionsAction: PropTypes.func,
  submitAnswerRequest: PropTypes.func,
  onStartIntervention: PropTypes.func,
  setQuestionIndexAction: PropTypes.func,
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  audioInstance: PropTypes.shape(AudioWrapper),
  isPreview: PropTypes.bool,
  problemStatus: PropTypes.string,
  fetchProblem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  answerInterventionPage: makeSelectAnswerInterventionPage(),
  audioInstance: makeSelectAudioInstance(),
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  fetchQuestionsAction: fetchQuestions,
  submitAnswerRequest: submitAnswer,
  saveSelectedAnswer: selectAnswer,
  setQuestionIndexAction: index => setQuestionIndex({ index }),
  onStartIntervention: startIntervention,
  changeIsAnimationOngoing: changeIsAnimating,
  setFeedbackSettings: setFeedbackScreenSettings,
  fetchProblem: fetchProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const AnswerInterventionPageWithIntl = injectIntl(
  AnswerInterventionPage,
);

export default compose(
  withConnect,
  memo,
)(AnswerInterventionPageWithIntl);
