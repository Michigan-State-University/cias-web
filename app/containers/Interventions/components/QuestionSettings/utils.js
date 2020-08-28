import { elements } from 'theme';

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
    return blocks[blocks.length - 1].endPosition;
  }
  // if it's new question
  for (let i = questionIndex - 1; i >= 0; i -= 1) {
    const {
      narrator: { blocks: previousQuestionBlocks },
    } = allQuestions[i];
    const lastBlock = previousQuestionBlocks[previousQuestionBlocks.length - 1];
    if (lastBlock) {
      return lastBlock.endPosition;
    }
  }
  return { x: 0, y: elements.peedyInitialYPosition };
};
