import { instantiateBlockForType } from 'models/Session/utils';
import { getNarratorPositionForANewBlock } from 'utils/getNarratorPosition';

import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_BLOCK_SETTINGS,
  UPDATE_NARRATOR_MOVEMENT,
  UPDATE_FORMULA_CASE,
  REMOVE_BLOCK,
  SWITCH_SPEECH_REFLECTION,
  UPDATE_REFLECTION,
  REORDER_NARRATOR_BLOCKS,
  UPDATE_PAUSE_DURATION,
  UPDATE_REFLECTION_FORMULA,
  ADD_FORMULA_TARGET,
  UPDATE_FORMULA_TARGET,
  REMOVE_FORMULA_TARGET,
  ADD_NEW_FORMULA,
  REMOVE_FORMULA,
} from './constants';
import reflectionFormulaBlockReducer from './Components/Blocks/Reflections/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionSettingsReducer = (allQuestions, payload, questionIndex) => {
  const question = allQuestions.find(({ id }) => id === questionIndex);
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
      const pos = getNarratorPositionForANewBlock(
        allQuestions,
        questionIndex,
        payload.data.groupIds,
      );
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: [
            ...question.narrator.blocks,
            instantiateBlockForType(payload.data.type, pos, question),
          ],
        },
      };

    case REMOVE_BLOCK: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks.splice(payload.data.index, 1);
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
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

    case UPDATE_BLOCK_SETTINGS: {
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

    case UPDATE_REFLECTION: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      const reflection =
        cloneBlocks[payload.data.blockIndex].reflections[
          payload.data.reflectionIndex
        ];

      cloneBlocks[payload.data.blockIndex].reflections[
        payload.data.reflectionIndex
      ] = {
        ...reflection,
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

    case SWITCH_SPEECH_REFLECTION: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      const newBlockType = payload.data.switchTo;

      cloneBlocks[payload.data.index] = {
        ...instantiateBlockForType(newBlockType),
        endPosition: cloneBlocks[payload.data.index].endPosition,
        animation: cloneBlocks[payload.data.index].animation,
        action: cloneBlocks[payload.data.index].action,
      };

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case UPDATE_REFLECTION_FORMULA: {
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));

      cloneBlocks[payload.data.index] = reflectionFormulaBlockReducer(
        cloneBlocks[payload.data.index],
        payload.data,
      );

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case UPDATE_FORMULA: {
      const { formulaIndex, value } = payload.data;

      if (!question.formulas) {
        return {
          ...question,
          formulas: [{ patterns: [], payload: value }],
        };
      }

      return {
        ...question,
        formulas: [
          ...question.formulas.slice(0, formulaIndex),
          { ...question.formulas[formulaIndex], payload: value },
          ...question.formulas.slice(formulaIndex + 1),
        ],
      };
    }

    case ADD_FORMULA_CASE: {
      const { formulaIndex } = payload.data;

      return {
        ...question,
        formulas: [
          ...question.formulas.slice(0, formulaIndex),
          {
            ...question.formulas[formulaIndex],
            patterns: [
              ...question.formulas[formulaIndex].patterns,
              {
                match: '=',
                target: [{ type: 'Question', id: '', probability: '100' }],
              },
            ],
          },
          ...question.formulas.slice(formulaIndex + 1),
        ],
      };
    }

    case UPDATE_FORMULA_CASE: {
      const { formulaIndex } = payload.data;
      question.formulas[formulaIndex].patterns[payload.data.index] =
        payload.data.value;
      return question;
    }

    case REMOVE_FORMULA_CASE: {
      const { formulaIndex } = payload.data;
      question.formulas[formulaIndex].patterns.splice(payload.data.index, 1);
      return question;
    }

    case UPDATE_NARRATOR_MOVEMENT: {
      const positionToSet = payload.data.position;
      // update position that animates to in current animation block
      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[payload.data.index].endPosition = positionToSet;

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case REORDER_NARRATOR_BLOCKS: {
      const { reorderedBlocks } = payload.data;

      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: reorderedBlocks,
        },
      };
    }

    case UPDATE_PAUSE_DURATION: {
      const { duration, index } = payload.data;

      const cloneBlocks = question.narrator.blocks.map(obj => ({ ...obj }));
      cloneBlocks[index].pauseDuration = duration;
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: cloneBlocks,
        },
      };
    }

    case ADD_FORMULA_TARGET: {
      const { formulaIndex, patternIndex } = payload.data;
      return question.formulas[formulaIndex].patterns[patternIndex].target.push(
        {
          type: 'Question',
          id: '',
          probability: '0',
        },
      );
    }

    case UPDATE_FORMULA_TARGET: {
      const {
        patternIndex,
        targetIndex,
        targetData,
        formulaIndex,
      } = payload.data;
      question.formulas[formulaIndex].patterns[patternIndex].target[
        targetIndex
      ] = targetData;
      return question;
    }

    case REMOVE_FORMULA_TARGET: {
      const { patternIndex, targetIndex, formulaIndex } = payload.data;
      const newTargets = question.formulas[formulaIndex].patterns[
        patternIndex
      ].target.filter((_, deleteIndex) => deleteIndex !== targetIndex);
      question.formulas[formulaIndex].patterns[patternIndex].target =
        newTargets.length === 1
          ? [{ ...newTargets[0], probability: '100' }]
          : newTargets;
      return question;
    }

    case ADD_NEW_FORMULA: {
      question.formulas = [...question.formulas, { payload: '', patterns: [] }];
      return question;
    }

    case REMOVE_FORMULA: {
      const { formulaIndex } = payload.data;
      const newFormulas = question.formulas.filter(
        (_, deleteIndex) => deleteIndex !== formulaIndex,
      );
      question.formulas = newFormulas;
      return question;
    }

    default:
      return question;
  }
};

export default questionSettingsReducer;
