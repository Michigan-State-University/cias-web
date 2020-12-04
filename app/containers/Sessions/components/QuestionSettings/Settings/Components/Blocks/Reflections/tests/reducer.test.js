import cloneDeep from 'lodash/cloneDeep';

import reflectionFormulaBlockReducer from '../reducer';
import {
  UPDATE_FORMULA,
  ADD_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
} from '../constants';

describe('Reflection formula block reducer', () => {
  const mockReflectionBlock = {
    action: 'NO_ACTION',
    question_id: 'e7da23bb-c656-4d31-aa6e-fa4134d4b6f6',
    payload: '1',
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
  };

  it('UPDATE_FORMULA', () => {
    const block = cloneDeep(mockReflectionBlock);
    const payload = {
      type: UPDATE_FORMULA,
      data: {
        value: 'test',
      },
    };
    const resultBlock = reflectionFormulaBlockReducer(block, payload);

    expect(resultBlock.payload).toEqual(payload.data.value);
  });

  it('ADD_FORMULA_CASE', () => {
    const block = cloneDeep(mockReflectionBlock);
    const payload = {
      type: ADD_FORMULA_CASE,
      data: {},
    };
    const resultBlock = reflectionFormulaBlockReducer(block, payload);

    expect(resultBlock.reflections.length).toEqual(
      mockReflectionBlock.reflections.length + 1,
    );
  });

  it('REMOVE_FORMULA_CASE', () => {
    const block = cloneDeep(mockReflectionBlock);
    const payload = {
      type: REMOVE_FORMULA_CASE,
      data: { index: 0 },
    };
    const resultBlock = reflectionFormulaBlockReducer(block, payload);

    expect(resultBlock.reflections.length).toEqual(
      mockReflectionBlock.reflections.length - 1,
    );
  });

  it('UPDATE_FORMULA_CASE', () => {
    const block = cloneDeep(mockReflectionBlock);
    const payload = {
      type: UPDATE_FORMULA_CASE,
      data: { index: 0, value: { text: 'test' } },
    };
    const resultBlock = reflectionFormulaBlockReducer(block, payload);

    expect(resultBlock.reflections[payload.data.index].text).toEqual(
      payload.data.value.text,
    );
  });
});
