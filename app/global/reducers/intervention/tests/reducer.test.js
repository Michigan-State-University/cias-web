import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { actionBuilder } from 'utils/actionBuilder';
import { createSession, createIntervention } from 'utils/reducerCreators';
import { editInterventionRequest } from 'global/reducers/intervention';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import {
  FETCH_INTERVENTION_REQUEST,
  FETCH_INTERVENTION_SUCCESS,
  FETCH_INTERVENTION_ERROR,
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
  SEND_INTERVENTION_CSV_REQUEST,
  SEND_INTERVENTION_CSV_SUCCESS,
  SEND_INTERVENTION_CSV_ERROR,
  REORDER_SESSION_LIST,
  CHANGE_CURRENT_SESSION,
  REORDER_SESSION_LIST_SUCCESS,
  REORDER_SESSION_LIST_ERROR,
  ENABLE_USER_ACCESS_REQUEST,
  ENABLE_USER_ACCESS_SUCCESS,
  ENABLE_USER_ACCESS_ERROR,
  FETCH_USERS_WITH_ACCESS_REQUEST,
  FETCH_USERS_WITH_ACCESS_SUCCESS,
  FETCH_USERS_WITH_ACCESS_ERROR,
  REVOKE_USER_ACCESS_REQUEST,
  REVOKE_USER_ACCESS_SUCCESS,
  REVOKE_USER_ACCESS_ERROR,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
} from '../constants';
import { initialState, interventionReducer } from '../reducer';

const mockIntervention = () =>
  jsonApiToObject({ data: createIntervention() }, 'intervention');

