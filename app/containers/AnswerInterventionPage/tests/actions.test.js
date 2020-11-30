import { fetchQuestions } from '../actions';
import { FETCH_QUESTIONS } from '../constants';

describe('AnswerInterventionPage actions', () => {
  describe('FetchQuestion', () => {
    it('has a type of FETCH_QUESTIONS', () => {
      const sessionId = 1;
      const expected = {
        type: FETCH_QUESTIONS,
        payload: { sessionId },
      };
      expect(fetchQuestions(sessionId)).toEqual(expected);
    });
  });
});
