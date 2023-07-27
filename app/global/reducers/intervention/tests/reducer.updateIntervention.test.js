import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { SessionSchedule } from 'models/Session';

import { actionBuilder } from 'utils/actionBuilder';

import { UPDATE_SESSION_SETTINGS_REQUEST } from '../constants';
import {
  UPDATE_FORMULA,
  CHANGE_FORMULA_STATUS,
  ADD_FORMULA_CASE,
  UPDATE_FORMULA_CASE,
  REMOVE_FORMULA_CASE,
  CHANGE_SCHEDULING_TYPE,
  UPDATE_SCHEDULING_PAYLOAD,
  UPDATE_SCHEDULING_DATE,
} from '../sessionSettings/constants';
import { initialState, interventionReducer } from '../reducer';

describe('intervention reducer', () => {
  const createAction = (type, dataValues) =>
    actionBuilder(UPDATE_SESSION_SETTINGS_REQUEST, {
      type,
      data: {
        ...dataValues,
        sessionId: mockIntervention.id,
      },
    });

  const mockPattern = {
    match: 'match-test',
    target: { type: 'Session', id: 'test-2' },
  };

  const mockIntervention = {
    id: 'test-1',
    formulas: [
      {
        payload: '',
        patterns: [mockPattern],
      },
    ],
    settings: {
      formula: '',
    },
    schedule: '',
    scheduleAt: '',
    schedulePayload: '',
  };

  const createSession = (path, value) => {
    const session = cloneDeep(mockIntervention);
    set(session, path, value);
    return session;
  };

  const mockState = (session) => ({
    ...initialState,
    intervention: {
      sessions: [session],
    },
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> UPDATE_FORMULA', () => {
    const payloadValue = 'test';

    const session = createSession('formulas[0].payload', payloadValue);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(UPDATE_FORMULA, { value: payloadValue, formulaIndex: 0 }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> CHANGE_FORMULA_STATUS', () => {
    const payloadValue = 'test formula';

    const session = createSession('settings.formula', payloadValue);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(CHANGE_FORMULA_STATUS, {
          value: payloadValue,
        }),
      ),
    ).toEqual(updateState);
  });
  it('UPDATE_SESSION_SETTINGS_REQUEST -> ADD_FORMULA_CASE', () => {
    const session = createSession('formulas[0].patterns', [
      mockPattern,
      {
        match: '=',
        target: [{ type: 'Session', id: '', probability: '100' }],
      },
    ]);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(ADD_FORMULA_CASE, { formulaIndex: 0 }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> UPDATE_FORMULA_CASE', () => {
    const editedPattern = {
      match: 'edited-match',
      target: { type: 'Session', id: 'edited-id' },
    };
    const session = createSession('formulas[0].patterns', [editedPattern]);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(UPDATE_FORMULA_CASE, {
          index: 0,
          value: editedPattern,
          formulaIndex: 0,
        }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> REMOVE_FORMULA_CASE', () => {
    const session = createSession('formulas[0].patterns', []);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(REMOVE_FORMULA_CASE, { index: 0, formulaIndex: 0 }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> CHANGE_SCHEDULING_TYPE', () => {
    const scheduleType = SessionSchedule.DAYS_AFTER;
    const session = createSession('schedule', scheduleType);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(CHANGE_SCHEDULING_TYPE, { value: scheduleType }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> UPDATE_SCHEDULING_PAYLOAD', () => {
    const schedulePayload = 10;
    const session = createSession('schedulePayload', schedulePayload);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(UPDATE_SCHEDULING_PAYLOAD, { value: schedulePayload }),
      ),
    ).toEqual(updateState);
  });

  it('UPDATE_SESSION_SETTINGS_REQUEST -> UPDATE_SCHEDULING_DATE', () => {
    const scheduleDate = new Date().toDateString();
    const session = createSession('scheduleAt', scheduleDate);
    const updateState = mockState(session);
    set(updateState, 'loaders.editIntervention', true);

    expect(
      interventionReducer(
        mockState(mockIntervention),
        createAction(UPDATE_SCHEDULING_DATE, { value: scheduleDate }),
      ),
    ).toEqual(updateState);
  });
});
