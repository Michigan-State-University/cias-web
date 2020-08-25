import cloneDeep from 'lodash/cloneDeep';

import { elements } from 'theme';

export const reorderBlocksPositions = (blocks, previousIndex, nextIndex) => {
  const copy = cloneDeep(blocks);

  if (nextIndex === 0) {
    copy[nextIndex].position.posTo = copy[nextIndex + 1].position.posFrom;
  } else if (nextIndex === copy.length - 1) {
    copy[nextIndex].position.posFrom = copy[nextIndex - 1].position.posTo;
  } else {
    copy[nextIndex].position.posTo = copy[nextIndex + 1].position.posFrom;
    copy[nextIndex].position.posFrom = copy[nextIndex - 1].position.posTo;
  }
  if (previousIndex !== 0 && previousIndex !== copy.length - 1) {
    copy[previousIndex + 1].position.posFrom =
      copy[previousIndex].position.posTo;
  }
  return copy;
};

export const getStartAnimationPoint = (
  allQuestions,
  questionIndex,
  currentQuestion,
) => {
  const { blocks } = currentQuestion.narrator;
  // if first question and there is no blocks
  if (questionIndex === 0 && blocks.length === 0) {
    return { x: 0, y: elements.peedyInitialYPosition };
  }
  // if question already has blocks return position of the last block
  if (blocks.length !== 0) {
    return blocks[blocks.length - 1].position.posTo;
  }
  // if it's new question
  for (let i = allQuestions.length - 1; i >= 0; i -= 1) {
    const {
      narrator: { blocks: previousQuestionBlocks },
    } = allQuestions[i];
    const lastBlock = previousQuestionBlocks[previousQuestionBlocks.length - 1];
    if (lastBlock) {
      return lastBlock.position.posTo;
    }
  }
  return { x: 0, y: elements.peedyInitialYPosition };
};
