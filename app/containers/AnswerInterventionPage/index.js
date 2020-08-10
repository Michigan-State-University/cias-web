/**
 *
 * AnswerInterventionPage
 *
 */

import React, { memo, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { error } from 'react-toastify-redux';
import get from 'lodash/get';
import filter from 'lodash/filter';

import { speechType } from 'models/Narrator/BlockTypes';
import { useInjectSaga } from 'utils/injectSaga';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { useInjectReducer } from 'utils/injectReducer';
import ErrorAlert from 'components/ErrorAlert';
import { Button } from 'components/Button';
import Row from 'components/Row';
import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import { DESKTOP_MODE } from 'utils/previewMode';

import { instantiateBlockForType } from 'models/Intervention/utils';

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
} from './actions';

export function AnswerInterventionPage({
  match: { params },
  intl: { formatMessage },
  fetchQuestionsAction,
  saveSelectedAnswer,
  submitAnswerRequest,
  setQuestionIndexAction,
  onStartIntervention,
  showError,
  answerInterventionPage: {
    interventionQuestions,
    questionError,
    questionLoading,
    answersError,
    answers,
    questionIndex,
    interventionStarted,
    previewMode,
  },
}) {
  useInjectReducer({ key: 'answerInterventionPage', reducer });
  useInjectSaga({ key: 'answerInterventionPage', saga });

  const hasSpeechBlocks = question =>
    filter(question.narrator.blocks, ({ type }) => type === speechType)
      .length !== 0;

  const assignCurrentQuestion = () => {
    const question = interventionQuestions[questionIndex];

    if (!question) return null;

    if (hasSpeechBlocks(question)) return question;

    const { narrator } = question;
    return {
      ...question,
      narrator: {
        ...narrator,
        blocks: [
          {
            ...instantiateBlockForType(speechType, { x: 0, y: 0 }),
            ...narrator.from_question[0],
          },
          ...narrator.blocks,
        ],
      },
    };
  };

  const currentQuestion = interventionQuestions
    ? assignCurrentQuestion()
    : null;

  const currentQuestionId = currentQuestion ? currentQuestion.id : null;
  const animationParentRef = useRef();

  const { interventionId, index } = params;

  useEffect(() => {
    fetchQuestionsAction(interventionId);
    if (index) {
      setQuestionIndexAction(parseInt(index, 10));
      onStartIntervention();
    }
  }, []);

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
      showError,
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
        <Column mx={50} justify="center">
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
          {(isNullOrUndefined(proceedButton) || proceedButton) && (
            <Row width="100%">
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
        </Column>
      </Row>
    );
  };

  const renderPage = () => (
    <>
      <Fragment>
        {renderQuestion()}
        <CharacterAnim
          animationContainer={animationParentRef.current}
          blocks={currentQuestion.narrator.blocks}
          questionId={currentQuestionId}
          settings={currentQuestion.narrator.settings}
          previewMode={previewMode}
        />
      </Fragment>
    </>
  );

  const isDesktop = previewMode === DESKTOP_MODE;

  return (
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
        {!index && !interventionStarted && (
          <StyledButton
            onClick={onStartIntervention}
            title={formatMessage(messages.startIntervention)}
            isDesktop={isDesktop}
          />
        )}
        {interventionStarted && (
          <Fragment>
            <Box width="100%">
              {!questionLoading && currentQuestion && (
                <AnswerInterventionContent ref={animationParentRef}>
                  {renderPage()}
                </AnswerInterventionContent>
              )}
            </Box>
            {questionError && <ErrorAlert errorText={questionError} />}
            {answersError && <ErrorAlert errorText={answersError} />}
            {questionLoading && <Loader />}
            {!questionLoading && !currentQuestion && (
              <Box mt={50}>
                <FormattedMessage {...messages.completeIntervention} />
              </Box>
            )}
          </Fragment>
        )}
      </AnswerOuterContainer>
    </Box>
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
  showError: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  answerInterventionPage: makeSelectAnswerInterventionPage(),
});

const mapDispatchToProps = {
  fetchQuestionsAction: fetchQuestions,
  submitAnswerRequest: submitAnswer,
  saveSelectedAnswer: selectAnswer,
  setQuestionIndexAction: setQuestionIndex,
  onStartIntervention: startIntervention,
  showError: error,
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
