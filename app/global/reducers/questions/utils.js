import findLast from 'lodash/findLast';

import findOrderedQuestionsByGroupId from 'utils/findOrderedQuestionsByGroupId';
import {
  gridQuestion,
  textboxQuestion,
  numberQuestion,
  tlfbConfig,
  tlfbEvents,
  tlfbQuestion,
} from 'models/Session/QuestionTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { GroupType } from 'models/QuestionGroup';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import globalMessages from 'global/i18n/globalMessages';

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
  const index = draft.questions.findIndex(
    (question) => question.id === payload.question.id,
  );
  draft.questions[index] = mapQuestionDataForType(payload.question);
  draft.cache.questions = draft.questions;
};

/* eslint-disable default-case, no-param-reassign */
export const editQuestionErrorCommon = (draft, payload) => {
  draft.loaders.updateQuestionLoading = false;
  const finder = (question) => question.id === payload.questionId;
  const cacheIndex = draft.cache.questions.findIndex(finder);
  const index = draft.questions.findIndex(finder);
  if (cacheIndex !== -1 && index !== -1)
    draft.questions[index] = draft.cache.questions[cacheIndex];
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

export const getNewGroupPosition = (groups) => {
  const lastPlainGroup = findLast(
    groups,
    ({ type }) => type === GroupType.PLAIN,
  );

  return isNullOrUndefined(lastPlainGroup) ? 1 : lastPlainGroup.position + 1;
};

export const prepareNewGroupQuestions = (
  groupType,
  formatMessage,
  narrator,
) => {
  if (groupType === GroupType.TLFB) {
    const config = {
      ...instantiateEmptyQuestion(
        formatMessage(globalMessages.defaultTlfbTitles[tlfbConfig.id]),
        tlfbConfig.id,
        formatMessage(globalMessages.defaultTlfbTitles[tlfbConfig.id]),
      ),
      narrator: { blocks: [], settings: narrator },
      body: { data: [{ payload: '' }] },
    };
    const events = {
      ...instantiateEmptyQuestion(
        formatMessage(globalMessages.defaultTlfbTitles[tlfbEvents.id]),
        tlfbEvents.id,
        formatMessage(globalMessages.defaultTlfbTitles[tlfbEvents.id]),
      ),
      narrator: { blocks: [], settings: narrator },
    };
    const question = {
      ...instantiateEmptyQuestion(
        formatMessage(globalMessages.defaultTlfbTitles[tlfbQuestion.id]),
        tlfbQuestion.id,
        formatMessage(globalMessages.defaultTlfbTitles[tlfbQuestion.id]),
      ),
      narrator: { blocks: [], settings: narrator },
    };
    return [config, events, question];
  }
};
