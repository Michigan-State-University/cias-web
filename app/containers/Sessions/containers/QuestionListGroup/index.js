import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { makeSelectGroupQuestions } from 'global/reducers/questions/selectors';
import globalMessages from 'global/i18n/globalMessages';

import Collapse from 'components/Collapse';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import StyledInput from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import Img from 'components/Img';
import Box from 'components/Box';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import reorderIcon from 'assets/svg/reorder-hand.svg';

import { reorderScope } from 'models/Session/ReorderScope';
import QuestionListItem from '../../components/QuestionListItem';
import { Spacer, DraggableContainer } from './styled';
import messages from './messages';
import {
  NON_DRAGGABLE_GROUPS,
  NON_MANAGEABLE_GROUPS,
  SCREENS_NON_DRAGGABLE_GROUPS,
} from './constants';

const QuestionListGroup = ({
  questionGroup,
  toggleGroup,
  checkSelectedGroup,
  changeGroupName,
  manage,
  sessionId,
  selectSlide,
  selectedSlides,
  selectedQuestion,
  questions,
  editingPossible,
  interventionStatus,
  index: groupIndex,
  formatMessage,
  groupIds,
  isOpened,
  toggleCollapsable,
}) => {
  const { title, id, type } = questionGroup;

  const handleToggleCollapsable = (value = null) =>
    toggleCollapsable(id, value);

  const isManageableGroup = useMemo(
    () => !NON_MANAGEABLE_GROUPS.includes(type),
    [type],
  );

  const isDraggableGroup = useMemo(
    () => !NON_DRAGGABLE_GROUPS.includes(type),
    [type],
  );

  const areDraggableScreens = useMemo(
    () => !SCREENS_NON_DRAGGABLE_GROUPS.includes(type),
    [type],
  );

  useEffect(() => {
    handleToggleCollapsable(true);
  }, [questions.length]);

  const renderQuestions = (providedGroupDroppable) => (
    <DraggableContainer
      style={{ width: '100%' }}
      {...(areDraggableScreens && {
        ref: providedGroupDroppable.innerRef,
        ...providedGroupDroppable.droppableProps,
      })}
    >
      {questions.map((question, index) => (
        <Row key={question.id} width="100%">
          <QuestionListItem
            groupIds={groupIds}
            selectSlide={selectSlide}
            checked={selectedSlides.includes(question.id)}
            manage={manage}
            index={index}
            selectedQuestionIndex={selectedQuestion}
            questions={questions}
            question={question}
            sessionId={sessionId}
            disabled={!editingPossible}
            interventionStatus={interventionStatus}
            isDraggableScreen={areDraggableScreens}
          />
        </Row>
      ))}
      {areDraggableScreens && providedGroupDroppable.placeholder}
    </DraggableContainer>
  );

  const renderQuestionsWithDnd = () => (
    <Droppable
      key={`group-${questionGroup.id}`}
      droppableId={id}
      type={reorderScope.questions}
    >
      {(provided) => renderQuestions(provided)}
    </Droppable>
  );

  const renderGroup = (providedGroupDraggable) => (
    <Row
      width="100%"
      display="block"
      {...(isDraggableGroup
        ? {
            ref: providedGroupDraggable.innerRef,
            ...providedGroupDraggable.draggableProps,
          }
        : { key: `group-${id}` })}
    >
      <Collapse
        disabled
        isOpened={isOpened}
        onToggle={() => handleToggleCollapsable()}
        height="auto"
        px={0}
        bgOpacity={0}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
        imgWithBackground
        label={
          <Row align="center" justify="between" width="100%" mr={10}>
            <Box display="flex" align="center">
              {manage && isManageableGroup && (
                <Checkbox
                  id={`group-to-select-${id}`}
                  mr={8}
                  onChange={(_, event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    toggleGroup(questions);
                  }}
                  checked={checkSelectedGroup(questions)}
                />
              )}
              <StyledInput
                px={12}
                py={6}
                value={title}
                fontSize={18}
                fontWeight="bold"
                placeholder={formatMessage(messages.groupPlaceholder)}
                width="100%"
                maxWidth="initial"
                onBlur={(val) => changeGroupName(val, sessionId, id)}
                onFocus={selectInputText}
                disabled={!editingPossible}
              />
            </Box>
            {isDraggableGroup && (
              <Img
                src={reorderIcon}
                disabled={!editingPossible}
                aria-label={formatMessage(globalMessages.dragHandle)}
                title={formatMessage(globalMessages.dragHandle)}
                {...providedGroupDraggable.dragHandleProps}
              />
            )}
          </Row>
        }
      >
        {areDraggableScreens ? renderQuestionsWithDnd() : renderQuestions()}
      </Collapse>
      <Spacer />
    </Row>
  );

  const renderGroupWithDnd = () => (
    <Draggable
      key={`group-${id}`}
      draggableId={id}
      index={groupIndex}
      isDragDisabled={!editingPossible}
    >
      {(providedGroupDraggable) => renderGroup(providedGroupDraggable)}
    </Draggable>
  );

  if (questions.length === 0) return <></>;
  return isDraggableGroup ? renderGroupWithDnd() : renderGroup();
};

QuestionListGroup.propTypes = {
  questionGroup: PropTypes.object,
  toggleGroup: PropTypes.func,
  checkSelectedGroup: PropTypes.func,
  changeGroupName: PropTypes.func,
  editingPossible: PropTypes.bool,
  manage: PropTypes.bool,
  sessionId: PropTypes.string,
  selectSlide: PropTypes.func,
  formatMessage: PropTypes.func,
  selectedSlides: PropTypes.array,
  selectedQuestion: PropTypes.string,
  questions: PropTypes.array,
  interventionStatus: PropTypes.string,
  isDuringQuestionReorder: PropTypes.bool,
  index: PropTypes.number,
  groupIds: PropTypes.array,
  isOpened: PropTypes.bool,
  toggleCollapsable: PropTypes.func,
};

const mapStateToProps = (_, props) =>
  createStructuredSelector({
    questions: makeSelectGroupQuestions(props.questionGroup.id),
  });

export default connect(mapStateToProps)(QuestionListGroup);
