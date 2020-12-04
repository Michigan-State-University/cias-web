import { fetchQuestions } from '../actions';
import { FETCH_QUESTIONS } from '../constants';

describe('AnswerSessionPage actions', () => {
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
