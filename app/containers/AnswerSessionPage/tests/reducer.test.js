import AnswerSessionPageReducer, { initialState } from '../reducer';
/* eslint-disable default-case, no-param-reassign */
describe('AnswerSessionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(AnswerSessionPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
