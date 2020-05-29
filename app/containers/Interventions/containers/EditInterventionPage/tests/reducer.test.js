import editInterventionPageReducer, { initialState } from '../reducer';

describe('editInterventionPageReducer', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(editInterventionPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
