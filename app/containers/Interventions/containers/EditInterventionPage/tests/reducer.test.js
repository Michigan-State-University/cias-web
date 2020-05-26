import createInterventionPageReducer, { initialState } from '../reducer';

describe('createInterventionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(createInterventionPageReducer(undefined, {})).toEqual(
      expectedResult,
    );
  });
});
