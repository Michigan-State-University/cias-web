import cloneDeep from 'lodash/cloneDeep';

import { bodyAnimationType, speechType } from 'models/Narrator/BlockTypes';

import {
  UPDATE_QUESTION_SETTINGS,
  UPDATE_NARRATOR_SETTINGS,
  ADD_BLOCK,
  REMOVE_BLOCK,
  UPDATE_NARRATOR_ANIMATION,
  UPDATE_BLOCK_SETTINGS,
  UPDATE_REFLECTION,
  SWITCH_SPEECH_REFLECTION,
  UPDATE_REFLECTION_FORMULA,
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_NARRATOR_MOVEMENT,
  REORDER_NARRATOR_BLOCKS,
  UPDATE_PAUSE_DURATION,
} from '../constants';
import questionSettingsReducer from '../reducer';

describe('Settings reducer tests', () => {
  const mockQuestions = [
    {
      type: 'Question::Single',
      question_group_id: '04dc41eb-5130-42a3-a59e-3c24dcfb2f89',
      settings: {
        image: false,
        title: true,
        video: false,
        required: true,
        subtitle: true,
        proceed_button: true,
      },
      position: 1,
      title: '<h1>Enter title here</h1>',
      subtitle: 'Enter main text/question for screen here',
      narrator: {
        blocks: [
          {
            text: ['Hello'],
            type: 'Speech',
            action: 'NO_ACTION',
            animation: 'explain',
            endPosition: {
              x: 1,
              y: 1,
            },
          },
          {
            action: 'NO_ACTION',
            question_id: 'e7da23bb-c656-4d31-aa6e-fa4134d4b6f6',
            reflections: [
              {
                variable: '1',
                value: '2',
                payload: '1',
                text: ['1'],
              },
              {
                variable: '1',
                value: '1',
                payload: '2',
                text: ['2'],
              },
            ],
            animation: 'rest',
            type: 'Reflection',
            endPosition: {
              x: 600,
              y: 600,
            },
          },
        ],
        settings: {
          voice: true,
          animation: true,
        },
      },
      image_url: null,
      video_url: null,
      formulas: [
        {
          payload: '',
          patterns: ['first'],
        },
      ],
      body: {
        data: [
          {
            value: '1',
            payload: '<p>1</p>',
          },
          {
            value: '2',
            payload: '<p>2</p>',
          },
        ],
        variable: {
          name: '1',
        },
      },
      id: 'test',
    },
  ];
  const questionIndex = 'test';

  it('UPDATE_QUESTION_SETTINGS', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_QUESTION_SETTINGS,
      data: { property: 'test', value: true },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.settings.test).toEqual(payload.data.value);
  });

  it('UPDATE_NARRATOR_SETTINGS', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_NARRATOR_SETTINGS,
      data: { property: 'test', value: true },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.settings.test).toEqual(payload.data.value);
  });

  it('ADD_BLOCK', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: ADD_BLOCK,
      data: { type: bodyAnimationType, groupIds: ['test'] },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.blocks.length).toEqual(
      mockQuestions[0].narrator.blocks.length + 1,
    );
  });

  it('REMOVE_BLOCK', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: REMOVE_BLOCK,
      data: { index: 0 },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.blocks.length).toEqual(
      mockQuestions[0].narrator.blocks.length - 1,
    );
  });

  it('UPDATE_NARRATOR_ANIMATION', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_NARRATOR_ANIMATION,
      data: { index: 0, value: 'test' },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(
      resultQuestion.narrator.blocks[payload.data.index].animation,
    ).toEqual(payload.data.value);
  });

  it('UPDATE_BLOCK_SETTINGS', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_BLOCK_SETTINGS,
      data: { index: 0, value: { test: 'test' } },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.blocks[payload.data.index].test).toEqual(
      payload.data.value.test,
    );
  });

  it('UPDATE_REFLECTION', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_REFLECTION,
      data: { blockIndex: 1, reflectionIndex: 0, value: { test: 'test' } },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(
      resultQuestion.narrator.blocks[payload.data.blockIndex].reflections[
        payload.data.reflectionIndex
      ].test,
    ).toEqual(payload.data.value.test);
  });

  it('SWITCH_SPEECH_REFLECTION', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: SWITCH_SPEECH_REFLECTION,
      data: {
        index: 1,
        switchTo: speechType,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.blocks[payload.data.index].type).toEqual(
      payload.data.switchTo,
    );
  });

  it('UPDATE_REFLECTION_FORMULA', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_REFLECTION_FORMULA,
      data: {
        index: 1,
        data: { index: 0, value: 'test' },
        type: undefined, // should return original block
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );

    expect(resultQuestion.narrator.blocks[payload.data.index]).toEqual(
      mockQuestions[0].narrator.blocks[payload.data.index],
    );
  });

  it('UPDATE_FORMULA', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_FORMULA,
      data: {
        value: 'test',
        formulaIndex: 0,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.formulas[0].payload).toEqual(payload.data.value);
  });

  it('ADD_FORMULA_CASE', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: ADD_FORMULA_CASE,
      data: {
        formulaIndex: 0,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.formulas[0].patterns.length).toEqual(
      mockQuestions[0].formulas[0].patterns.length + 1,
    );
  });

  it('UPDATE_FORMULA_CASE', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_FORMULA_CASE,
      data: {
        index: 0,
        value: 'test',
        formulaIndex: 0,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.formulas[0].patterns[0]).toEqual(payload.data.value);
  });

  it('REMOVE_FORMULA_CASE', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: REMOVE_FORMULA_CASE,
      data: {
        index: 0,
        formulaIndex: 0,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.formulas[0].patterns.length).toEqual(
      mockQuestions[0].formulas[0].patterns.length - 1,
    );
  });

  it('UPDATE_NARRATOR_MOVEMENT', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_NARRATOR_MOVEMENT,
      data: {
        index: 0,
        position: { x: 10, y: 10 },
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(
      resultQuestion.narrator.blocks[payload.data.index].endPosition,
    ).toEqual(payload.data.position);
  });

  it('REORDER_NARRATOR_BLOCKS', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: REORDER_NARRATOR_BLOCKS,
      data: {
        reorderedBlocks: [
          allQuestions[0].narrator.blocks[1],
          allQuestions[0].narrator.blocks[0],
        ],
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion.narrator.blocks).toEqual(
      payload.data.reorderedBlocks,
    );
  });

  it('UPDATE_PAUSE_DURATION', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: UPDATE_PAUSE_DURATION,
      data: {
        index: 0,
        duration: 1,
      },
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(
      resultQuestion.narrator.blocks[payload.data.index].pauseDuration,
    ).toEqual(payload.data.duration);
  });

  it('default', () => {
    const allQuestions = cloneDeep(mockQuestions);
    const payload = {
      type: undefined,
    };
    const resultQuestion = questionSettingsReducer(
      allQuestions,
      payload,
      questionIndex,
    );
    expect(resultQuestion).toEqual(mockQuestions[0]);
  });
});
