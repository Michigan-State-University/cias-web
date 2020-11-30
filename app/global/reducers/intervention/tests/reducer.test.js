import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { actionBuilder } from 'utils/actionBuilder';
import { defaultMapper } from 'utils/mapResponseObjects';
import { createSession, createProblem } from 'utils/reducerCreators';
import {
  FETCH_PROBLEM_REQUEST,
  FETCH_PROBLEM_SUCCESS,
  FETCH_PROBLEM_ERROR,
  CREATE_PROBLEM_REQUEST,
  CREATE_PROBLEM_SUCCESS,
  CREATE_PROBLEM_ERROR,
  EDIT_PROBLEM_REQUEST,
  EDIT_PROBLEM_SUCCESS,
  EDIT_PROBLEM_ERROR,
  SEND_PROBLEM_CSV_REQUEST,
  SEND_PROBLEM_CSV_SUCCESS,
  SEND_PROBLEM_CSV_ERROR,
  COPY_SESSION_SUCCESS,
  REORDER_SESSION_LIST,
  CHANGE_CURRENT_SESSION,
  REORDER_SESSION_LIST_SUCCESS,
  REORDER_SESSION_LIST_ERROR,
  CHANGE_ACCESS_SETTING_REQUEST,
  CHANGE_ACCESS_SETTING_SUCCESS,
  CHANGE_ACCESS_SETTING_ERROR,
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
  FETCH_SESSION_EMAILS_REQUEST,
  FETCH_SESSION_EMAILS_SUCCESS,
  FETCH_SESSION_EMAILS_ERROR,
  SEND_SESSION_INVITE_REQUEST,
  SEND_SESSION_INVITE_SUCCESS,
  SEND_SESSION_INVITE_ERROR,
  RESEND_SESSION_INVITE_REQUEST,
} from '../constants';
import { initialState, problemReducer } from '../reducer';

