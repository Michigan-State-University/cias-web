import produce from 'immer';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';

import { instantiateBlockForType } from 'models/Session/utils';
import { getNarratorPositionForANewBlock } from 'utils/getNarratorPosition';
import { removeAt } from 'utils/arrayUtils';
import { calculateNextValue } from 'utils/sequenceUtils';

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
  DUPLICATE_FORMULA,
  UPDATE_ENTIRE_NARRATOR,
} from './constants';
import reflectionFormulaBlockReducer from './Components/Blocks/Reflections/reducer';

/* eslint-disable no-param-reassign */
const questionSettingsReducer = (question, { type, data }, allQuestions) =>
  produce(question, (draft) => {
    switch (type) {
      // SETTINGS TAB

      case UPDATE_QUESTION_SETTINGS: {
        const { property, value } = data;

        draft.settings[property] = value;

        // Handle none_of_above answer data when the setting changes
        if (property === 'none_of_above') {
          if (!draft.body.data) {
            draft.body.data = [];
          }

          if (value) {
            const hasNoneOfAbove = draft.body.data.some(
              (item) => item.none_of_above,
            );
            if (!hasNoneOfAbove) {
              draft.body.data.push({
                variable: {
                  name: '',
                  value: `${calculateNextValue(
                    draft.body.data.map(({ variable: { value: v } }) => +v),
                  )}`,
                },
                payload: '',
                none_of_above: true,
              });
            }
          } else {
            draft.body.data = draft.body.data.filter(
              (item) => !item.none_of_above,
            );
          }
        }
        break;
      }

      // NARRATOR TAB

      case UPDATE_ENTIRE_NARRATOR: {
        const { newNarrator } = data;

        draft.narrator = newNarrator;
        break;
      }

      case UPDATE_NARRATOR_SETTINGS: {
        const { property, value } = data;

        draft.narrator.settings[property] = value;
        break;
      }

      case ADD_BLOCK: {
        const { groupIds, type: blockType } = data;

        const position = getNarratorPositionForANewBlock(
          allQuestions,
          question.id,
          groupIds,
        );
        const block = instantiateBlockForType(blockType, position, question);

        draft.narrator.blocks.push(block);
        break;
      }

      case REMOVE_BLOCK: {
        const { index } = data;

        removeAt(draft.narrator.blocks, index);
        break;
      }

      case UPDATE_NARRATOR_ANIMATION: {
        const { index, value } = data;

        draft.narrator.blocks[index].animation = value;
        break;
      }

      case UPDATE_BLOCK_SETTINGS: {
        const { index, value } = data;

        assign(draft.narrator.blocks[index], value);
        break;
      }

      case UPDATE_REFLECTION: {
        const { blockIndex, reflectionIndex, value } = data;

        assign(
          draft.narrator.blocks[blockIndex].reflections[reflectionIndex],
          value,
        );
        break;
      }

      case SWITCH_SPEECH_REFLECTION: {
        const { switchTo, index } = data;

        const newBlock = instantiateBlockForType(switchTo);
        const { endPosition, animation, action } = draft.narrator.blocks[index];

        draft.narrator.blocks[index] = {
          ...newBlock,
          endPosition,
          animation,
          action,
        };
        break;
      }

      case UPDATE_REFLECTION_FORMULA: {
        const { index } = data;
        const block = draft.narrator.blocks[index];

        draft.narrator.blocks[index] = reflectionFormulaBlockReducer(
          block,
          data,
        );
        break;
      }

      case UPDATE_NARRATOR_MOVEMENT: {
        const { index, position } = data;

        // update position that animates to in current animation block
        draft.narrator.blocks[index].endPosition = position;
        break;
      }

      case REORDER_NARRATOR_BLOCKS: {
        const { reorderedBlocks } = data;

        draft.narrator.blocks = reorderedBlocks;
        break;
      }

      case UPDATE_PAUSE_DURATION: {
        const { duration, index } = data;

        draft.narrator.blocks[index].pauseDuration = duration;
        break;
      }

      // BRANCHING TAB

      case UPDATE_FORMULA: {
        const { formulaIndex, value } = data;

        if (!draft.formulas) {
          draft.formulas = [{ patterns: [], payload: value }];
          break;
        }

        draft.formulas[formulaIndex].payload = value;
        break;
      }

      case ADD_FORMULA_CASE: {
        const { formulaIndex } = data;

        draft.formulas[formulaIndex].patterns.push({
          match: '=',
          target: [{ type: 'Question', id: '', probability: '100' }],
        });
        break;
      }

      case UPDATE_FORMULA_CASE: {
        const { formulaIndex, index, value } = data;

        draft.formulas[formulaIndex].patterns[index] = value;
        break;
      }

      case REMOVE_FORMULA_CASE: {
        const { formulaIndex, index } = data;

        removeAt(draft.formulas[formulaIndex].patterns, index);
        break;
      }

      case ADD_FORMULA_TARGET: {
        const { formulaIndex, patternIndex } = data;

        draft.formulas[formulaIndex].patterns[patternIndex].target.push({
          type: 'Question',
          id: '',
          probability: '0',
        });
        break;
      }

      case UPDATE_FORMULA_TARGET: {
        const { patternIndex, targetIndex, targetData, formulaIndex } = data;

        draft.formulas[formulaIndex].patterns[patternIndex].target[
          targetIndex
        ] = targetData;
        break;
      }

      case REMOVE_FORMULA_TARGET: {
        const { patternIndex, targetIndex, formulaIndex } = data;
        const { target } = draft.formulas[formulaIndex].patterns[patternIndex];

        removeAt(target, targetIndex);
        if (target.length === 1) {
          target[0].probability = '100';
        }
        break;
      }

      case ADD_NEW_FORMULA: {
        draft.formulas.push({ payload: '', patterns: [] });
        break;
      }

      case REMOVE_FORMULA: {
        const { formulaIndex } = data;

        removeAt(draft.formulas, formulaIndex);
        break;
      }

      case DUPLICATE_FORMULA: {
        const { formulaIndex } = data;

        const newFormula = cloneDeep(draft.formulas[formulaIndex]);
        draft.formulas.push(newFormula);
        break;
      }

      default:
        return draft;
    }
  });

export default questionSettingsReducer;
