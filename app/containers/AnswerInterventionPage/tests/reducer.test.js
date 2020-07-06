import answerInterventionPageReducer from '../reducer';
/* eslint-disable default-case, no-param-reassign */
describe('answerInterventionPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      questionLoading: false,
      questionError: '',
      interventionQuestions: [],
      questionIndex: 0,
      answersLoading: false,
      answersError: '',
      answers: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(answerInterventionPageReducer(undefined, {})).toEqual(
      expectedResult,
    );
  });
});
