import {
  gridQuestion,
  textboxQuestion,
  numberQuestion,
} from 'models/Session/QuestionTypes';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import findOrderedQuestionsByGroupId from 'utils/findOrderedQuestionsByGroupId';
import { splitAndKeep } from 'utils/splitAndKeep';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { assignDraftItemsById, updateItemById } from 'utils/reduxUtils';

export const mapQuestionDataForType = (question) => {
  switch (question.type) {
    case textboxQuestion.id:
    case numberQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [{ variable: { name: '', value: '1' }, payload: '' }],
        },
      };

    case gridQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [
                {
                  variable: { name: '', value: '1' },
                  payload: {
                    rows: [],
                    columns: [],
                  },
                },
              ],
        },
      };

    default:
      return question;
  }
};

export const getFromQuestionTTS = (question) => {
  const delimiters = [',', '.', '?', '!'];

  const subtileTTS = question.subtitle
    ? splitAndKeep(htmlToPlainText(question.subtitle), delimiters)
    : [];

  return subtileTTS;
};

export const assignFromQuestionTTS = (question) => {
  const { subtitle } = question.settings;

  return {
    ...question,
    narrator: {
      ...question.narrator,
      blocks: question.narrator.blocks.map((block) => {
        if (block.type === readQuestionBlockType)
          return {
            ...block,
            text: subtitle ? getFromQuestionTTS(question) : [],
          };

        return block;
      }),
    },
  };
};

/* eslint-disable default-case, no-param-reassign */
export const editQuestionSuccessCommon = (draft, payload) => {
  draft.loaders.updateQuestionLoading = false;
  updateItemById(
    draft.questions,
    payload.question.id,
    mapQuestionDataForType(payload.question),
  );
  assignDraftItemsById(
    draft.questions,
    draft.cache.questions,
    payload.question.id,
  );
};

/* eslint-disable default-case, no-param-reassign */
export const editQuestionErrorCommon = (draft, payload) => {
  draft.loaders.updateQuestionLoading = false;

  assignDraftItemsById(
    draft.cache.questions,
    draft.questions,
    payload.questionId,
  );
};

export const getNewQuestionIdInsideGroup = (
  questions,
  groupId,
  removedQuestionId,
) => {
  const groupQuestions = findOrderedQuestionsByGroupId(questions, groupId);
  if (groupQuestions.length === 1) return null;
  const removedQuestionIndex = groupQuestions.findIndex(
    ({ id }) => id === removedQuestionId,
  );
  return groupQuestions[removedQuestionIndex < 1 ? 1 : removedQuestionIndex - 1]
    .id;
};

export const getNewQuestionIdInPreviousGroups = (
  questions,
  groupIndex,
  groupIds,
) => {
  for (
    let newGroupIndex = groupIndex - 1;
    newGroupIndex >= 0;
    newGroupIndex -= 1
  ) {
    const newGroupQuestions = findOrderedQuestionsByGroupId(
      questions,
      groupIds[newGroupIndex],
    );
    if (newGroupQuestions.length !== 0) {
      return newGroupQuestions[newGroupQuestions.length - 1].id;
    }
  }
  return null;
};

export const getNewQuestionIdInNextGroups = (
  questions,
  groupIndex,
  groupIds,
  questionId,
) => {
  for (
    let newGroupIndex = groupIndex + 1;
    newGroupIndex < groupIds.length;
    newGroupIndex += 1
  ) {
    const newGroupQuestions = findOrderedQuestionsByGroupId(
      questions,
      groupIds[newGroupIndex],
    );

    if (newGroupQuestions.length !== 0) {
      for (let i = 0; i < newGroupQuestions.length; i += 1) {
        if (newGroupQuestions[i].id !== questionId)
          return newGroupQuestions[i].id;
      }
    }
  }
  return null;
};
