import isEmpty from 'lodash/isEmpty';

import { elements } from 'theme';

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @returns {array} Returns first position of character of in previous question or initial position
 */
export const findLastPositionInPreviousQuestions = (
  allQuestions,
  questionIndex,
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

  return { x: 0, y: elements.characterInitialYPosition };
};

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @returns {array} Returns position of character stored in the block before newly added block
 */
export const getNarratorPositionForANewBlock = (
  allQuestions,
  questionIndex,
) => {
  const {
    narrator: { blocks },
  } = allQuestions[questionIndex];

  // check if it is first question and there is no blocks
  if (questionIndex === 0 && blocks.length === 0) {
    return { x: 0, y: elements.characterInitialYPosition };
  }
  // check if question already has blocks return position of the last block
  if (blocks.length !== 0) {
    return blocks[blocks.length - 1].endPosition;
  }

  // find a position in previous questions because it is a new question
  return findLastPositionInPreviousQuestions(allQuestions, questionIndex);
};

/**
 * @param {array} allQuestions Array of questions
 * @param {number} questionIndex Index of current selected question
 * @returns {array} Returns position of character stored in the first block in the choosen question or the first position found in the previous questions
 */
export const getNarratorPositionWhenQuestionIsChanged = (
  allQuestions,
  questionIndex,
) => {
  const {
    narrator: { blocks },
  } = allQuestions[questionIndex];

  // check if there is a first block
  if (blocks[0]) return blocks[0].endPosition;

  // find a position in previous questions because question does not have blocks
  return findLastPositionInPreviousQuestions(allQuestions, questionIndex);
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
) => {
  if (isEmpty(allQuestions))
    return { x: 0, y: elements.characterInitialYPosition };

  const {
    narrator: { blocks },
  } = allQuestions[questionIndex];

  // check if any of accrodion collapsibles is opened
  if (openedBlockIndex === -1) {
    // check if there is first block in this question
    if (blocks[0]) return blocks[0].endPosition;
  }

  // check if this is the first block in this question
  if (deletedIndex === 0 && blocks.length === 0)
    return findLastPositionInPreviousQuestions(allQuestions, questionIndex);

  // check if this is the last block in the this question
  if (deletedIndex === blocks.length)
    return blocks[deletedIndex - 1].endPosition;

  return blocks[deletedIndex].endPosition;
};

export const getNarratorPositionWhenQuestionIsAdded = getNarratorPositionWhenBlockIsRemoved;
