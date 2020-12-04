import { QuestionBuilder } from 'models/Session/QuestionBuilder/QuestionBuilder';
import { reorderQuestionListRequest } from 'global/reducers/questions/actions';
import {
  questionsReducer,
  initialState,
} from 'global/reducers/questions/reducer';

const createState = state => ({
  ...initialState,
  ...state,
});

describe('QuestionsReducer => reorder logic', () => {
  let state;
  beforeEach(() => {
    state = createState();
  });

  it('should have correct position after series of reorder within same group', () => {
    const groupId = 'group-test-1';
    const question1 = new QuestionBuilder()
      .withTitle('Test title 1')
      .withId('test-1')
      .withQuestionGroupId(groupId)
      .withPosition(1)
      .build();
    const question2 = new QuestionBuilder()
      .withTitle('Test title 2')
      .withId('test-2')
      .withQuestionGroupId(groupId)
      .withPosition(2)
      .build();
    const question3 = new QuestionBuilder()
      .withTitle('Test title 3')
      .withId('test-3')
      .withQuestionGroupId(groupId)
      .withPosition(3)
      .build();

    state = createState({ questions: [question1, question2, question3] });

    const action1 = reorderQuestionListRequest({
      sourceIndex: 0,
      destinationIndex: 1,
      sourceGroupId: groupId,
      destinationGroupId: groupId,
    });
    const expectedResult1 = createState({
      questions: [
        { ...question2, position: 1 },
        { ...question1, position: 2 },
        question3,
      ],
    });
    const result1 = questionsReducer(state, action1);

    expect(result1).toEqual(expectedResult1);

    const action2 = reorderQuestionListRequest({
      sourceIndex: 0,
      destinationIndex: 2,
      sourceGroupId: groupId,
      destinationGroupId: groupId,
    });
    const expectedResult2 = createState({
      questions: [
        { ...question1, position: 1 },
        { ...question3, position: 2 },
        { ...question2, position: 3 },
      ],
    });
    const result2 = questionsReducer(result1, action2);

    expect(result2).toEqual(expectedResult2);
  });

  it('should have correct position after series of reorder across different groups', () => {
    const groupId1 = 'group-test-1';
    const groupId2 = 'group-test-2';
    const question1 = new QuestionBuilder()
      .withTitle('Test title 1')
      .withId('test-1')
      .withQuestionGroupId(groupId1)
      .withPosition(1)
      .build();
    const question2 = new QuestionBuilder()
      .withTitle('Test title 2')
      .withId('test-2')
      .withQuestionGroupId(groupId1)
      .withPosition(2)
      .build();
    const question3 = new QuestionBuilder()
      .withTitle('Test title 3')
      .withId('test-3')
      .withQuestionGroupId(groupId2)
      .withPosition(1)
      .build();

    state = createState({ questions: [question1, question2, question3] });

    const action1 = reorderQuestionListRequest({
      sourceIndex: 0,
      destinationIndex: 1,
      sourceGroupId: groupId1,
      destinationGroupId: groupId2,
    });
    const expectedResult1 = createState({
      questions: [
        { ...question2, position: 1 },
        { ...question3, position: 1 },
        { ...question1, position: 2, question_group_id: groupId2 },
      ],
    });
    const result1 = questionsReducer(state, action1);

    expect(result1).toEqual(expectedResult1);

    const action2 = reorderQuestionListRequest({
      sourceIndex: 0,
      destinationIndex: 0,
      sourceGroupId: groupId1,
      destinationGroupId: groupId2,
    });
    const expectedResult2 = createState({
      questions: [
        { ...question2, position: 1, question_group_id: groupId2 },
        { ...question3, position: 2 },
        { ...question1, position: 3, question_group_id: groupId2 },
      ],
    });
    const result2 = questionsReducer(result1, action2);

    expect(result2).toEqual(expectedResult2);
  });
});
