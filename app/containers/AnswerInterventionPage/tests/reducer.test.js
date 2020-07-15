import answerInterventionPageReducer, { initialState } from '../reducer';
/* eslint-disable default-case, no-param-reassign */
describe('answerInterventionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(answerInterventionPageReducer(undefined, {})).toEqual(
      expectedResult,
    );
  });
});
