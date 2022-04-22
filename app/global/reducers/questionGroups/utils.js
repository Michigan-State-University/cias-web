import flatten from 'lodash/flatten';
import { select } from 'redux-saga/effects';

import { makeSelectQuestions } from '../questions';

export const mapGroupsToQuestions = groups =>
  flatten(
    groups.map(({ questions: groupQuestions, id }) =>
      groupQuestions.map(question => ({
        ...question,
        question_group_id: id,
      })),
    ),
  );

export function* mapQuestionIdsToDuplicateGroupStructure(questionIds) {
  const questionsWithData = yield select(makeSelectQuestions());

  const filteredQuestions = questionsWithData.flatMap(
    ({ id, question_group_id: questionGroupId }) =>
      questionIds.includes(id)
        ? [
            {
              id,
              questionGroupId,
            },
          ]
        : [],
  );

  const groupedQuestions = filteredQuestions.reduce(
    (acc, { id, questionGroupId }) => ({
      ...acc,
      [questionGroupId]: [...(acc[questionGroupId] || []), id],
    }),
    {},
  );

  return Object.entries(groupedQuestions).map(([id, groupedQuestionIds]) => ({
    id,
    question_ids: groupedQuestionIds,
  }));
}
