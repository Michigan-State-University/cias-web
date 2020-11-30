import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { actionBuilder } from 'utils/actionBuilder';
import { UPDATE_INTERVENTION_SETTINGS_REQUEST } from '../constants';
import {
  UPDATE_FORMULA,
  CHANGE_FORMULA_STATUS,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  SCHEDULE_OPTIONS,
  CHANGE_SCHEDULING_TYPE,
  UPDATE_SCHEDULING_PAYLOAD,
  UPDATE_SCHEDULING_DATE,
} from '../interventionSettings/constants';
import { initialState, problemReducer } from '../reducer';

describe('problem reducer', () => {
  const createAction = (type, dataValues) =>
    actionBuilder(UPDATE_INTERVENTION_SETTINGS_REQUEST, {
      type,
      data: {
        ...dataValues,
        interventionId: mockIntervention.id,
      },
    });

  const mockPattern = {
    match: 'match-test',
    target: { type: 'Intervention', id: 'test-2' },
  };

  const mockIntervention = {
    id: 'test-1',
    formula: {
      payload: '',
      patterns: [mockPattern],
    },
    settings: {
      formula: '',
    },
    schedule: '',
    schedule_at: '',
    schedule_payload: '',
  };

  const createIntervention = (path, value) => {
    const intervention = cloneDeep(mockIntervention);
    set(intervention, path, value);
    return intervention;
  };

  const mockState = intervention => ({
    ...initialState,
    problem: {
      interventions: [intervention],
    },
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> UPDATE_FORMULA', () => {
    const payloadValue = 'test';

    const intervention = createIntervention('formula.payload', payloadValue);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(UPDATE_FORMULA, { value: payloadValue }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> CHANGE_FORMULA_STATUS', () => {
    const payloadValue = 'test formula';

    const intervention = createIntervention('settings.formula', payloadValue);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(CHANGE_FORMULA_STATUS, { value: payloadValue }),
      ),
    ).toEqual(updateState);
  });
  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> ADD_FORMULA_CASE', () => {
    const intervention = createIntervention('formula.patterns', [
      mockPattern,
      {
        match: '',
        target: { type: 'Intervention', id: '' },
      },
    ]);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(ADD_FORMULA_CASE, null),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> UPDATE_FORMULA_CASE', () => {
    const editedPattern = {
      match: 'edited-match',
      target: { type: 'Intervention', id: 'edited-id' },
    };
    const intervention = createIntervention('formula.patterns', [
      editedPattern,
    ]);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(UPDATE_FORMULA_CASE, { index: 0, value: editedPattern }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> REMOVE_FORMULA_CASE', () => {
    const intervention = createIntervention('formula.patterns', []);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(REMOVE_FORMULA_CASE, { index: 0 }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> CHANGE_SCHEDULING_TYPE', () => {
    const scheduleType = SCHEDULE_OPTIONS.daysAfter;
    const intervention = createIntervention('schedule', scheduleType);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(CHANGE_SCHEDULING_TYPE, { value: scheduleType }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> UPDATE_SCHEDULING_PAYLOAD', () => {
    const schedulePayload = 10;
    const intervention = createIntervention(
      'schedule_payload',
      schedulePayload,
    );
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(UPDATE_SCHEDULING_PAYLOAD, { value: schedulePayload }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_INTERVENTION_SETTINGS_REQUEST -> UPDATE_SCHEDULING_DATE', () => {
    const scheduleDate = new Date().toDateString();
    const intervention = createIntervention('schedule_at', scheduleDate);
    const updateState = mockState(intervention);
    set(updateState, 'loaders.editProblem', true);

    expect(
      problemReducer(
        mockState(mockIntervention),
        createAction(UPDATE_SCHEDULING_DATE, { value: scheduleDate }),
      ),
    ).toEqual(updateState);
  });
});
