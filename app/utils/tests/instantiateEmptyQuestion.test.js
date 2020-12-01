/**
 * Test instantiateEmptyQuestion
 */

import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import { singleQuestion } from 'models/Session/QuestionTypes';
import { getQuestionDataByType } from 'models/Session/QuestionBuilder/getQuestionDataByType';

jest.mock('models/Session/QuestionBuilder/getQuestionDataByType');

describe('instantiateEmptyQuestion test', () => {
  const title = 'Test title';
  const subtitle = 'Test subtitle';
  const type = singleQuestion.id;

  it('should return Question object and invoke function to get proper body', () => {
    const expected = {
      title,
      subtitle,
      type,
    };
    const question = instantiateEmptyQuestion(title, type, subtitle);

    expect(getQuestionDataByType).toBeCalledTimes(1);
    expect(getQuestionDataByType).toBeCalledWith(type);
    expect(question).toEqual(expected);
  });
});
