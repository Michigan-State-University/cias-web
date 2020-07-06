import { fetchQuestions } from '../actions';
import { FETCH_QUESTIONS } from '../constants';

describe('AnswerInterventionPage actions', () => {
  describe('FetchQuestion', () => {
    it('has a type of FETCH_QUESTIONS', () => {
      const interventionId = 1;
      const expected = {
        type: FETCH_QUESTIONS,
        payload: { interventionId },
      };
      expect(fetchQuestions(interventionId)).toEqual(expected);
    });
  });
});
