import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  useContext,
} from 'react';
import { injectSaga, injectReducer } from 'redux-injectors';
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
import H2 from 'components/H2';
import CopyModal from 'components/CopyModal';
import { VIEWS } from 'components/CopyModal/Components';

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
import duplicateInternally from 'assets/svg/duplicate-internally.svg';
import duplicateInternallyActive from 'assets/svg/duplicate-internally-active.svg';

import { borders, colors, themeColors } from 'theme';

import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import {
  createQuestionRequest,
  questionsReducer,
  makeSelectQuestions,
  makeSelectSelectedQuestionId,
  reorderQuestionListRequest,
  makeSelectLoader,
  deleteQuestionsRequest,
  selectQuestion as selectQuestionAction,
} from 'global/reducers/questions';
import {
  reorderGroupListRequest,
  reorderQuestionGroupsSaga,
  duplicateGroupsHereRequest,
  duplicateGroupsInternallyRequest,
  groupQuestionsRequest,
  shareGroupsExternallyRequest,
  makeSelectQuestionGroups,
  changeGroupNameRequest,
  questionGroupsReducer,
  getQuestionGroupsRequest,
  getQuestionGroupsSaga,
} from 'global/reducers/questionGroups';
import {
  copyModalReducer,
  allCopyModalSagas,
} from 'global/reducers/copyModalReducer';
import { JumpToScreenLocationState } from 'global/types/locationState';

import GroupActionButton from 'containers/Sessions/components/GroupActionButton';
import { reorderScope } from 'models/Session/ReorderScope';
import { FinishGroupType } from 'models/Session/GroupTypes';
import { ClassicSession, Session } from 'models/Session';

import { QuestionDTO } from 'models/Question';
import { GroupDto } from 'models/Groups/GroupDto';
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
  Grid,
} from './styled';
import QuestionListGroup from '../QuestionListGroup';

type NonReduxProps = {
  session: ClassicSession;
  editingPossible: boolean;
  interventionStatus: string;
};

type Props = {
  getQuestionGroups: (sessionId: string, questionToSelectId?: string) => void;
  changeGroupName: (
    newName: string,
    sessionId: string,
    groupId: string,
  ) => void;
  shareGroupsExternally: (
    researchers: string[],
    questionIds: string[],
    sessionId: string,
  ) => void;
  groupQuestions: (questionIds: string[], sessionId: string) => void;
  deleteQuestions: (
    questionIds: string[],
    sessionId: string,
    groupIds: string[],
  ) => void;
  duplicateGroupsHere: (questionIds: string[], sessionId: string) => void;
  duplicateGroupsInternally: (questionIds: string[], sessionId: string) => void;
  reorderGroups: ({
    groupId,
    sourceIndex,
    destinationIndex,
    sessionId,
  }: {
    groupId: string;
    sourceIndex: number;
    destinationIndex: number;
    sessionId: string;
  }) => void;
  reorderQuestions: ({
    sourceIndex,
    sourceGroupId,
    destinationIndex,
    destinationGroupId,
    questionId,
    sessionId,
  }: {
    sourceIndex: number;
    sourceGroupId: string;
    destinationIndex: number;
    destinationGroupId: string;
    questionId: string;
    sessionId: string;
  }) => void;
  createQuestion: (question: QuestionDTO, sessionId: string) => void;
  selectedQuestion: string;
  questions: QuestionDTO[];
  groups: GroupDto[];
  selectQuestion: (id: string) => void;
} & NonReduxProps;

