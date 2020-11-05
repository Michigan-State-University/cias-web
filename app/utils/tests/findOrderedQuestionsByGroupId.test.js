import { QuestionBuilder } from 'models/Intervention/QuestionBuilder/QuestionBuilder';
import findOrderedQuestionsByGroupId from '../findOrderedQuestionsByGroupId';

describe('findOrderedQuestionsByGroupId', () => {
  const testGroupId = '1';
  const otherGroupId = '2';
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
  it('Should filter all questions with different id and return ordered', () => {
    const result = findOrderedQuestionsByGroupId(testArray, testGroupId);

    expect(result).toHaveLength(4);
    expect(result[0].position).toBe(1);
    expect(result[1].position).toBe(2);
    expect(result[2].position).toBe(3);
    expect(result[3].position).toBe(4);
  });
});
