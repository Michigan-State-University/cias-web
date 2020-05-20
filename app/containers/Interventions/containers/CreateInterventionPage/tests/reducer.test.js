import createInterventionPageReducer from '../reducer';

describe('createInterventionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(createInterventionPageReducer(undefined, {})).toEqual(
      expectedResult,
    );
  });
});
