import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Reorder, { reorder } from 'react-reorder';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import xor from 'lodash/xor';

import SelectResearchers from 'containers/SelectResearchers';
import Box from 'components/Box';
import Column from 'components/Column';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Img from 'components/Img';
import ActionIcon from 'components/ActionIcon';
import Text from 'components/Text';
import Modal from 'components/Modal';

import menu from 'assets/svg/triangle-back-black.svg';
import cog from 'assets/svg/gear-selected.svg';
import copy from 'assets/svg/copy.svg';
import copyActive from 'assets/svg/copy-active.svg';
import bin from 'assets/svg/bin-no-bg.svg';
import binActive from 'assets/svg/bin-active.svg';
import share from 'assets/svg/file-share.svg';
import shareActive from 'assets/svg/file-share-active.svg';
import group from 'assets/svg/group.svg';
import groupActive from 'assets/svg/group-active.svg';

import Question from 'models/Intervention/Question';
import { borders, colors, themeColors } from 'theme';

import injectSaga, { useInjectSaga } from 'utils/injectSaga';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import { useInjectReducer } from 'utils/injectReducer';

import { localStateReducer } from 'global/reducers/localState';
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
  copyQuestionsRequest,
  deleteQuestionsRequest,
  groupQuestionsRequest,
  shareQuestionsToResearchersRequest,
} from 'global/reducers/questions';
import {
  problemReducer,
  fetchProblemSaga,
  makeSelectProblemStatus,
} from 'global/reducers/problem';
import { canEdit } from 'models/Status/statusPermissions';

import GroupActionButton from 'containers/Interventions/components/GroupActionButton';
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
  copyQuestions,
  deleteQuestions,
  groupQuestions,
  shareQuestionsToResearchers,
}) {
  const [manage, setManage] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState([]);
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const groupActions = [
    {
      label: <FormattedMessage {...messages.duplicate} />,
      inactiveIcon: copy,
      activeIcon: copyActive,
      action: () => copyQuestions(selectedSlides),
    },
    {
      label: <FormattedMessage {...messages.shareCopy} />,
      inactiveIcon: share,
      activeIcon: shareActive,
      action: () => setModalVisible(true),
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      inactiveIcon: bin,
      activeIcon: binActive,
      action: () => deleteQuestions(selectedSlides),
    },
    {
      label: <FormattedMessage {...messages.group} />,
      inactiveIcon: group,
      activeIcon: groupActive,
      action: () => groupQuestions(selectedSlides),
    },
  ];

  useLockEditInterventionPageScroll();
  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectReducer({ key: 'localState', reducer: localStateReducer });
  useInjectReducer({ key: 'problem', reducer: problemReducer });

  useInjectSaga({ key: 'fetchProblem', saga: fetchProblemSaga });
  useInjectSaga({ key: 'getQuestions', saga: getQuestionsSaga });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

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

  const active = selectedSlides.length !== 0;
  const mapActions = (action, index) => (
    <GroupActionButton active={active} {...action} key={index} />
  );

  const sendSlidesToResearchers = researchers =>
    shareQuestionsToResearchers(researchers, selectedSlides);

  if (questions.length === 0 && !getQuestionsLoading)
    return (
      <EmptyInterventionPage
        disabled={!editingPossible}
        onCreateQuestion={onCreateQuestion}
        formatMessage={formatMessage}
      />
    );

  if (loading) return <Loader size={100} />;

  const selectSlide = slideId =>
    setSelectedSlides(xor(selectedSlides, [slideId]));

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Modal
        title={formatMessage(messages.modalTitle)}
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <SelectResearchers
          onClose={() => setModalVisible(false)}
          onResearchersSelected={sendSlidesToResearchers}
        />
      </Modal>
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
            <Box width="100%" padded minWidth={350}>
              {!manage && (
                <Row
                  onClick={() => setManage(true)}
                  clickable
                  align="center"
                  mb={10}
                >
                  <Img src={cog} alt="manage" />
                  <Text ml={10} fontWeight="bold" color={themeColors.secondary}>
                    <FormattedMessage {...messages.manageSlides} />
                  </Text>
                </Row>
              )}
              {manage && (
                <Row mb={10} justify="between">
                  <Row>{groupActions.map(mapActions)}</Row>
                  <ActionIcon mr="0" onClick={() => setManage(false)} />
                </Row>
              )}
              <Reorder reorderId="question-list" onReorder={handleReorder}>
                {questions.map((question, index) => (
                  <Row key={question.id}>
                    <QuestionListItem
                      disabled={!editingPossible}
                      selectSlide={selectSlide}
                      checked={selectedSlides.includes(question.id)}
                      manage={manage}
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
  copyQuestions: PropTypes.func,
  deleteQuestions: PropTypes.func,
  groupQuestions: PropTypes.func,
  shareQuestionsToResearchers: PropTypes.func,
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
  copyQuestions: copyQuestionsRequest,
  deleteQuestions: deleteQuestionsRequest,
  groupQuestions: groupQuestionsRequest,
  shareQuestionsToResearchers: shareQuestionsToResearchersRequest,
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
