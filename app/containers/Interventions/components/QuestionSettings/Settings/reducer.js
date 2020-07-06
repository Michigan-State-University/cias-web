import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
} from './constants';

const instantiateBlockForType = type => {
  switch (type) {
    case 'BodyAnimation':
      return { type: 'BodyAnimation', animation: null };
    case 'Speech':
      return { type: 'Speech', text: null };
    default:
      return undefined;
  }
};

/* eslint-disable default-case, no-param-reassign */
const questionSettingsReducer = (question, payload) => {
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
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: [
            ...question.narrator.blocks,
            instantiateBlockForType(payload.data.type),
          ],
        },
      };

    case UPDATE_NARRATOR_ANIMATION:
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[payload.data.index].animation = payload.data.value;
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };

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
          patterns: [...question.formula.patterns, { match: '', target: '1' }],
        },
      };

    case REMOVE_FORMULA_CASE:
      question.formula.patterns.splice(payload.data.index, 1);
      return question;

    case UPDATE_FORMULA_CASE:
      if (question.id !== payload.data.value.target)
        question.formula.patterns[payload.data.index] = payload.data.value;
      return question;

    default:
      return question;
  }
};

export default questionSettingsReducer;
