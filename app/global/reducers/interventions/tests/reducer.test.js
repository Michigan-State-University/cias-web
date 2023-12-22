import cloneDeep from 'lodash/cloneDeep';

import { actionBuilder } from 'utils/actionBuilder';
import { createIntervention } from 'utils/reducerCreators';
import {
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_ERROR,
} from 'global/reducers/interventions/constants';
import { CREATE_INTERVENTION_SUCCESS } from 'global/reducers/intervention';
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
    expectedState.loaders.fetchInterventions = true;
    expectedState.errors.fetchInterventions = null;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTIONS_SUCCESS', () => {
    const payloadInterventions = { interventions };

    const action = fetchInterventionsSuccess(interventions);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventions = false;
    expectedState.interventions = payloadInterventions.interventions;

    expect(interventionsReducer(mockState, action)).toEqual(expectedState);
  });

  it('FETCH_INTERVENTIONS_ERROR', () => {
    const payloadError = { error: 'test-error' };

    const action = actionBuilder(FETCH_INTERVENTIONS_ERROR, payloadError);

    const expectedState = cloneDeep(mockState);
    expectedState.loaders.fetchInterventions = false;
    expectedState.errors.fetchInterventions = payloadError.error;

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
});
