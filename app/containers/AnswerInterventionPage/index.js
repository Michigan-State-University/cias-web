/**
 *
 * AnswerInterventionPage
 *
 */

import React, { memo, useEffect } from 'react';
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
import { blockTypes } from 'models/Narrator/BlockTypes';
import makeSelectAnswerInterventionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import renderQuestionByType from './components';
import CharacterAnim from './components/CharacterAnim';
import {
  AnswerInterventionContainer,
  AnswerContent,
  QuestionActions,
  QuestionTitle,
  BackButton,
} from './styled';
import {
  fetchQuestions,
  submitAnswer,
  selectAnswer,
  setQuestionIndex,
} from './actions';

export function AnswerInterventionPage({
  match: { params },
  intl: { formatMessage },
  fetchQuestionsAction,
  saveSelectedAnswer,
  submitAnswerRequest,
  setQuestionIndexAction,
  answerInterventionPage: {
    interventionQuestions,
    questionError,
    questionLoading,
    answersError,
    answers,
    questionIndex,
  },
}) {
  useInjectReducer({ key: 'answerInterventionPage', reducer });
  useInjectSaga({ key: 'answerInterventionPage', saga });
  const currentQuestion = interventionQuestions
    ? interventionQuestions[questionIndex]
    : null;

  const currentQuestionId = currentQuestion ? currentQuestion.id : null;

  useEffect(() => {
    fetchQuestionsAction(params.id);
  }, []);

  const saveAnswer = () => submitAnswerRequest(currentQuestionId);

  const renderQuestion = () => {
    const { title, type } = currentQuestion;
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
    };
    return (
      <>
        <QuestionTitle dangerouslySetInnerHTML={{ __html: title }} />
        {renderQuestionByType(currentQuestion, sharedProps)}
      </>
    );
  };

  return (
    <AnswerInterventionContainer>
      {currentQuestion && currentQuestion.narrator.settings.animation && (
        <CharacterAnim
          blocks={currentQuestion.narrator.blocks.filter(
            block => block.type === blockTypes[1],
          )}
          quesitonId={currentQuestionId}
        />
      )}
      <Helmet>
        <title>Answer Intervention</title>
        <meta name="description" content="Answer Intervention" />
      </Helmet>
      <AnswerContent>
        {questionIndex !== 0 && (
          <BackButton onClick={() => setQuestionIndexAction(questionIndex - 1)}>
            <FormattedMessage {...messages.previousQuestion} />
          </BackButton>
        )}
        {questionError && <ErrorAlert errorText={questionError} />}
        {questionLoading && <Spinner />}
        {currentQuestion && (
          <>
            {renderQuestion()}
            <QuestionActions>
              <Button
                loading={currentQuestion.loading}
                onClick={saveAnswer}
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
