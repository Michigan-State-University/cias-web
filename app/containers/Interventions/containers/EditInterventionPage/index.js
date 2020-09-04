import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Reorder, { reorder } from 'react-reorder';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import Loader from 'components/Loader';
import {
  getInterventionRequest,
  interventionReducer,
  getInterventionSaga,
  makeSelectInterventionLoaders,
} from 'global/reducers/intervention';

import { borders, colors } from 'theme';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectLoaders,
} from './selectors';
import {
  createQuestionRequest,
  getQuestionsRequest,
  reorderQuestionList,
} from './actions';

import QuestionTypeChooser from '../../components/QuestionTypeChooser';
import QuestionListItem from '../../components/QuestionListItem';
import QuestionDetails from '../../components/QuestionDetails';
import QuestionSettings from '../../components/QuestionSettings';
import EmptyInterventionPage from '../../components/EmptyInterventionPage';
import {
  instantiateEmptyQuestion,
  useLockEditInterventionPageScroll,
} from './utils';

function EditInterventionPage({
  intl: { formatMessage },
  questions,
  selectedQuestion,
  getIntervention,
  createQuestion,
  match: { params },
  getQuestions,
  reorderQuestions,
  loaders: { questionListLoading },
  interventionLoaders: { getIntervention: getInterventionLoader },
}) {
  useLockEditInterventionPageScroll();
  useInjectReducer({ key: 'editInterventionPage', reducer });
  useInjectSaga({ key: 'editInterventionPage', saga });

  // refactored redux-saga
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

  useEffect(() => {
    getIntervention({
      interventionId: params.interventionId,
      problemId: params.problemId,
    });
    getQuestions(params.interventionId);
  }, []);

  const onCreateQuestion = type => {
    createQuestion(
      instantiateEmptyQuestion(
        formatMessage(messages.newQuestionMessage),
        type,
      ),
      params.interventionId,
    );
  };

  const handleReorder = (event, previousIndex, nextIndex) => {
    const newList = reorder(questions, previousIndex, nextIndex);
    let position = 0;
    const orderdedNewList = newList.map(question => {
      position += 1;
      return {
        ...question,
        position,
      };
    });

    reorderQuestions({
      reorderedList: orderdedNewList,
      interventionId: params.interventionId,
    });
  };

  if (questions.length === 0 && !questionListLoading)
    return (
      <EmptyInterventionPage
        onCreateQuestion={onCreateQuestion}
        formatMessage={formatMessage}
      />
    );

  const loading = questionListLoading || getInterventionLoader;
  const renderList = () => {
    if (loading) return <Loader type="inline" width={4} />;

    return (
      <Reorder reorderId="question-list" onReorder={handleReorder}>
        {questions.map((question, index) => (
          <Row key={question.id}>
            <QuestionListItem
              index={index}
              selectedQuestionIndex={selectedQuestion}
              questionsLength={questions.length}
              question={question}
              interventionId={params.interventionId}
            />
          </Row>
        ))}
      </Reorder>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row height="100%" filled>
        <Column sm={4}>
          <Box
            height="100%"
            borderRight={`${borders.borderWidth} ${borders.borderStyle} ${
              colors.linkWater
            }`}
            overflow="auto"
            padded
          >
            <Box width="100%" padded>
              {renderList()}
              <QuestionTypeChooser onClick={onCreateQuestion} />
              <Row />
            </Box>
          </Box>
        </Column>
        <Column sm={8} id="quill_boundaries">
          <Loader hidden={!loading} type="inline" size={100} />
          {!loading && (
            <Row overflow="hidden" filled>
              <QuestionDetails />
              <QuestionSettings />
            </Row>
          )}
        </Column>
      </Row>
    </Fragment>
  );
}

EditInterventionPage.propTypes = {
  intl: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.number.isRequired,
  match: PropTypes.object,
  getIntervention: PropTypes.func,
  createQuestion: PropTypes.func,
  getQuestions: PropTypes.func,
  reorderQuestions: PropTypes.func,
  loaders: PropTypes.object,
  interventionLoaders: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestionIndex(),
  loaders: makeSelectLoaders(),
  interventionLoaders: makeSelectInterventionLoaders(),
});

const mapDispatchToProps = {
  getIntervention: getInterventionRequest,
  getQuestions: getQuestionsRequest,
  createQuestion: createQuestionRequest,
  reorderQuestions: reorderQuestionList,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(EditInterventionPage));
