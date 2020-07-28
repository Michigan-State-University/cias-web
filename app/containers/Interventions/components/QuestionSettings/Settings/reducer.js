import cloneDeep from 'lodash/cloneDeep';

import {
  bodyAnimationType,
  speechType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';

import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_SPEECH_SETTINGS,
  UPDATE_NARRATOR_MOVEMENT,
  UPDATE_FORMULA_CASE,
  REMOVE_BLOCK,
} from './constants';

const instantiateBlockForType = (type, posFrom) => {
  switch (type) {
    case bodyAnimationType:
      return {
        type: bodyAnimationType,
        animation: null,
        position: {
          posFrom,
          posTo: posFrom,
        },
      };
    case speechType:
      return {
        type: speechType,
        text: [],
        audio_url: [],
        sha256: [],
        animation: 'rest',
        position: {
          posFrom,
          posTo: posFrom,
        },
      };
    case headAnimationType:
      return {
        type: headAnimationType,
        animation: null,
        position: {
          posFrom,
          posTo: posFrom,
        },
      };
    default:
      return undefined;
  }
};

const getStartAnimationPoint = (
  allQuestions,
  questionIndex,
  currentQuestion,
) => {
  const { blocks } = currentQuestion.narrator;
  // if first question and there is no blocks
  if (questionIndex === 0 && blocks.length === 0) {
    return { x: 0, y: 0 };
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
  return { x: 0, y: 0 };
};

/* eslint-disable default-case, no-param-reassign */
const questionSettingsReducer = (allQuestions, payload, questionIndex) => {
  const question = allQuestions[questionIndex];
  switch (payload.type) {
    case UPDATE_QUESTION_SETTINGS:
      return {
        ...question,
        settings: {
          ...question.settings,
          [payload.data.property]: payload.data.value,
        },
      };

    case UPDATE_NARRATOR_SETTINGS:
      return {
        ...question,
        narrator: {
          ...question.narrator,
          settings: {
            ...question.narrator.settings,
            [payload.data.property]: payload.data.value,
          },
        },
      };

    case ADD_BLOCK:
      const pos = getStartAnimationPoint(allQuestions, questionIndex, question);
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: [
            ...question.narrator.blocks,
            instantiateBlockForType(payload.data.type, pos),
          ],
        },
      };

    case REMOVE_BLOCK: {
      const clonedQuestion = cloneDeep(question);
      const previousBlock =
        clonedQuestion.narrator.blocks[payload.data.index - 1];
      const nextBlock = clonedQuestion.narrator.blocks[payload.data.index + 1];

      if (nextBlock && previousBlock) {
        nextBlock.posFrom = previousBlock.posTo;
      }
      clonedQuestion.narrator.blocks.splice(payload.data.index, 1);
      return clonedQuestion;
    }

    case UPDATE_NARRATOR_ANIMATION: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[payload.data.index].animation = payload.data.value;
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case UPDATE_SPEECH_SETTINGS: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[payload.data.index] = {
        ...cloneBlocks[payload.data.index],
        ...payload.data.value,
      };

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case UPDATE_FORMULA:
      return {
        ...question,
        formula: { ...question.formula, payload: payload.data.value },
      };

    case ADD_FORMULA_CASE:
      return {
        ...question,
        formula: {
          ...question.formula,
          patterns: [
            ...question.formula.patterns,
            { match: '', target: { type: 'Question', id: '' } },
          ],
        },
      };

    case UPDATE_FORMULA_CASE:
      question.formula.patterns[payload.data.index] = payload.data.value;
      return question;

    case REMOVE_FORMULA_CASE:
      question.formula.patterns.splice(payload.data.index, 1);
      return question;

    case UPDATE_NARRATOR_MOVEMENT: {
      const positionToSet = payload.data.position;
      // update position that animates to in current animation block
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[payload.data.index].position.posTo = positionToSet;

      // update animation position in next block so it starts in same position that last animation finishes
      const nextBlock = cloneBlocks[payload.data.index + 1];
      if (nextBlock) {
        nextBlock.position.posFrom = positionToSet;
      }

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    default:
      return question;
  }
};

export default questionSettingsReducer;
