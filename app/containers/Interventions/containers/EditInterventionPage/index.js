import React, { Fragment, useEffect, useState } from 'react';
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
import HoverableBox from 'components/Box/HoverableBox';
import Text from 'components/Text';
import Question from 'models/Intervention/Question';
import Loader from 'components/Loader';
import {
  getInterventionRequest,
  interventionReducer,
  getInterventionSaga,
  makeSelectInterventionLoaders,
} from 'global/reducers/intervention';
import useLockBodyScroll from 'utils/useLockBodyScroll';

import { borders, themeColors, colors } from 'theme';

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
import { instantiateEmptyQuestion } from './utils';

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
  useLockBodyScroll();
  const [typeChooserOpen, setTypeChooserOpen] = useState(false);
  useInjectReducer({ key: 'editInterventionPage', reducer });
  useInjectSaga({ key: 'editInterventionPage', saga });

  // refactored redux-saga
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

  useEffect(() => {
    getIntervention(params.interventionId);
    getQuestions(params.interventionId);
  }, []);

  const toggleTypeChooser = () => setTypeChooserOpen(!typeChooserOpen);

  const onCreateQuestion = type => {
    createQuestion(
      instantiateEmptyQuestion(
        formatMessage(messages.newQuestionMessage),
        type,
      ),
      params.interventionId,
    );
    toggleTypeChooser();
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
              <Row>
                <Box position="relative" width="100%">
                  <HoverableBox
                    px={21}
                    py={14}
                    onClick={toggleTypeChooser}
                    display="flex"
                    justify="center"
                    align="center"
                    border={`${borders.borderWidth} dashed ${
                      colors.greyishBlue
                    }`}
                    borderRadius={5}
                    height={80}
                    width="100%"
                  >
                    <Row align="center">
                      <Text fontWeight="bold" color={themeColors.secondary}>
                        {formatMessage(messages.addScreen)}
                      </Text>
                    </Row>
                  </HoverableBox>
                  <QuestionTypeChooser
                    visible={typeChooserOpen}
                    onClick={onCreateQuestion}
                  />
                </Box>
              </Row>
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
