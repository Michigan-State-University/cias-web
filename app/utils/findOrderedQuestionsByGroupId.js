import orderBy from 'lodash/orderBy';

const findOrderedQuestionsByGroupId = (questions, groupId) =>
  orderBy(
    questions.filter(
      ({ question_group_id: questionGroupId }) => questionGroupId === groupId,
    ),
    'position',
  );

export default findOrderedQuestionsByGroupId;
