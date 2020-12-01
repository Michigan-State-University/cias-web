import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createIntervention } from 'utils/reducerCreators';
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
import interventionsReducer, { initialState } from '../reducer';

describe('userList reducer', () => {
  const interventions = [
    createIntervention(),
    createIntervention(1),
    createIntervention(2),
  ];
  const mockState = {
    ...initialState,
  };
  const mockStateWithInterventions = {
    ...initialState,
    interventions,
    cache: { archiveIntervention: createIntervention(4) },
  };

  it('FETCH_PROBLEMS_REQUEST', () => {
    const action = actionBuilder(FETCH_PROBLEMS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = true;
    expectedState.fetchInterventionError = null;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEMS_SUCCESS', () => {
    const payloadInterventions = { interventions };

    const action = actionBuilder(FETCH_PROBLEMS_SUCCESS, payloadInterventions);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = false;
    expectedState.interventions = payloadInterventions.interventions;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_PROBLEMS_ERROR', () => {
    const payloadError = { error: 'test-error' };

    const action = actionBuilder(FETCH_PROBLEMS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = false;
    expectedState.fetchInterventionError = payloadError.error;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });
  it('CREATE_PROBLEM_SUCCESS COPY_PROBLEM_SUCCESS', () => {
    const payloadIntervention = { intervention: createIntervention(5) };

    const action = actionBuilder(CREATE_PROBLEM_SUCCESS, payloadIntervention);

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions = [
      ...mockStateWithInterventions.interventions,
      payloadIntervention.intervention,
    ];

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_REQUEST', () => {
    const index = 0;
    const payloadIntervention = {
      interventionId: mockStateWithInterventions.interventions[index].id,
    };

    const action = actionBuilder(ARCHIVE_PROBLEM_REQUEST, payloadIntervention);

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions[index].status = archived;
    expectedState.cache.archiveIntervention =
      mockStateWithInterventions.interventions[index];

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_SUCCESS', () => {
    const action = actionBuilder(ARCHIVE_PROBLEM_SUCCESS, {});

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.cache.archiveIntervention = null;

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_PROBLEM_ERROR', () => {
    const index = 0;
    const payloadIntervention = {
      interventionId: mockStateWithInterventions.interventions[index].id,
    };

    const action = actionBuilder(ARCHIVE_PROBLEM_ERROR, payloadIntervention);

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions[index] =
      mockStateWithInterventions.cache.archiveIntervention;
    expectedState.cache.archiveIntervention = null;

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });
});
