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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import { Button } from 'components/Button';
import Img from 'components/Img';

import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import makeSelectAnswerInterventionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  AnswerInterventionContainer,
  AnswerContent,
  QuestionActions,
  QuestionTitle,
  BackButton,
  AnswerInterventionContent,
  QuestionSubtitle,
  Player,
  PlayerWrapper,
  ImageWrapper,
} from './styled';
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
    submitAnswerRequest(currentQuestionId, nextQuestionIndex);

  const setQuestion = question => setQuestionIndexAction(question);

  const renderQuestion = () => {
    const {
      title,
      subtitle,
      video_url: videoUrl,
      image_url: imageUrl,
      type,
      settings: {
        title: settingsTitle,
        subtitle: settingsSubtitle,
        video: settingsVideo,
        image: settingsImage,
      },
    } = currentQuestion;
    const selectAnswerProp = answerBody => {
      saveSelectedAnswer({
        id: currentQuestionId,
        type,
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
    };
    return (
      <>
        {settingsSubtitle && (
          <QuestionTitle dangerouslySetInnerHTML={{ __html: title }} />
        )}
        {settingsTitle && (
          <QuestionSubtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
        {settingsVideo && videoUrl && (
          <PlayerWrapper>
            <Player url={videoUrl} controls width="100%" height="100%" />
          </PlayerWrapper>
        )}
        {settingsImage && imageUrl && (
          <ImageWrapper>
            <Img src={imageUrl} alt="image" height="100%" width="100%" />
          </ImageWrapper>
        )}
        {renderQuestionByType(currentQuestion, sharedProps)}
      </>
    );
  };

  const renderPage = () => {
    if (interventionStarted)
      return (
        <>
          {currentQuestion && (
            <CharacterAnim
              animationContainer={animationParentRef}
              blocks={currentQuestion.narrator.blocks}
              questionId={currentQuestionId}
              settings={currentQuestion.narrator.settings}
            />
          )}
          <AnswerContent>
            {questionIndex !== 0 &&
              (currentQuestion && (
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
              ))}
            {questionError && <ErrorAlert errorText={questionError} />}
            {questionLoading && <Spinner />}
            {currentQuestion && (
              <>
                {renderQuestion()}
                <QuestionActions>
                  <Button
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
              </>
            )}
            {!currentQuestion && <div> thanks for completing intervention</div>}
            {answersError && <ErrorAlert errorText={answersError} />}
          </AnswerContent>
        </>
      );

    return (
      <AnswerContent>
        <Button
          onClick={onStartIntervention}
          title={formatMessage(messages.startIntervention)}
        />
      </AnswerContent>
    );
  };

  return (
    <AnswerInterventionContainer>
      <AnswerInterventionContent ref={animationParentRef}>
        <Helmet>
          <title>Answer Intervention</title>
          <meta name="description" content="Answer Intervention" />
        </Helmet>
        {renderPage()}
      </AnswerInterventionContent>
    </AnswerInterventionContainer>
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
