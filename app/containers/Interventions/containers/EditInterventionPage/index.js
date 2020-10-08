import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Reorder, { reorder } from 'react-reorder';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import Row from 'components/Row';

import menu from 'assets/svg/triangle-back-black.svg';
import { borders, colors } from 'theme';
import Question from 'models/Intervention/Question';
import { localStateReducer } from 'global/reducers/localState';
import injectSaga, { useInjectSaga } from 'utils/injectSaga';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getInterventionRequest,
  interventionReducer,
  getInterventionSaga,
  makeSelectInterventionLoaders,
} from 'global/reducers/intervention';
import {
  getQuestionsRequest,
  reorderQuestionListRequest,
  createQuestionRequest,
  questionsReducer,
  getQuestionsSaga,
  makeSelectQuestions,
  makeSelectSelectedQuestionIndex,
  makeSelectLoader,
} from 'global/reducers/questions';
import {
  problemReducer,
  fetchProblemSaga,
  makeSelectProblemStatus,
} from 'global/reducers/problem';
import { canEdit } from 'models/Status/statusPermissions';

import editInterventionPageSaga from './saga';

import EmptyInterventionPage from '../../components/EmptyInterventionPage';
import QuestionDetails from '../../components/QuestionDetails';
import QuestionListItem from '../../components/QuestionListItem';
import QuestionSettings from '../../components/QuestionSettings';
import QuestionTypeChooser from '../../components/QuestionTypeChooser';

import messages from './messages';
import { useLockEditInterventionPageScroll } from './utils';
import { QuestionsRow, ShowListButton } from './styled';

function EditInterventionPage({
  intl: { formatMessage },
  questions,
  selectedQuestion,
  getIntervention,
  createQuestion,
  match: { params },
  getQuestions,
  reorderQuestions,
  getQuestionsLoading,
  problemStatus,
  interventionLoaders: { getIntervention: getInterventionLoader },
}) {
  useLockEditInterventionPageScroll();
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectReducer({ key: 'localState', reducer: localStateReducer });
  useInjectReducer({ key: 'problem', reducer: problemReducer });

  useInjectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });
  useInjectSaga({ key: 'getQuestions', saga: getQuestionsSaga });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

  const [showList, setShowList] = useState(false);

  const editingPossible = canEdit(problemStatus);

  const hoverListProps = {
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
  };

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
        formatMessage(messages.newQuestionTitle),
        type,
        formatMessage(messages.newQuestionSubtitle),
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

  const loading = getQuestionsLoading || getInterventionLoader;

  if (questions.length === 0 && !getQuestionsLoading)
    return (
      <EmptyInterventionPage
        disabled={!editingPossible}
        onCreateQuestion={onCreateQuestion}
        formatMessage={formatMessage}
      />
    );

  if (loading) return <Loader size={100} />;

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row height="100%" filled>
        <QuestionsRow sm={4} isVisible={showList}>
          <Box
            height="100%"
            borderRight={`${borders.borderWidth} ${borders.borderStyle} ${
              colors.linkWater
            }`}
            overflow="auto"
            bg={colors.white}
            {...hoverListProps}
          >
            <Box padded minWidth={410}>
              <Reorder
                disabled={!editingPossible}
                reorderId="question-list"
                onReorder={handleReorder}
              >
                {questions.map((question, index) => (
                  <Row key={question.id}>
                    <QuestionListItem
                      disabled={!editingPossible}
                      index={index}
                      selectedQuestionIndex={selectedQuestion}
                      questions={questions}
                      question={question}
                      interventionId={params.interventionId}
                    />
                  </Row>
                ))}
              </Reorder>
              {editingPossible && (
                <QuestionTypeChooser onClick={onCreateQuestion} />
              )}
              <Row />
            </Box>
          </Box>
          <ShowListButton className="show-list-button" {...hoverListProps}>
            <Icon src={menu} alt="questions-list" />
          </ShowListButton>
        </QuestionsRow>
        <Column align="between">
          <Row overflow="hidden" filled>
            <QuestionDetails />
            <QuestionSettings />
          </Row>
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
  getQuestionsLoading: PropTypes.bool,
  interventionLoaders: PropTypes.object,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestionIndex(),
  getQuestionsLoading: makeSelectLoader('getQuestionsLoading'),
  interventionLoaders: makeSelectInterventionLoaders(),
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  getIntervention: getInterventionRequest,
  getQuestions: getQuestionsRequest,
  createQuestion: createQuestionRequest,
  reorderQuestions: reorderQuestionListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'editInterventionPage',
  saga: editInterventionPageSaga,
});

export default injectIntl(
  compose(
    withConnect,
    withSaga,
  )(EditInterventionPage),
);
