import {
  questionsReducer,
  initialState,
} from 'global/reducers/questions/reducer';

describe('QuestionsReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    const action = {};
    expect(questionsReducer(undefined, action)).toEqual(expectedResult);
  });
});