describe('intervention reducer', () => {
  const mockState = {
    ...initialState,
    intervention: mockIntervention(),
    cache: { intervention: mockIntervention() },
  };

  it('FETCH_INTERVENTION_REQUEST', () => {
    const action = actionBuilder(FETCH_INTERVENTION_REQUEST, { id: 'test-2' });

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionLoading = true;
    expectedState.errors.fetchInterventionError = null;
    expectedState.intervention = null;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTION_SUCCESS', () => {
    const payloadIntervention = {
      intervention: jsonApiToObject(
        { data: createIntervention(1) },
        'intervention',
      ),
    };
    const action = actionBuilder(
      FETCH_INTERVENTION_SUCCESS,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionLoading = false;
    expectedState.intervention = payloadIntervention.intervention;
    set(
      expectedState.intervention,
      'usersWithAccess',
      mockState.intervention.usersWithAccess,
    );
    expectedState.cache.intervention = payloadIntervention.intervention;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTION_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(FETCH_INTERVENTION_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionLoading = false;
    expectedState.errors.fetchInterventionError = payloadError.error;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_INTERVENTION_REQUEST', () => {
    const action = actionBuilder(CREATE_INTERVENTION_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createInterventionLoading = true;
    expectedState.errors.createInterventionError = null;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_INTERVENTION_SUCCESS', () => {
    const action = actionBuilder(CREATE_INTERVENTION_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createInterventionLoading = false;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_INTERVENTION_ERROR', () => {
    const action = actionBuilder(CREATE_INTERVENTION_ERROR, {});

    expect(interventionReducer(mockState, action)).toEqual(mockState);
  });

  it('EDIT_INTERVENTION_REQUEST', () => {
    const payloadValue = { status: 'published' };
    const action = editInterventionRequest(payloadValue);

    const expectedState = cloneDeep(mockState);
    expectedState.intervention.status = 'published';
    expectedState.loaders.editIntervention = true;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_INTERVENTION_SUCCESS', () => {
    const payloadIntervention = { intervention: createIntervention(1) };
    const action = actionBuilder(
      EDIT_INTERVENTION_SUCCESS,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockState);

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_INTERVENTION_ERROR', () => {
    const action = actionBuilder(EDIT_INTERVENTION_ERROR, { error: null });

    const expectedState = cloneDeep(mockState);
    expectedState.intervention = expectedState.cache.intervention;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_CSV_REQUEST', () => {
    const action = actionBuilder(SEND_INTERVENTION_CSV_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = true;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_CSV_SUCCESS', () => {
    const action = actionBuilder(SEND_INTERVENTION_CSV_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = false;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_CSV_ERROR', () => {
    const action = actionBuilder(SEND_INTERVENTION_CSV_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = false;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_SESSION_LIST', () => {
    const payloadInterventionList = {
      reorderedList: [createSession(1), createSession(0)],
    };
    const action = actionBuilder(REORDER_SESSION_LIST, payloadInterventionList);

    const initState = cloneDeep(mockState);
    initState.intervention.sessions.push(createSession(1));

    const reorderState = cloneDeep(initState);
    reorderState.intervention.sessions = payloadInterventionList.reorderedList;
    reorderState.cache.intervention = initState.intervention;

    expect(interventionReducer(initState, action)).toEqual(reorderState);
  });

  it('REORDER_SESSION_LIST_SUCCESS', () => {
    const action = actionBuilder(REORDER_SESSION_LIST_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.intervention = mockState.intervention;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_SESSION_LIST_ERROR', () => {
    const action = actionBuilder(REORDER_SESSION_LIST_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.intervention = mockState.cache.intervention;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_CURRENT_INTERVENTION', () => {
    const payloadIndex = { index: 2 };
    const action = actionBuilder(CHANGE_CURRENT_SESSION, payloadIndex);

    const changeState = cloneDeep(mockState);
    changeState.currentSessionIndex = payloadIndex.index;

    expect(interventionReducer(mockState, action)).toEqual(changeState);
  });

  it('ENABLE_USER_ACCESS_REQUEST', () => {
    const action = actionBuilder(ENABLE_USER_ACCESS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = true;
    expectedState.errors.enableAccessError = null;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('ENABLE_USER_ACCESS_SUCCESS', () => {
    const payloadEmails = {
      emails: [
        ...mockState.intervention.usersWithAccess,
        { id: 'user-test-0"', email: 'user-test-0@user.com' },
      ],
    };
    const action = actionBuilder(ENABLE_USER_ACCESS_SUCCESS, payloadEmails);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = false;
    expectedState.intervention.usersWithAccess = payloadEmails.emails;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('ENABLE_USER_ACCESS_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(ENABLE_USER_ACCESS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = false;
    expectedState.errors.enableAccessError = payloadError.error;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_WITH_ACCESS_REQUEST', () => {
    const action = actionBuilder(FETCH_USERS_WITH_ACCESS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchUserAccessLoading = true;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_WITH_ACCESS_SUCCESS', () => {
    const payloadUserAccess = {
      userAccess: [{ id: 'test', email: 'user@user.com' }],
    };
    const action = actionBuilder(
      FETCH_USERS_WITH_ACCESS_SUCCESS,
      payloadUserAccess,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchUserAccessLoading = false;
    expectedState.errors.fetchUserAccessError = null;
    expectedState.intervention.usersWithAccess = payloadUserAccess.userAccess;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_WITH_ACCESS_ERROR', () => {
    const payloadError = { message: 'test-error' };
    const action = actionBuilder(FETCH_USERS_WITH_ACCESS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchUserAccessLoading = false;
    expectedState.errors.fetchUserAccessError = payloadError.message;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_REQUEST', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.intervention.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_REQUEST, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.intervention.usersWithAccess[userIndex].loading = true;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_SUCCESS', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.intervention.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_SUCCESS, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.intervention.usersWithAccess = [];

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_ERROR', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.intervention.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_ERROR, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.intervention.usersWithAccess[userIndex].loading = false;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_REQUEST', () => {
    const action = actionBuilder(CREATE_SESSION_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = true;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_SUCCESS', () => {
    const payloadIntervention = { session: createSession(3) };
    const action = actionBuilder(CREATE_SESSION_SUCCESS, payloadIntervention);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = false;
    expectedState.intervention.sessions = [
      ...expectedState.intervention.sessions,
      payloadIntervention.session,
    ];
    expectedState.cache.intervention.sessions = [
      ...expectedState.cache.intervention.sessions,
      payloadIntervention.session,
    ];

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(CREATE_SESSION_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = false;
    expectedState.errors.createSessionError = payloadError.error;

    expect(interventionReducer(mockState, action)).toEqual(expectedState);
  });
});
