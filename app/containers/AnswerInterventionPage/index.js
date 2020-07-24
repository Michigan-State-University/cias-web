/**
 *
 * AnswerInterventionPage
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';

import { useInjectSaga } from 'utils/injectSaga';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { useInjectReducer } from 'utils/injectReducer';
import ErrorAlert from 'components/ErrorAlert';
import { Button } from 'components/Button';
import Row from 'components/Row';
import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import Img from 'components/Img';

import {
  QuestionActions,
  BackButton,
  AnswerInterventionContent,
  Player,
  PlayerWrapper,
  ImageWrapper,
  AnswerOuterContainer,
} from './styled';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
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
  answerInterventionPage: {
    interventionQuestions,
    questionError,
    questionLoading,
    answersError,
    answers,
    questionIndex,
    interventionStarted,
  },
}) {
  useInjectReducer({ key: 'answerInterventionPage', reducer });
  useInjectSaga({ key: 'answerInterventionPage', saga });

  const currentQuestion = interventionQuestions
    ? interventionQuestions[questionIndex]
    : null;

  const currentQuestionId = currentQuestion ? currentQuestion.id : null;
  const animationParentRef = useRef();
  useEffect(() => {
    fetchQuestionsAction(params.id);
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
      title,
      subtitle,
      video_url: videoUrl,
      image_url: imageUrl,
      settings: {
        title: settingsTitle,
        subtitle: settingsSubtitle,
        video: settingsVideo,
        image: settingsImage,
        proceed_button: proceedButton,
      },
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

    const sharedProps = {
      selectAnswer: selectAnswerProp,
      answerBody,
      formatMessage,
      questionIndex,
      saveAnswer,
    };
    return (
      <Row justify="center" filled>
        <Column mx={50} justify="center">
          {questionIndex !== 0 &&
            (currentQuestion && (
              <Row width="100%" mt={10}>
                <BackButton
                  onClick={() => {
                    if (answers[currentQuestionId]) {
                      saveAnswer(questionIndex - 1);
                    } else {
                      setQuestion(questionIndex - 1);
                    }
                  }}
                >
                  <FormattedMessage {...messages.previousQuestion} />
                </BackButton>
              </Row>
            ))}
          <Box>
            <Row>
              {settingsTitle && (
                <Box
                  padding={26}
                  width="100%"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
            </Row>
            <Row>
              {settingsSubtitle && (
                <Box
                  padding={26}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              )}
            </Row>
            <Row mt={10}>
              {settingsVideo && videoUrl && (
                <PlayerWrapper>
                  <Player url={videoUrl} controls width="100%" height="100%" />
                </PlayerWrapper>
              )}
            </Row>
            <Row>
              {settingsImage && imageUrl && (
                <ImageWrapper>
                  <Img src={imageUrl} alt="image" height="100%" width="100%" />
                </ImageWrapper>
              )}
            </Row>
          </Box>
          <Row pl={26}>
            {renderQuestionByType(currentQuestion, sharedProps)}
          </Row>
          {(isNullOrUndefined(proceedButton) || proceedButton) && (
            <Row width="100%">
              <QuestionActions>
                <Button
                  my={20}
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
              </QuestionActions>
            </Row>
          )}
        </Column>
      </Row>
    );
  };

  const renderPage = () => (
    <>
      {currentQuestion && interventionStarted && (
        <AnswerInterventionContent>
          {renderQuestion()}
          <CharacterAnim
            animationContainer={animationParentRef}
            blocks={currentQuestion.narrator.blocks}
            questionId={currentQuestionId}
            settings={currentQuestion.narrator.settings}
          />
        </AnswerInterventionContent>
      )}
    </>
  );

  return (
    <AnswerOuterContainer flexDirection="column">
      <Helmet>
        <title>Answer Intervention</title>
        <meta name="description" content="Answer Intervention" />
      </Helmet>
      {interventionStarted && (
        <Box>
          {questionError && <ErrorAlert errorText={questionError} />}
          {answersError && <ErrorAlert errorText={answersError} />}
          {questionLoading && <Loader />}
          {!currentQuestion && (
            <FormattedMessage {...messages.completeIntervention} />
          )}
        </Box>
      )}
      {!interventionStarted && (
        <Button
          mt={16}
          onClick={onStartIntervention}
          title={formatMessage(messages.startIntervention)}
          width="40%"
        />
      )}
      <AnswerInterventionContent ref={animationParentRef}>
        {renderPage()}
      </AnswerInterventionContent>
    </AnswerOuterContainer>
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