const EditClassicSessionPage = ({
  questions,
  selectedQuestion,
  createQuestion,
  reorderQuestions,
  reorderGroups,
  editingPossible,
  duplicateGroupsHere,
  duplicateGroupsInternally,
  deleteQuestions,
  groupQuestions,
  shareGroupsExternally,
  groups,
  changeGroupName,
  getQuestionGroups,
  session: { id: sessionId, name: sessionName },
  interventionStatus,
}: Props): JSX.Element => {
  const params = useParams<{ sessionId: string }>();
  const { formatMessage } = useIntl();
  const [manage, setManage] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);
  const [isDuringQuestionReorder, setIsDuringQuestionReorder] = useState(false);
  const openedGroups = useRef<string[]>([]);
  const [openedGroupsMap, setOpenedGroupsMap] = useState({});
  const { interventionId } = useContext(EditSessionPageContext);
  const location = useLocation<JumpToScreenLocationState>();
  const history = useHistory<JumpToScreenLocationState>();

  const groupIds = useMemo(() => groups.map(({ id }) => id), [groups]);

  // map is created for faster direct access than checking the array on every item
  const mapOpenedGroupsToObject = useCallback(
    (groupsToMap = openedGroups.current) =>
      setOpenedGroupsMap(
        flow(keyBy, (list) => mapValues(list, () => true))(groupsToMap),
      ),
    [openedGroups.current],
  );

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

  const toggleGroupCollapsable = (id: string, value?: null | string) => {
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

  const groupActions = [
    {
      label: <FormattedMessage {...messages.duplicateHere} />,
      inactiveIcon: copy,
      activeIcon: copyActive,
      action: () => {
        duplicateGroupsHere(selectedSlides, params.sessionId);
        setSelectedSlides([]);
      },
      disabled: !editingPossible,
    },
    {
      label: <FormattedMessage {...messages.duplicateInternally} />,
      inactiveIcon: duplicateInternally,
      activeIcon: duplicateInternallyActive,
      action: () => setDuplicateModalVisible(true),
      disabled: !editingPossible,
    },
    {
      label: <FormattedMessage {...messages.shareCopy} />,
      inactiveIcon: share,
      activeIcon: shareActive,
      action: () => setModalVisible(true),
    },
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
      label: <FormattedMessage {...messages.delete} />,
      inactiveIcon: bin,
      activeIcon: binActive,
      action: () => {
        deleteQuestions(selectedSlides, sessionId, groupIds);
        setSelectedSlides([]);
      },
      disabled: !editingPossible,
    },
  ];

  useLockEditSessionPageScroll();

  const containerBottomRef = useRef(null);

  const hoverListProps = {
    onMouseEnter: () => setShowList(true),
    onMouseLeave: () => setShowList(false),
  };

  const getQuestionToSelectId = () => {
    const questionToSelectId = location.state?.selectedQuestionId;
    if (questionToSelectId) {
      history.replace({ state: undefined });
    }
    return questionToSelectId;
  };

  useEffect(() => {
    getQuestionGroups(sessionId, getQuestionToSelectId());
  }, []);

  const onCreateQuestion = (type: string) => {
    const newQuestionSubtitle =
      // @ts-ignore
      messages.defaultQuestionSubtitles[type] || messages.newQuestionSubtitle;

    createQuestion(
      instantiateEmptyQuestion(
        formatMessage(messages.newQuestionTitle),
        type,
        formatMessage(newQuestionSubtitle),
      ) as QuestionDTO,
      params.sessionId,
    );
  };

  const onDragEnd = (result: DropResult) => {
    setIsDuringQuestionReorder(false);

    const { draggableId, destination, source, type } = result;

    if (!isNullOrUndefined(destination))
      switch (type) {
        case reorderScope.questions: {
          const { index: sourceIndex } = source;
          const { droppableId: sourceGroupId } = source;
          const destinationIndex = destination?.index;
          const destinationGroupId = destination?.droppableId;
          const questionId = draggableId;
          if (isNullOrUndefined(destinationIndex) || !destinationGroupId) break;
          reorderQuestions({
            sourceIndex,
            sourceGroupId,
            destinationIndex: destinationIndex!,
            destinationGroupId,
            questionId,
            sessionId,
          });

          break;
        }

        case reorderScope.groups: {
          const groupId = draggableId;
          const { index: sourceIndex } = source;
          const destinationIndex = destination?.index;

          if (!destinationIndex) break;

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

  const onBeforeDragStart = (result: DragStart) => {
    const { type } = result;

    switch (type) {
      case reorderScope.questions:
        setIsDuringQuestionReorder(true);

        break;
      default:
    }
  };

  const active = selectedSlides.length !== 0;

  const mapActions = (action: typeof groupActions[0], index: number) => (
    // @ts-ignore
    <GroupActionButton active={active} {...action} key={index} />
  );

  const sendSlidesToResearchers = (researchers: string[]) =>
    shareGroupsExternally(researchers, selectedSlides, sessionId);

  const onDuplicateGroupsInternally = (target: Session) =>
    duplicateGroupsInternally(selectedSlides, target.id);

  // @ts-ignore
  if (questions.length === 0) return <Loader size={100} />;

  const selectSlide = (slideId: string) =>
    setSelectedSlides(xor(selectedSlides, [slideId]));

  const checkSelectedGroup = (gQuestions: QuestionDTO[]) =>
    gQuestions.every(({ id }) => selectedSlides.includes(id));

  const handleCloseManage = () => {
    setManage(false);
    setSelectedSlides([]);
  };

  const toggleGroup = (gQuestions: QuestionDTO[]) => {
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

  const goToSessionMap = () => {
    const url = `/interventions/${interventionId}/sessions/${sessionId}/map`;
    history.push(url, { selectedQuestionId: selectedQuestion });
  };

  return (
    <>
      <Helmet>
        <title>
          {formatMessage(messages.pageTitle, { name: sessionName })}
        </title>
      </Helmet>
      {/* @ts-ignore */}
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
      <CopyModal
        visible={duplicateModalVisible}
        onClose={() => setDuplicateModalVisible(false)}
        copyAction={onDuplicateGroupsInternally}
        disableInterventionCopy
        disableQuestionCopy
        disableCurrentSessionCopy
        pasteText={formatMessage(messages.duplicateGroup)}
        defaultView={VIEWS.SESSION}
      />
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
              <Box>
                <Row mb={16} justify="between" align="center">
                  <H2>
                    <FormattedMessage {...messages.manageScreens} />
                  </H2>
                  {/* @ts-ignore */}
                  <ActionIcon mr="0" onClick={handleCloseManage} />
                </Row>
                <Row mb={10} justify="between">
                  <Grid>{groupActions.map(mapActions)}</Grid>
                </Row>
              </Box>
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
                          sessionId={sessionId}
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
                  sessionId={sessionId}
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
          <ShowListButton
            className="show-list-button"
            aria-label={formatMessage(messages.showQuestionsBoxLabel)}
            title={formatMessage(messages.showQuestionsBoxLabel)}
            {...hoverListProps}
          >
            {/* @ts-ignore */}
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
            {
              // @ts-ignore
              <QuestionSettings onGoToSessionMapClick={goToSessionMap} />
            }
          </Row>
        </Column>
      </Row>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestionId(),
  createQuestionsLoader: makeSelectLoader('createQuestionLoading'),
  groups: makeSelectQuestionGroups(),
});

const mapDispatchToProps = {
  createQuestion: createQuestionRequest,
  reorderQuestions: reorderQuestionListRequest,
  reorderGroups: reorderGroupListRequest,
  duplicateGroupsHere: duplicateGroupsHereRequest,
  duplicateGroupsInternally: duplicateGroupsInternallyRequest,
  deleteQuestions: deleteQuestionsRequest,
  groupQuestions: groupQuestionsRequest,
  shareGroupsExternally: shareGroupsExternallyRequest,
  changeGroupName: changeGroupNameRequest,
  getQuestionGroups: getQuestionGroupsRequest,
  selectQuestion: selectQuestionAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectReducer({ key: 'questions', reducer: questionsReducer }),
  // @ts-ignore
  injectReducer({ key: 'questionGroups', reducer: questionGroupsReducer }),
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectSaga({
    key: 'getQuestionGroupsSaga',
    saga: getQuestionGroupsSaga,
  }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
  injectSaga({
    key: 'reorderQuestionGroups',
    saga: reorderQuestionGroupsSaga,
  }),
  withConnect,
)(EditClassicSessionPage) as React.ComponentType<NonReduxProps>;
