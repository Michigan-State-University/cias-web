import isEmpty from 'lodash/isEmpty';

import { elements } from 'theme';
import findOrderedQuestionsByGroupId from './findOrderedQuestionsByGroupId';

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @returns {array} Returns first position of character of in previous question or initial position
 */
export const findLastPositionInPreviousQuestions = (
  allQuestions,
  questionIndex,
  returnValue = elements.characterInitialPosition,
) => {
  for (let i = questionIndex - 1; i >= 0; i -= 1) {
    const {
      narrator: { blocks: previousBlocks },
    } = allQuestions[i];
    const lastBlock = previousBlocks[previousBlocks.length - 1];
    if (lastBlock) {
      return lastBlock.endPosition;
    }
  }

  return returnValue;
};

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionId Id of current selected question
 * @returns {array} Returns position of character stored in the block before newly added block
 */
export const getNarratorPositionForANewBlock = (
  allQuestions,
  questionId,
  groupIds,
) => {
  const questionIndex = allQuestions.findIndex(({ id }) => id === questionId);
  const questionWithNewBlock = allQuestions[questionIndex];
  const {
    narrator: { blocks },
  } = questionWithNewBlock;

  // check if it is first question and there is no blocks
  if (allQuestions.length <= 2 && blocks.length === 0) {
    return elements.characterInitialPosition;
  }
  // check if question already has blocks return position of the last block
  if (blocks.length !== 0) {
    return blocks[blocks.length - 1].endPosition;
  }

  // find a position in previous questions because it is a new question
  return getNarratorPositionFromPreviousGroups(
    questionWithNewBlock,
    groupIds,
    allQuestions,
  );
};

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @returns {array} Returns position of character stored in the first block in the choosen question or the first position found in the previous questions
 */
export const getNarratorPositionWhenQuestionIsChanged = (
  allQuestions,
  questionId,
  groupIds,
) => {
  const questionIndex = allQuestions.findIndex(({ id }) => id === questionId);
  const newQuestion = allQuestions[questionIndex];
  const {
    narrator: { blocks },
  } = newQuestion;

  // check if there is a first block
  if (blocks[0]) return blocks[0].endPosition;

  // find a position in previous questions because question does not have blocks
  return getNarratorPositionFromPreviousGroups(
    newQuestion,
    groupIds,
    allQuestions,
  );
};

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @param {number} deletedIndex Index of block that was delted from the blocks array
 * @param {number} openedBlockIndex Index of current selected block
 * @returns {array} Returns position of character that should be displayed when the block is removed
 */
export const getNarratorPositionWhenBlockIsRemoved = (
  allQuestions,
  questionIndex,
  deletedIndex,
  openedBlockIndex,
  groupIds,
) => {
  if (isEmpty(allQuestions)) return elements.characterInitialPosition;
  const questionWithRemovedBlock = allQuestions[questionIndex];
  const {
    narrator: { blocks },
  } = questionWithRemovedBlock;

  // check if any of accrodion collapsibles is opened
  if (openedBlockIndex === -1) {
    // check if there is first block in this question
    if (blocks[0]) return blocks[0].endPosition;
  }

  // check if this is the first block in this question
  if (deletedIndex === 0 && blocks.length === 0) {
    return getNarratorPositionFromPreviousGroups(
      questionWithRemovedBlock,
      groupIds,
      allQuestions,
    );
  }

  // check if this is the last block in the this question
  if (deletedIndex === blocks.length)
    return blocks[deletedIndex - 1].endPosition;
  return blocks[deletedIndex].endPosition;
};

const getNarratorPositionFromPreviousGroups = (
  questionToStartFrom,
  groupIds,
  questions,
) => {
  const { question_group_id: groupId, id: questionId } = questionToStartFrom;
  const groupIndex = groupIds.findIndex(id => id === groupId);
  for (let i = groupIndex; i >= 0; i -= 1) {
    const currentGroupId = groupIds[i];
    const groupQuestions = findOrderedQuestionsByGroupId(
      questions,
      currentGroupId,
    );
    const questionToStartFromIndex = groupQuestions.findIndex(
      ({ id }) => id === questionId,
    );
    const posInGroup = findLastPositionInPreviousQuestions(
      groupQuestions,
      currentGroupId === groupId && questionToStartFromIndex !== -1
        ? questionToStartFromIndex
        : groupQuestions.length,
      null,
    );
    if (posInGroup) return posInGroup;
  }
  return elements.characterInitialPosition;
};

export const getNarratorPositionWhenQuestionIsAdded = (
  questions,
  newQuestion,
  groupIds,
) => {
  if (questions.length <= 1) return elements.characterInitialPosition;
  const animationPosition = getNarratorPositionFromPreviousGroups(
    newQuestion,
    groupIds,
    questions,
  );
  return animationPosition;
};
