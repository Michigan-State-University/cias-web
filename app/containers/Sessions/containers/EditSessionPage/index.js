import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from 'react';
import { injectSaga, injectReducer } from 'redux-injectors';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import xor from 'lodash/xor';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import flow from 'lodash/flow';
import intersection from 'lodash/intersection';

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
import TextButton from 'components/Button/TextButton';

import menu from 'assets/svg/triangle-back-black.svg';
import cog from 'assets/svg/gear-selected.svg';
import copy from 'assets/svg/copy.svg';
import copyActive from 'assets/svg/copy-active.svg';
import bin from 'assets/svg/bin-no-bg.svg';
import binActive from 'assets/svg/bin-active.svg';
import share from 'assets/svg/file-share.svg';
import shareActive from 'assets/svg/file-share-active.svg';
import groupIcon from 'assets/svg/group.svg';
import groupIconActive from 'assets/svg/group-active.svg';

import Question from 'models/Session/Question';
import { borders, colors, themeColors } from 'theme';

import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { localStateReducer } from 'global/reducers/localState';
import {
  getSessionRequest,
  sessionReducer,
  getSessionSaga,
  makeSelectSessionLoaders,
  makeSelectSession,
} from 'global/reducers/session';
import {
  createQuestionRequest,
  questionsReducer,
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
  reorderQuestionListRequest,
  makeSelectLoader,
  deleteQuestionsRequest,
} from 'global/reducers/questions';
import {
  reorderGroupListRequest,
  reorderQuestionGroupsSaga,
  copyQuestionsRequest,
  groupQuestionsRequest,
  shareQuestionsToResearchersRequest,
  makeSelectQuestionGroups,
  changeGroupNameRequest,
  questionGroupsReducer,
  getQuestionGroupsRequest,
  getQuestionGroupsSaga,
} from 'global/reducers/questionGroups';
import {
  interventionReducer,
  fetchInterventionSaga,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';
import {
  fetchInterventionsSaga,
  interventionsReducer,
  fetchInterventionsRequest,
} from 'global/reducers/interventions';
import {
  copyModalReducer,
  allCopyModalSagas,
} from 'global/reducers/copyModalReducer';

import { canEdit } from 'models/Status/statusPermissions';

import GroupActionButton from 'containers/Sessions/components/GroupActionButton';
import { reorderScope } from 'models/Session/ReorderScope';
import { FinishGroupType } from 'models/Session/GroupTypes';
import {
  fetchReportTemplatesRequest,
  reportTemplatesReducer,
  reportTemplatesSaga,
} from 'global/reducers/reportTemplates';
import editInterventionPageSaga from './saga';

import QuestionDetails from '../../components/QuestionDetails';
import QuestionSettings from '../../components/QuestionSettings';
import QuestionTypeChooser from '../../components/QuestionTypeChooser';

import messages from './messages';
import { EditSessionPageContext, useLockEditSessionPageScroll } from './utils';
import {
  QuestionsRow,
  ShowListButton,
  StyledQuestionTypeChooser,
  Spacer,
} from './styled';
import QuestionListGroup from '../QuestionListGroup';

function EditSessionPage({
  questions,
  selectedQuestion,
  getSession,
  createQuestion,
  match: { params },
  reorderQuestions,
  reorderGroups,
  interventionStatus,
  sessionLoaders: { getSession: getSessionLoader },
  copyQuestions,
  deleteQuestions,
  groupQuestions,
  shareQuestionsToResearchers,
  groups,
  changeGroupName,
  getQuestionGroups,
  session: { id: sessionId, name: sessionName },
  fetchInterventions,
  fetchReportTemplates,
}) {
  const { formatMessage } = useIntl();

  const [manage, setManage] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState([]);
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDuringQuestionReorder, setIsDuringQuestionReorder] = useState(false);
  const openedGroups = useRef([]);
  const [openedGroupsMap, setOpenedGroupsMap] = useState({});

  const groupIds = useMemo(() => groups.map(({ id }) => id), [groups]);

  // when changing session set all groups to open
  useLayoutEffect(() => {
    openedGroups.current = groupIds;
    mapOpenedGroupsToObject();
  }, [sessionId]);

  // detect if some groups were deleted
  // with intersect, non-existing groups are removed
  useLayoutEffect(() => {
    openedGroups.current = intersection(openedGroups.current, groupIds);
    mapOpenedGroupsToObject();
  }, [groupIds]);

  const allGroupsCollapsed = useMemo(
    () => openedGroups.current.length === 0,
    [openedGroups.current],
  );

  // map is created for faster direct access than checking the array on every item
  const mapOpenedGroupsToObject = (groupsToMap = openedGroups.current) =>
    setOpenedGroupsMap(
      flow(keyBy, (list) => mapValues(list, () => true))(groupsToMap),
    );

  const toggleGroupCollapsable = (id, value) => {
    const groupIndex = openedGroups.current.findIndex(
      (groupId) => groupId === id,
    );

    const isToggled = groupIndex >= 0;

    // if `value` is `null` -> toggle collapsable
    // otherwise -> set to the passed `value`
    // additionally check if already toggled to prevent re-render
    const toSet = isNullOrUndefined(value) ? !isToggled : value;

    if (toSet && !isToggled) {
      openedGroups.current = [...openedGroups.current, id];
      mapOpenedGroupsToObject(openedGroups.current);
    } else if (!toSet && isToggled) {
      openedGroups.current = openedGroups.current.filter(
        (groupId) => groupId !== id,
      );
      mapOpenedGroupsToObject();
    }
  };

  const expandAllGroups = () => {
    openedGroups.current = groupIds;
    mapOpenedGroupsToObject();
  };

  const collapseAllGroups = () => {
    openedGroups.current = [];
    mapOpenedGroupsToObject();
  };

  const currentQuestion = questions.find(({ id }) => id === selectedQuestion);
  const currentGroupScope = groups.find(
    ({ id }) => currentQuestion && id === currentQuestion.question_group_id,
  );

  const editingPossible = canEdit(interventionStatus);

  const groupActions = [
    {
      label: <FormattedMessage {...messages.group} />,
      inactiveIcon: groupIcon,
      activeIcon: groupIconActive,
      action: () => {
        groupQuestions(selectedSlides, params.sessionId);
        setSelectedSlides([]);
      },
      disabled: !editingPossible,
    },
    {
      label: <FormattedMessage {...messages.duplicate} />,
      inactiveIcon: copy,
      activeIcon: copyActive,
      action: () => {
        copyQuestions(selectedSlides, params.sessionId);
        setSelectedSlides([]);
      },
      disabled: !editingPossible,
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      inactiveIcon: bin,
      activeIcon: binActive,
      action: () => {
        deleteQuestions(selectedSlides, params.sessionId, groupIds);
        setSelectedSlides([]);
      },
      disabled: !editingPossible,
    },
    {
      label: <FormattedMessage {...messages.shareCopy} />,
      inactiveIcon: share,
      activeIcon: shareActive,
      action: () => setModalVisible(true),
    },
  ];

  useLockEditSessionPageScroll();

  const containerBottomRef = useRef(null);

  const hoverListProps = {
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
  };

  useEffect(() => {
    const { interventionId, sessionId: paramSessionId } = params;
    getSession({
      sessionId: paramSessionId,
      interventionId,
    });
    getQuestionGroups(paramSessionId);
    fetchInterventions();
    fetchReportTemplates(paramSessionId);
  }, []);

  const onCreateQuestion = (type) => {
    createQuestion(
      instantiateEmptyQuestion(
        formatMessage(messages.newQuestionTitle),
        type,
        formatMessage(messages.newQuestionSubtitle),
      ),
      params.sessionId,
    );
  };

  const onDragEnd = (result) => {
    setIsDuringQuestionReorder(false);

    const { draggableId, destination, source, type } = result;

    if (!isNullOrUndefined(destination))
      switch (type) {
        case reorderScope.questions: {
          const sourceIndex = source.index;
          const sourceGroupId = source.droppableId;
          const destinationIndex = destination.index;
          const destinationGroupId = destination.droppableId;
          const questionId = draggableId;

          reorderQuestions({
            sourceIndex,
            sourceGroupId,
            destinationIndex,
            destinationGroupId,
            questionId,
            sessionId,
          });

          break;
        }

        case reorderScope.groups: {
          const groupId = draggableId;
          const sourceIndex = source.index;
          const destinationIndex = destination.index;

          reorderGroups({
            groupId,
            sourceIndex,
            destinationIndex,
            sessionId,
          });

          break;
        }
        default:
          break;
      }
  };

  const onBeforeDragStart = (result) => {
    const { type } = result;

    switch (type) {
      case reorderScope.questions:
        setIsDuringQuestionReorder(true);

        break;
      default:
    }
  };

  const loading = getSessionLoader;

  const active = selectedSlides.length !== 0;
  const mapActions = (action, index) => (
    <GroupActionButton active={active} {...action} key={index} />
  );

  const sendSlidesToResearchers = (researchers) =>
    shareQuestionsToResearchers(researchers, selectedSlides);

  if (loading || questions.length === 0) return <Loader size={100} />;

  const selectSlide = (slideId) =>
    setSelectedSlides(xor(selectedSlides, [slideId]));

  const checkSelectedGroup = (gQuestions) =>
    gQuestions.every(({ id }) => selectedSlides.includes(id));

  const handleCloseManage = () => {
    setManage(false);
    setSelectedSlides([]);
  };

  const toggleGroup = (gQuestions) => {
    const allSelected = checkSelectedGroup(gQuestions);
    let q = gQuestions;
    if (!allSelected) {
      q = gQuestions.filter(({ id }) => !selectedSlides.includes(id));
    }
    setSelectedSlides(
      xor(
        selectedSlides,
        q.map(({ id }) => id),
      ),
    );
  };

  const finishGroup = groups.find((group) => group.type === FinishGroupType);
  const filteredGroups = groups.filter(
    (group) => group.type !== FinishGroupType,
  );

  return (
    <EditSessionPageContext.Provider
      value={{
        sessionId: params.sessionId,
        interventionId: params.interventionId,
      }}
    >
      <Helmet>
        <title>
          {formatMessage(messages.pageTitle, { name: sessionName })}
        </title>
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
            data-cy="questions-list"
            borderRight={`${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`}
            bg={colors.white}
            {...hoverListProps}
            display="flex"
            style={{ flexDirection: 'column' }}
            width={350}
            padded
          >
            {!manage && (
              <Row align="center" justify="between" mb={10}>
                <Row onClick={() => setManage(true)} clickable align="center">
                  <Img src={cog} alt="manage" />
                  <Text ml={10} fontWeight="bold" color={themeColors.secondary}>
                    <FormattedMessage {...messages.manageSlides} />
                  </Text>
                </Row>

                <TextButton
                  buttonProps={{
                    ml: 10,
                    fontWeight: 'bold',
                    color: themeColors.secondary,
                  }}
                  onClick={
                    allGroupsCollapsed ? expandAllGroups : collapseAllGroups
                  }
                >
                  {allGroupsCollapsed
                    ? formatMessage(messages.expandGroups)
                    : formatMessage(messages.collapseGroups)}
                </TextButton>
              </Row>
            )}
            {manage && (
              <Row mb={10} justify="between">
                <Row>{groupActions.map(mapActions)}</Row>
                <ActionIcon mr="0" onClick={handleCloseManage} />
              </Row>
            )}
            <Box disableScrollbar overflow="hidden auto">
              <DragDropContext
                onBeforeDragStart={onBeforeDragStart}
                onDragEnd={onDragEnd}
              >
                <Droppable droppableId="group-list" type={reorderScope.groups}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {filteredGroups.map((questionGroup, index) => (
                        <QuestionListGroup
                          index={index}
                          editingPossible={editingPossible}
                          changeGroupName={changeGroupName}
                          checkSelectedGroup={checkSelectedGroup}
                          sessionId={params.sessionId}
                          manage={manage}
                          questionGroup={questionGroup}
                          selectSlide={selectSlide}
                          key={questionGroup.id}
                          selectedQuestion={selectedQuestion}
                          selectedSlides={selectedSlides}
                          toggleGroup={toggleGroup}
                          isDuringQuestionReorder={isDuringQuestionReorder}
                          interventionStatus={interventionStatus}
                          formatMessage={formatMessage}
                          groupIds={groupIds}
                          toggleCollapsable={toggleGroupCollapsable}
                          isOpened={questionGroup.id in openedGroupsMap}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {finishGroup && (
                <QuestionListGroup
                  noDnd
                  editingPossible={editingPossible}
                  changeGroupName={changeGroupName}
                  checkSelectedGroup={checkSelectedGroup}
                  sessionId={params.sessionId}
                  manage={manage}
                  questionGroup={finishGroup}
                  selectSlide={selectSlide}
                  key={finishGroup.id}
                  selectedQuestion={selectedQuestion}
                  selectedSlides={selectedSlides}
                  toggleGroup={toggleGroup}
                  isDuringQuestionReorder={isDuringQuestionReorder}
                  interventionStatus={interventionStatus}
                  formatMessage={formatMessage}
                  groupIds={groupIds}
                  toggleCollapsable={toggleGroupCollapsable}
                  isOpened={finishGroup.id in openedGroupsMap}
                />
              )}
            </Box>
            <Row />
            <Spacer />
            {editingPossible && (
              <StyledQuestionTypeChooser>
                <QuestionTypeChooser onClick={onCreateQuestion} />
              </StyledQuestionTypeChooser>
            )}

            <div ref={containerBottomRef} />
          </Box>
          <ShowListButton className="show-list-button" {...hoverListProps}>
            <Icon src={menu} alt="questions-list" />
          </ShowListButton>
        </QuestionsRow>
        <Column align="between" overflow="hidden">
          <Row overflow="hidden" filled>
            <QuestionDetails
              formatMessage={formatMessage}
              changeGroupName={changeGroupName}
              currentGroupScope={currentGroupScope}
              sessionId={sessionId}
            />
            <QuestionSettings />
          </Row>
        </Column>
      </Row>
    </EditSessionPageContext.Provider>
  );
}

EditSessionPage.propTypes = {
  groups: PropTypes.array,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.string.isRequired,
  match: PropTypes.object,
  getSession: PropTypes.func,
  createQuestion: PropTypes.func,
  reorderQuestions: PropTypes.func,
  reorderGroups: PropTypes.func,
  getQuestionsLoading: PropTypes.bool,
  sessionLoaders: PropTypes.object,
  copyQuestions: PropTypes.func,
  deleteQuestions: PropTypes.func,
  groupQuestions: PropTypes.func,
  shareQuestionsToResearchers: PropTypes.func,
  changeGroupName: PropTypes.func,
  getQuestionGroups: PropTypes.func,
  fetchInterventions: PropTypes.func,
  fetchReportTemplates: PropTypes.func,
  interventionStatus: PropTypes.string,
  session: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestionId(),
  sessionLoaders: makeSelectSessionLoaders(),
  createQuestionsLoader: makeSelectLoader('createQuestionLoading'),
  groups: makeSelectQuestionGroups(),
  interventionStatus: makeSelectInterventionStatus(),
  session: makeSelectSession(),
});

const mapDispatchToProps = {
  getSession: getSessionRequest,
  createQuestion: createQuestionRequest,
  reorderQuestions: reorderQuestionListRequest,
  reorderGroups: reorderGroupListRequest,
  copyQuestions: copyQuestionsRequest,
  deleteQuestions: deleteQuestionsRequest,
  groupQuestions: groupQuestionsRequest,
  shareQuestionsToResearchers: shareQuestionsToResearchersRequest,
  changeGroupName: changeGroupNameRequest,
  getQuestionGroups: getQuestionGroupsRequest,
  fetchInterventions: fetchInterventionsRequest,
  fetchReportTemplates: fetchReportTemplatesRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'editInterventionPage',
  saga: editInterventionPageSaga,
});

export default compose(
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  injectReducer({ key: 'session', reducer: sessionReducer }),
  injectReducer({ key: 'localState', reducer: localStateReducer }),
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectReducer({ key: 'interventions', reducer: interventionsReducer }),
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectReducer({ key: 'reportTemplates', reducer: reportTemplatesReducer }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  injectSaga({
    key: 'getQuestionGroupsSaga',
    saga: getQuestionGroupsSaga,
  }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga }),
  injectSaga({ key: 'reportTemplatesSaga', saga: reportTemplatesSaga }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
  injectSaga({
    key: 'reorderQuestionGroups',
    saga: reorderQuestionGroupsSaga,
  }),
  withConnect,
  withSaga,
)(EditSessionPage);