describe('problem reducer', () => {
  const mockState = {
    ...initialState,
    problem: createProblem(),
    cache: { problem: createProblem(2) },
  };

  it('FETCH_PROBLEM_REQUEST', () => {
    const action = actionBuilder(FETCH_PROBLEM_REQUEST, { id: 'test-2' });

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchProblemLoading = true;
    expectedState.loaders.fetchProblemError = null;
    expectedState.problem = null;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEM_SUCCESS', () => {
    const payloadProblem = {
      problem: createProblem(1),
    };
    const action = actionBuilder(FETCH_PROBLEM_SUCCESS, payloadProblem);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchProblemLoading = false;
    expectedState.problem = payloadProblem.problem;
    set(
      expectedState.problem,
      'usersWithAccess',
      mockState.problem.usersWithAccess,
    );
    expectedState.cache.problem = payloadProblem.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEM_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(FETCH_PROBLEM_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchProblemLoading = false;
    expectedState.errors.fetchProblemError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_PROBLEM_REQUEST', () => {
    const action = actionBuilder(CREATE_PROBLEM_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createProblemLoading = true;
    expectedState.loaders.createProblemError = null;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_PROBLEM_SUCCESS', () => {
    const action = actionBuilder(CREATE_PROBLEM_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createProblemLoading = false;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_PROBLEM_ERROR', () => {
    const action = actionBuilder(CREATE_PROBLEM_ERROR, {});

    expect(problemReducer(mockState, action)).toEqual(mockState);
  });

  it('EDIT_PROBLEM_REQUEST', () => {
    const payloadValue = { path: 'status', value: 'published' };
    const action = actionBuilder(EDIT_PROBLEM_REQUEST, payloadValue);

    const expectedState = cloneDeep(mockState);
    expectedState.problem.status = 'published';

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_PROBLEM_SUCCESS', () => {
    const payloadProblem = { problem: createProblem(1) };
    const action = actionBuilder(EDIT_PROBLEM_SUCCESS, payloadProblem);

    const expectedState = cloneDeep(mockState);
    expectedState.problem = payloadProblem.problem;
    expectedState.cache.problem = payloadProblem.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('EDIT_PROBLEM_ERROR', () => {
    const action = actionBuilder(EDIT_PROBLEM_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.problem = expectedState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_PROBLEM_CSV_REQUEST', () => {
    const action = actionBuilder(SEND_PROBLEM_CSV_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_PROBLEM_CSV_SUCCESS', () => {
    const action = actionBuilder(SEND_PROBLEM_CSV_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = false;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_PROBLEM_CSV_ERROR', () => {
    const action = actionBuilder(SEND_PROBLEM_CSV_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendCsvLoading = false;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('COPY_SESSION_SUCCESS', () => {
    const payloadIntervention = { session: createSession() };
    const action = actionBuilder(COPY_SESSION_SUCCESS, payloadIntervention);

    const expectedState = cloneDeep(mockState);
    expectedState.problem.sessions.push(
      defaultMapper(payloadIntervention.session),
    );

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_SESSION_LIST', () => {
    const payloadInterventionList = {
      reorderedList: [createSession(1), createSession(0)],
    };
    const action = actionBuilder(REORDER_SESSION_LIST, payloadInterventionList);

    const initState = cloneDeep(mockState);
    initState.problem.sessions.push(createSession(1));

    const reorderState = cloneDeep(initState);
    reorderState.problem.sessions = payloadInterventionList.reorderedList;
    reorderState.cache.problem = initState.problem;

    expect(problemReducer(initState, action)).toEqual(reorderState);
  });

  it('REORDER_SESSION_LIST_SUCCESS', () => {
    const action = actionBuilder(REORDER_SESSION_LIST_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.problem = mockState.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_SESSION_LIST_ERROR', () => {
    const action = actionBuilder(REORDER_SESSION_LIST_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.problem = mockState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_CURRENT_INTERVENTION', () => {
    const payloadIndex = { index: 2 };
    const action = actionBuilder(CHANGE_CURRENT_SESSION, payloadIndex);

    const changeState = cloneDeep(mockState);
    changeState.currentSessionIndex = payloadIndex.index;

    expect(problemReducer(mockState, action)).toEqual(changeState);
  });

  it('CHANGE_ACCESS_SETTING_REQUEST', () => {
    const payloadSetting = { setting: 'registered' };
    const action = actionBuilder(CHANGE_ACCESS_SETTING_REQUEST, payloadSetting);

    const changeState = cloneDeep(mockState);
    changeState.problem.shared_to = payloadSetting.setting;
    changeState.cache.problem = mockState.problem;

    expect(problemReducer(mockState, action)).toEqual(changeState);
  });

  it('CHANGE_ACCESS_SETTING_SUCCESS', () => {
    const action = actionBuilder(CHANGE_ACCESS_SETTING_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.problem = mockState.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_ACCESS_SETTING_ERROR', () => {
    const action = actionBuilder(CHANGE_ACCESS_SETTING_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.problem = mockState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('ENABLE_USER_ACCESS_REQUEST', () => {
    const action = actionBuilder(ENABLE_USER_ACCESS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('ENABLE_USER_ACCESS_SUCCESS', () => {
    const payloadEmails = {
      emails: [
        ...mockState.problem.usersWithAccess,
        { id: 'test', email: 'user@test.com' },
      ],
    };
    const action = actionBuilder(ENABLE_USER_ACCESS_SUCCESS, payloadEmails);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = false;
    expectedState.problem.usersWithAccess = payloadEmails.emails;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('ENABLE_USER_ACCESS_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(ENABLE_USER_ACCESS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.enableAccessLoading = false;
    expectedState.errors.enableAccessError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_WITH_ACCESS_REQUEST', () => {
    const action = actionBuilder(FETCH_USERS_WITH_ACCESS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchUserAccessLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
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
    expectedState.problem.usersWithAccess = payloadUserAccess.userAccess;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_USERS_WITH_ACCESS_ERROR', () => {
    const payloadError = { message: 'test-error' };
    const action = actionBuilder(FETCH_USERS_WITH_ACCESS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchUserAccessLoading = false;
    expectedState.errors.fetchUserAccessError = payloadError.message;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_REQUEST', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.problem.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_REQUEST, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.problem.usersWithAccess[userIndex].loading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_SUCCESS', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.problem.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_SUCCESS, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.problem.usersWithAccess = [];

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REVOKE_USER_ACCESS_ERROR', () => {
    const userIndex = 0;
    const payloadUserId = {
      userId: mockState.problem.usersWithAccess[userIndex].id,
    };
    const action = actionBuilder(REVOKE_USER_ACCESS_ERROR, payloadUserId);

    const expectedState = cloneDeep(mockState);
    expectedState.problem.usersWithAccess[userIndex].loading = false;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_REQUEST', () => {
    const action = actionBuilder(CREATE_SESSION_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_SUCCESS', () => {
    const payloadIntervention = { session: createSession(3) };
    const action = actionBuilder(CREATE_SESSION_SUCCESS, payloadIntervention);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = false;
    expectedState.problem.sessions = [
      ...expectedState.problem.sessions,
      payloadIntervention.session,
    ];

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_SESSION_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(CREATE_SESSION_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createSessionLoading = false;
    expectedState.errors.createSessionError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SESSION_EMAILS_REQUEST', () => {
    const payloadIndex = { index: 0 };
    const action = actionBuilder(FETCH_SESSION_EMAILS_REQUEST, payloadIndex);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchSessionEmailsLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SESSION_EMAILS_SUCCESS', () => {
    const payloadEmails = {
      index: 0,
      emails: ['mail@mail.com', 'mail2@mail.com'],
    };
    const action = actionBuilder(FETCH_SESSION_EMAILS_SUCCESS, payloadEmails);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchSessionEmailsLoading = false;
    expectedState.problem.sessions[payloadEmails.index].emails =
      payloadEmails.emails;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_SESSION_EMAILS_ERROR', () => {
    const payloadError = {
      error: 'test-error',
    };
    const action = actionBuilder(FETCH_SESSION_EMAILS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchSessionEmailsLoading = false;
    expectedState.errors.fetchSessionEmailsError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_SESSION_INVITE_REQUEST', () => {
    const index = 0;
    const initState = cloneDeep(mockState);
    initState.problem.sessions[index].emails = [];

    const payloadEmails = {
      emails: [...initState.problem.sessions[index].emails, 'test@test.com'],
      sessionId: mockState.problem.sessions[index].id,
    };
    const action = actionBuilder(SEND_SESSION_INVITE_REQUEST, payloadEmails);

    const expectedState = cloneDeep(initState);
    expectedState.currentSessionIndex = index;

    expectedState.loaders.sendSessionLoading = true;
    expectedState.cache.problem = initState.problem;
    expectedState.problem.sessions[index].emails = payloadEmails.emails.map(
      email => ({
        email,
      }),
    );

    expect(problemReducer(initState, action)).toEqual(expectedState);
  });

  it('SEND_SESSION_INVITE_SUCCESS', () => {
    const action = actionBuilder(SEND_SESSION_INVITE_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendSessionLoading = false;
    expectedState.loaders.sessionEmailLoading =
      mockState.loaders.sessionEmailLoading;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_SESSION_INVITE_ERROR', () => {
    const action = actionBuilder(SEND_SESSION_INVITE_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendSessionLoading = false;
    expectedState.loaders.sessionEmailLoading =
      mockState.loaders.sessionEmailLoading;
    expectedState.problem = mockState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('RESEND_SESSION_INVITE_REQUEST', () => {
    const payloadEmail = { id: 'test-user', email: 'test-user@test.com' };

    const action = actionBuilder(RESEND_SESSION_INVITE_REQUEST, payloadEmail);

    const expectedState = cloneDeep(mockState);
    expectedState.cache.problem = mockState.problem;
    expectedState.loaders.sessionEmailLoading = {
      ...payloadEmail,
    };

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });
});
