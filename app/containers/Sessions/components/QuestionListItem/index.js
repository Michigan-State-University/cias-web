import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import uniqueId from 'lodash/uniqueId';

import Column from 'components/Column';
import Comment from 'components/Text/Comment';
import Dropdown from 'components/Dropdown';
import Row from 'components/Row';
import CopyModal from 'components/CopyModal';
import globalMessages from 'global/i18n/globalMessages';
import { colors, themeColors } from 'theme';
import { getNarratorPositionWhenQuestionIsChanged } from 'utils/getNarratorPosition';
import { hasObjectProperty } from 'utils/hasObjectProperty';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import settingsTabLabels from 'utils/settingsTabsLabels';
import {
  copyQuestionRequest,
  deleteQuestionRequest,
  makeSelectQuestions,
  selectQuestion,
  copyExternallyQuestionRequest,
  makeSelectLastCreatedQuestionId,
} from 'global/reducers/questions';
import {
  changeCurrentNarratorBlock,
  makeSelectQuestionSettingsVisibility,
  setAnimationStopPosition,
  setCharacterDraggable,
  setQuestionSettings,
} from 'global/reducers/localState';

import StyledCircle from 'components/Circle/StyledCircle';
import { QuestionTypes } from 'models/Session/QuestionTypes';
import Box from 'components/Box';
import Checkbox from 'components/Checkbox';
import { ConfirmationModal } from 'components/Modal';
import Text from 'components/Text';
import scrollByRef from 'utils/scrollByRef';

import copy from 'assets/svg/copy.svg';
import bin from 'assets/svg/bin-no-bg.svg';
import duplicateInternally from 'assets/svg/duplicate-internally.svg';

import VariableInput from '../QuestionDetails/VariableInput';
import { ClampedTitle, ToggleableBox } from './styled';
import messages from './messages';
import getIndex from './utils';
import {
  NON_DUPLICABLE_SCREENS,
  NON_MANAGEABLE_SCREENS,
  ONLY_NARRATOR_TAB_SCREENS,
  VARIABLE_NON_EDITABLE_SCREENS,
} from './constants';

