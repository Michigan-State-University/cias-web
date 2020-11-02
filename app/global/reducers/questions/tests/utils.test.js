import { QuestionBuilder } from 'models/Intervention/QuestionBuilder/QuestionBuilder';
import {
  findOrderedQuestionsByGroupId,
  getNewQuestionIdInNextGroups,
  getNewQuestionIdInPreviousGroups,
  getNewQuestionIdInsideGroup,
} from '../utils';

describe('global/reducer/questions/utils', () => {
  const testGroupId = '1';
  const otherGroupId = '2';
  const invalidGroupId = '0';
  const q1 = new QuestionBuilder()
    .withQuestionGroupId(testGroupId)
    .withPosition(3)
    .withId(1);
  const q2 = new QuestionBuilder().withQuestionGroupId(otherGroupId).withId(2);
  const q3 = new QuestionBuilder()
    .withQuestionGroupId(testGroupId)
    .withPosition(4)
    .withId(3);
  const q4 = new QuestionBuilder()
    .withQuestionGroupId(testGroupId)
    .withPosition(2)
    .withId(4);
  const q5 = new QuestionBuilder()
    .withQuestionGroupId(testGroupId)
    .withPosition(1)
    .withId(5);
  const testArray = [q1, q2, q3, q4, q5];
  const groupIds = [testGroupId, otherGroupId];

  describe('findOrderedQuestionsByGroupId', () => {
    it('Should filter all questions with different id and return ordered', () => {
      const result = findOrderedQuestionsByGroupId(testArray, testGroupId);

      expect(result).toHaveLength(4);
      expect(result[0].position).toBe(1);
      expect(result[1].position).toBe(2);
      expect(result[2].position).toBe(3);
      expect(result[3].position).toBe(4);
    });
  });

  describe('getNewQuestionIdInsideGroup', () => {
    it('should return null if there is only one question in group', () => {
      const result = getNewQuestionIdInsideGroup(testArray, otherGroupId, 2);
      expect(result).toBeNull();
    });
    it('should return previous question if removed question has position greater than 1', () => {
      const result = getNewQuestionIdInsideGroup(testArray, testGroupId, 4);
      expect(result).toEqual(5);
      const otherResult = getNewQuestionIdInsideGroup(
        testArray,
        testGroupId,
        3,
      );
      expect(otherResult).toEqual(1);
    });
    it('should return first question if question has position 1', () => {
      const result = getNewQuestionIdInsideGroup(testArray, testGroupId, 5);
      expect(result).toEqual(4);
    });
  });

  describe('getNewQuestionIdInPreviousGroups', () => {
    it('should return last question from previous group', () => {
      const result = getNewQuestionIdInPreviousGroups(testArray, 1, groupIds);
      expect(result).toEqual(3);
    });
    it('should omit group without questions and  return last question from previous group', () => {
      const result = getNewQuestionIdInPreviousGroups(testArray, 1, [
        testGroupId,
        invalidGroupId,
        otherGroupId,
      ]);
      expect(result).toEqual(3);
    });
    it('should return null if first group', () => {
      const result = getNewQuestionIdInPreviousGroups(testArray, 0, [
        otherGroupId,
        testGroupId,
      ]);
      expect(result).toBeNull();
    });
  });

  describe('getNewQuestionIdInNextGroups', () => {
    it('should return first question from next group', () => {
      const result = getNewQuestionIdInNextGroups(testArray, 0, [
        otherGroupId,
        testGroupId,
      ]);
      expect(result).toEqual(5);
    });
    it('should omit group without questions and  return first question from next group', () => {
      const result = getNewQuestionIdInNextGroups(testArray, 0, [
        otherGroupId,
        invalidGroupId,
        testGroupId,
      ]);
      expect(result).toEqual(5);
    });
    it('should return null if last group', () => {
      const result = getNewQuestionIdInNextGroups(testArray, 1, groupIds);
      expect(result).toBeNull();
    });
  });
});
