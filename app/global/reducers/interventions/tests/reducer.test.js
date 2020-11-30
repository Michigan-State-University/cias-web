import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createProblem } from 'utils/reducerCreators';
import {
  FETCH_PROBLEMS_REQUEST,
  FETCH_PROBLEMS_SUCCESS,
  FETCH_PROBLEMS_ERROR,
  ARCHIVE_PROBLEM_REQUEST,
  ARCHIVE_PROBLEM_SUCCESS,
  ARCHIVE_PROBLEM_ERROR,
} from 'global/reducers/interventions/constants';
import { CREATE_PROBLEM_SUCCESS } from 'global/reducers/intervention';
import { archived } from 'models/Status/StatusTypes';
import problemsReducer, { initialState } from '../reducer';

describe('userList reducer', () => {
  const problems = [createProblem(), createProblem(1), createProblem(2)];
  const mockState = {
    ...initialState,
  };
  const mockStateWithProblems = {
    ...initialState,
    problems,
    cache: { archiveProblem: createProblem(4) },
  };

  it('FETCH_PROBLEMS_REQUEST', () => {
    const action = actionBuilder(FETCH_PROBLEMS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.fetchProblemLoading = true;
    expectedState.fetchProblemError = null;

    expect(problemsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEMS_SUCCESS', () => {
    const payloadProblems = { problems };

    const action = actionBuilder(FETCH_PROBLEMS_SUCCESS, payloadProblems);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchProblemLoading = false;
    expectedState.problems = payloadProblems.problems;

    expect(problemsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEMS_ERROR', () => {
    const payloadError = { error: 'test-error' };

    const action = actionBuilder(FETCH_PROBLEMS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchProblemLoading = false;
    expectedState.fetchProblemError = payloadError.error;

    expect(problemsReducer(mockState, action)).toEqual(expectedState);
  });
  it('CREATE_PROBLEM_SUCCESS COPY_PROBLEM_SUCCESS', () => {
    const payloadProblem = { problem: createProblem(5) };

    const action = actionBuilder(CREATE_PROBLEM_SUCCESS, payloadProblem);

    const expectedState = cloneDeep(mockStateWithProblems);
    expectedState.problems = [
      ...mockStateWithProblems.problems,
      payloadProblem.problem,
    ];

    expect(problemsReducer(mockStateWithProblems, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_REQUEST', () => {
    const index = 0;
    const payloadProblem = {
      problemId: mockStateWithProblems.problems[index].id,
    };

    const action = actionBuilder(ARCHIVE_PROBLEM_REQUEST, payloadProblem);

    const expectedState = cloneDeep(mockStateWithProblems);
    expectedState.problems[index].status = archived;
    expectedState.cache.archiveProblem = mockStateWithProblems.problems[index];

    expect(problemsReducer(mockStateWithProblems, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_SUCCESS', () => {
    const action = actionBuilder(ARCHIVE_PROBLEM_SUCCESS, {});

    const expectedState = cloneDeep(mockStateWithProblems);
    expectedState.cache.archiveProblem = null;

    expect(problemsReducer(mockStateWithProblems, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_ERROR', () => {
    const index = 0;
    const payloadProblem = {
      problemId: mockStateWithProblems.problems[index].id,
    };

    const action = actionBuilder(ARCHIVE_PROBLEM_ERROR, payloadProblem);

    const expectedState = cloneDeep(mockStateWithProblems);
    expectedState.problems[index] = mockStateWithProblems.cache.archiveProblem;
    expectedState.cache.archiveProblem = null;

    expect(problemsReducer(mockStateWithProblems, action)).toEqual(
      expectedState,
    );
  });
});