const QuestionListItem = ({
  question,
  index,
  onSelect,
  selectedQuestionIndex,
  questions,
  toggleSettings,
  removeQuestion,
  intl: { formatMessage },
  copyQuestion,
  copyExternallyQuestion,
  changeNarratorBlockIndex,
  setDraggable,
  setCharacterPosition,
  checked,
  selectSlide,
  manage,
  interventionStatus,
  disabled,
  isDraggableScreen,
  groupIds,
  allQuestions,
  sessionId,
  lastCreatedQuestionId,
}) => {
  const questionRef = useRef(null);
  const [copyOpen, setCopyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { type, subtitle, id, body, question_group_id: groupId } = question;
  const isSelected = selectedQuestionIndex === id;

  const isManageableScreen = useMemo(
    () => !NON_MANAGEABLE_SCREENS.includes(type),
    [type],
  );

  const isDuplicableScreen = useMemo(
    () => !NON_DUPLICABLE_SCREENS.includes(type),
    [type],
  );

  const isVariableEditable = useMemo(
    () => !VARIABLE_NON_EDITABLE_SCREENS.includes(type),
    [type],
  );

  useEffect(() => {
    if (selectedQuestionIndex === id) beforeRender();
  }, [selectedQuestionIndex]);

  useEffect(() => {
    if (
      lastCreatedQuestionId === id &&
      selectedQuestionIndex === id &&
      questionRef.current
    )
      scrollByRef(questionRef, true);
  }, [lastCreatedQuestionId, selectedQuestionIndex]);

  const handleSelectClick = () => {
    document.activeElement.blur();
    setDraggable(false);
    if (selectedQuestionIndex !== id) {
      onSelect(id);
      const newPosition = getNarratorPositionWhenQuestionIsChanged(
        allQuestions,
        id,
        groupIds,
      );
      setCharacterPosition(newPosition.x, newPosition.y);
    }
  };

  const handleDelete = () => {
    const newIndex = getIndex(selectedQuestionIndex, questions.length);
    handleSelectClick(newIndex);
    removeQuestion({ questionId: id, groupId, groupIds, sessionId });
  };

  const closeCopyModal = () => setCopyOpen(false);

  const handleCopyModal = () => {
    setCopyOpen(true);
  };

  const handleCopy = (target) => {
    const copied = cloneDeep(question);
    set(copied, 'id', uniqueId());
    copyQuestion({ copied, questionId: question.id, target });
  };

  const handleExternallyCopy = (target) => {
    const copied = cloneDeep(question);
    set(copied, 'id', uniqueId());
    copyExternallyQuestion(target.sessionId, target.id, copied, [question.id]);
  };

  const options = [
    {
      id: 'duplicate',
      label: <FormattedMessage {...messages.duplicate} />,
      action: handleCopy,
      color: colors.black,
      disabled: disabled || !isDuplicableScreen,
      icon: copy,
    },
    {
      id: 'copy',
      label: <FormattedMessage {...messages.copy} />,
      action: handleCopyModal,
      color: colors.black,
      icon: duplicateInternally,
    },
    {
      id: 'delete',
      label: <FormattedMessage {...messages.delete} />,
      action: () => setDeleteOpen(true),
      color: themeColors.warning,
      disabled,
      icon: bin,
    },
  ];

  const onChangeItem = () => {
    handleSelectClick(index);
  };

  const beforeRender = () => {
    setDraggable(false);
    changeNarratorBlockIndex(-1);

    const toggleNarratorTab = ONLY_NARRATOR_TAB_SCREENS.includes(type);

    toggleSettings({
      index,
      questionIndex: selectedQuestionIndex,
      tab: toggleNarratorTab ? settingsTabLabels.narrator : undefined,
    });
  };

  const renderQuestion = () => (
    <>
      <CopyModal
        visible={copyOpen}
        onClose={closeCopyModal}
        copyAction={handleExternallyCopy}
        disableInterventionCopy
        disableSessionCopy
        pasteText={formatMessage(messages.pasteQuestion)}
      />
      <ConfirmationModal
        visible={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        description={formatMessage(messages.deleteModalTitle)}
        content={
          <Column align="center">
            <Text color={themeColors.warning}>
              {formatMessage(messages.deleteModalContent)}
            </Text>
          </Column>
        }
        confirmAction={handleDelete}
      />
      <ToggleableBox
        padding={15}
        mb={15}
        width="100%"
        onClick={onChangeItem}
        isSelected={isSelected}
        bg={colors.zirkon}
        border={`1px solid ${
          checked ? colors.electricPurple : colors.smokeWhite
        }`}
      >
        <Row justify="between" ref={questionRef}>
          {manage && isManageableScreen && (
            <Column xs={1}>
              <Checkbox
                id={`question-to-select-${id}`}
                onChange={(_, event) => {
                  selectSlide(id);
                  event.stopPropagation();
                  event.preventDefault();
                }}
                checked={checked}
              />
            </Column>
          )}
          <Column xs={10}>
            <Row>
              <ClampedTitle mb={6}>{htmlToPlainText(subtitle)}</ClampedTitle>
            </Row>
            <Row>
              <Box display="flex" align="center">
                <StyledCircle
                  background={
                    QuestionTypes.find(({ id: typeId }) => typeId === type)
                      .color
                  }
                  size="10px"
                  mr="5px"
                />
                <Comment fontWeight="bold">
                  {formatMessage(globalMessages.questionTypes[type])}
                </Comment>
              </Box>
            </Row>
            {body && hasObjectProperty(body, 'variable') && (
              <Row mt={10}>
                <VariableInput
                  questionId={id}
                  variable={body.variable}
                  interventionStatus={interventionStatus}
                  disabled={!isVariableEditable}
                />
              </Row>
            )}
          </Column>
          {!manage && isManageableScreen && (
            <Column xs={1}>
              <Dropdown options={options} dropdownWidth={180} />
            </Column>
          )}
        </Row>
      </ToggleableBox>
    </>
  );

  const renderQuestionWithDnd = () => (
    <Draggable
      key={`group-${groupId}-item-${id}`}
      draggableId={id}
      index={index}
      isDragDisabled={disabled}
    >
      {(provided) => (
        <Box
          width="100%"
          key={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderQuestion()}
        </Box>
      )}
    </Draggable>
  );

  return isDraggableScreen ? renderQuestionWithDnd() : renderQuestion();
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedQuestionIndex: PropTypes.string,
  questions: PropTypes.array,
  settingsVisibility: PropTypes.bool,
  toggleSettings: PropTypes.func,
  copyQuestion: PropTypes.func,
  copyExternallyQuestion: PropTypes.func,
  intl: PropTypes.object,
  removeQuestion: PropTypes.func,
  sessionId: PropTypes.string,
  changeNarratorBlockIndex: PropTypes.func,
  setDraggable: PropTypes.func,
  setCharacterPosition: PropTypes.func,
  checked: PropTypes.bool,
  manage: PropTypes.bool,
  selectSlide: PropTypes.func,
  disabled: PropTypes.bool,
  interventionStatus: PropTypes.string,
  isDraggableScreen: PropTypes.bool,
  groupIds: PropTypes.array,
  allQuestions: PropTypes.array,
  lastCreatedQuestionId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  settingsVisibility: makeSelectQuestionSettingsVisibility(),
  allQuestions: makeSelectQuestions(),
  lastCreatedQuestionId: makeSelectLastCreatedQuestionId(),
});

const mapDispatchToProps = {
  onSelect: selectQuestion,
  toggleSettings: setQuestionSettings,
  removeQuestion: deleteQuestionRequest,
  copyQuestion: copyQuestionRequest,
  copyExternallyQuestion: copyExternallyQuestionRequest,
  changeNarratorBlockIndex: changeCurrentNarratorBlock,
  setDraggable: setCharacterDraggable,
  setCharacterPosition: setAnimationStopPosition,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(QuestionListItem));
