import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createIntervention } from 'utils/reducerCreators';
import {
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_ERROR,
  ARCHIVE_INTERVENTION_REQUEST,
  ARCHIVE_INTERVENTION_SUCCESS,
  ARCHIVE_INTERVENTION_ERROR,
} from 'global/reducers/interventions/constants';
import { CREATE_INTERVENTION_SUCCESS } from 'global/reducers/intervention';
import { archived } from 'models/Status/StatusTypes';
import { fetchInterventionsSuccess } from 'global/reducers/interventions/actions';
import interventionsReducer, { initialState } from '../reducer';

describe('interventions reducer', () => {
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

  it('FETCH_INTERVENTIONS_REQUEST', () => {
    const action = actionBuilder(FETCH_INTERVENTIONS_REQUEST, {});

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = true;
    expectedState.fetchInterventionError = null;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTIONS_SUCCESS', () => {
    const payloadInterventions = { interventions };

    const action = fetchInterventionsSuccess(interventions);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = false;
    expectedState.interventions = payloadInterventions.interventions;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTIONS_ERROR', () => {
    const payloadError = { error: 'test-error' };

    const action = actionBuilder(FETCH_INTERVENTIONS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.fetchInterventionLoading = false;
    expectedState.fetchInterventionError = payloadError.error;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });
  it('CREATE_INTERVENTION_SUCCESS COPY_INTERVENTION_SUCCESS', () => {
    const payloadIntervention = { intervention: createIntervention(5) };

    const action = actionBuilder(
      CREATE_INTERVENTION_SUCCESS,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions = [
      payloadIntervention.intervention,
      ...mockStateWithInterventions.interventions,
    ];

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_INTERVENTION_REQUEST', () => {
    const index = 0;
    const payloadIntervention = {
      interventionId: mockStateWithInterventions.interventions[index].id,
    };

    const action = actionBuilder(
      ARCHIVE_INTERVENTION_REQUEST,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions[index].status = archived;
    expectedState.cache.archiveIntervention =
      mockStateWithInterventions.interventions[index];

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_INTERVENTION_SUCCESS', () => {
    const action = actionBuilder(ARCHIVE_INTERVENTION_SUCCESS, {});

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.cache.archiveIntervention = null;

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });

  it('ARCHIVE_INTERVENTION_ERROR', () => {
    const index = 0;
    const payloadIntervention = {
      interventionId: mockStateWithInterventions.interventions[index].id,
    };

    const action = actionBuilder(
      ARCHIVE_INTERVENTION_ERROR,
      payloadIntervention,
    );

    const expectedState = cloneDeep(mockStateWithInterventions);
    expectedState.interventions[index] =
      mockStateWithInterventions.cache.archiveIntervention;
    expectedState.cache.archiveIntervention = null;

    expect(interventionsReducer(mockStateWithInterventions, action)).toEqual(
      expectedState,
    );
  });
});
