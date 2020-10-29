import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { actionBuilder } from 'utils/actionBuilder';
import { defaultMapper } from 'utils/mapResponseObjects';
import { createIntervention, createProblem } from 'utils/reducerCreators';
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
  COPY_INTERVENTION_SUCCESS,
  REORDER_INTERVENTION_LIST,
  CHANGE_CURRENT_INTERVENTION,
  REORDER_INTERVENTION_LIST_SUCCESS,
  REORDER_INTERVENTION_LIST_ERROR,
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
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  FETCH_INTERVENTION_EMAILS_REQUEST,
  FETCH_INTERVENTION_EMAILS_SUCCESS,
  FETCH_INTERVENTION_EMAILS_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
  SEND_INTERVENTION_INVITE_ERROR,
  RESEND_INTERVENTION_INVITE_REQUEST,
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

  it('COPY_INTERVENTION_SUCCESS', () => {
    const payloadIntervention = { intervention: createIntervention() };
    const action = actionBuilder(
      COPY_INTERVENTION_SUCCESS,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.problem.interventions.push(
      defaultMapper(payloadIntervention.intervention),
    );

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_INTERVENTION_LIST', () => {
    const payloadInterventionList = {
      reorderedList: [createIntervention(1), createIntervention(0)],
    };
    const action = actionBuilder(
      REORDER_INTERVENTION_LIST,
      payloadInterventionList,
    );

    const initState = cloneDeep(mockState);
    initState.problem.interventions.push(createIntervention(1));

    const reorderState = cloneDeep(initState);
    reorderState.problem.interventions = payloadInterventionList.reorderedList;
    reorderState.cache.problem = initState.problem;

    expect(problemReducer(initState, action)).toEqual(reorderState);
  });

  it('REORDER_INTERVENTION_LIST_SUCCESS', () => {
    const action = actionBuilder(REORDER_INTERVENTION_LIST_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.cache.problem = mockState.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('REORDER_INTERVENTION_LIST_ERROR', () => {
    const action = actionBuilder(REORDER_INTERVENTION_LIST_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.problem = mockState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CHANGE_CURRENT_INTERVENTION', () => {
    const payloadIndex = { index: 2 };
    const action = actionBuilder(CHANGE_CURRENT_INTERVENTION, payloadIndex);

    const changeState = cloneDeep(mockState);
    changeState.currentInterventionIndex = payloadIndex.index;

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

  it('CREATE_INTERVENTION_REQUEST', () => {
    const action = actionBuilder(CREATE_INTERVENTION_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createInterventionLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_INTERVENTION_SUCCESS', () => {
    const payloadIntervention = { intervention: createIntervention(3) };
    const action = actionBuilder(
      CREATE_INTERVENTION_SUCCESS,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createInterventionLoading = false;
    expectedState.problem.interventions = [
      ...expectedState.problem.interventions,
      payloadIntervention.intervention,
    ];

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('CREATE_INTERVENTION_ERROR', () => {
    const payloadError = { error: 'test-error' };
    const action = actionBuilder(CREATE_INTERVENTION_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.createInterventionLoading = false;
    expectedState.errors.createInterventionError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTION_EMAILS_REQUEST', () => {
    const payloadIndex = { index: 0 };
    const action = actionBuilder(
      FETCH_INTERVENTION_EMAILS_REQUEST,
      payloadIndex,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionEmailsLoading = true;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTION_EMAILS_SUCCESS', () => {
    const payloadEmails = {
      index: 0,
      emails: ['mail@mail.com', 'mail2@mail.com'],
    };
    const action = actionBuilder(
      FETCH_INTERVENTION_EMAILS_SUCCESS,
      payloadEmails,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionEmailsLoading = false;
    expectedState.problem.interventions[payloadEmails.index].emails =
      payloadEmails.emails;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTION_EMAILS_ERROR', () => {
    const payloadError = {
      error: 'test-error',
    };
    const action = actionBuilder(FETCH_INTERVENTION_EMAILS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventionEmailsLoading = false;
    expectedState.errors.fetchInterventionEmailsError = payloadError.error;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_INVITE_REQUEST', () => {
    const index = 0;
    const initState = cloneDeep(mockState);
    initState.problem.interventions[index].emails = [];

    const payloadEmails = {
      emails: [
        ...initState.problem.interventions[index].emails,
        'test@test.com',
      ],
      interventionId: mockState.problem.interventions[index].id,
    };
    const action = actionBuilder(
      SEND_INTERVENTION_INVITE_REQUEST,
      payloadEmails,
    );

    const expectedState = cloneDeep(initState);
    expectedState.currentInterventionIndex = index;

    expectedState.loaders.sendInterventionLoading = true;
    expectedState.cache.problem = initState.problem;
    expectedState.problem.interventions[
      index
    ].emails = payloadEmails.emails.map(email => ({
      email,
    }));

    expect(problemReducer(initState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_INVITE_SUCCESS', () => {
    const action = actionBuilder(SEND_INTERVENTION_INVITE_SUCCESS, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendInterventionLoading = false;
    expectedState.loaders.interventionEmailLoading =
      mockState.loaders.interventionEmailLoading;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('SEND_INTERVENTION_INVITE_ERROR', () => {
    const action = actionBuilder(SEND_INTERVENTION_INVITE_ERROR, {});

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.sendInterventionLoading = false;
    expectedState.loaders.interventionEmailLoading =
      mockState.loaders.interventionEmailLoading;
    expectedState.problem = mockState.cache.problem;

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });

  it('RESEND_INTERVENTION_INVITE_REQUEST', () => {
    const payloadEmail = { id: 'test-user', email: 'test-user@test.com' };

    const action = actionBuilder(
      RESEND_INTERVENTION_INVITE_REQUEST,
      payloadEmail,
    );

    const expectedState = cloneDeep(mockState);
    expectedState.cache.problem = mockState.problem;
    expectedState.loaders.interventionEmailLoading = {
      ...payloadEmail,
    };

    expect(problemReducer(mockState, action)).toEqual(expectedState);
  });
});
