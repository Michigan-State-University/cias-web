import flatten from 'lodash/flatten';

export const mapGroupsToQuestions = (groups) =>
  flatten(
    groups.map(({ questions: groupQuestions, id }) =>
      groupQuestions.map((question) => ({
        ...question,
        question_group_id: id,
      })),
    ),
  );
