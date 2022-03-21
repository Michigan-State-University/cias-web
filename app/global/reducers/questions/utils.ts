import isEmpty from 'lodash/isEmpty';
import findLast from 'lodash/findLast';
import { Draft } from 'immer';
import { IntlFormatters } from 'react-intl';

import { readQuestionBlockType } from 'models/Narrator/BlockTypes';
import { GroupType, QuestionGroupDTO } from 'models/QuestionGroup';
import { QuestionDTO, QuestionTypes } from 'models/Question';
import { NarratorDTO } from 'models/Narrator';
import findOrderedQuestionsByGroupId from 'utils/findOrderedQuestionsByGroupId';
import { splitAndKeep } from 'utils/splitAndKeep';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import globalMessages from 'global/i18n/globalMessages';
import { assignDraftItemsById, updateItemById } from 'utils/reduxUtils';

const DELIMITERS = [',', '.', '?', '!'];

export const mapQuestionDataForType = (question: QuestionDTO) => {
  switch (question.type) {
    case QuestionTypes.FREE_RESPONSE:
    case QuestionTypes.NUMBER:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [{ variable: { name: '', value: '1' }, payload: '' }],
        },
      };

    case QuestionTypes.GRID:
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

export const generateTTSArray = (text: string) =>
  splitAndKeep(htmlToPlainText(text), DELIMITERS);

export const getFromQuestionTTS = (question: QuestionDTO) => {
  const { settings: { subtitle } = { subtitle: true } } = question;

  switch (question.type) {
    case QuestionTypes.TLFB_EVENTS: {
      const {
        body: {
          data: [
            {
              payload: { screen_question: screenQuestion },
            },
          ],
        },
      } = question;
      return generateTTSArray(screenQuestion);
    }

    case QuestionTypes.TLFB_QUESTION: {
      const {
        body: {
          data: [
            {
              payload: { head_question: headQuestion },
            },
          ],
        },
      } = question;
      return generateTTSArray(headQuestion);
    }

    default:
      return question.subtitle && subtitle
        ? generateTTSArray(question.subtitle)
        : [];
  }
};

export const assignFromQuestionTTS = (question: QuestionDTO) => ({
  ...question,
  narrator: {
    ...question.narrator,
    blocks: question.narrator.blocks.map((block) => {
      if (block.type === readQuestionBlockType)
        return {
          ...block,
          text: getFromQuestionTTS(question),
        };

      return block;
    }),
  },
});

/* eslint-disable default-case, no-param-reassign */
export const editQuestionSuccessCommon = (
  draft: Draft<any>,
  payload: { question: QuestionDTO },
) => {
  draft.loaders.updateQuestionLoading = false;
  draft.errors.updateQuestionError = null;

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
export const editQuestionErrorCommon = (draft: Draft<any>, payload: any) => {
  draft.errors.updateQuestionError = payload?.error || 'Error!';
  draft.loaders.updateQuestionLoading = false;

  assignDraftItemsById(
    draft.cache.questions,
    draft.questions,
    payload.questionId,
  );
};

export const getNewQuestionIdInsideGroup = (
  questions: QuestionDTO,
  groupId: string,
  removedQuestionId: string,
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
  questions: QuestionDTO[],
  groupIndex: number,
  groupIds: string[],
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
    if (!isEmpty(newGroupQuestions)) {
      return newGroupQuestions[newGroupQuestions.length - 1].id;
    }
  }
  return null;
};

export const getNewQuestionIdInNextGroups = (
  questions: QuestionDTO[],
  groupIndex: number,
  groupIds: string[],
  questionId: string,
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

    if (!isEmpty(newGroupQuestions)) {
      for (let i = 0; i < newGroupQuestions.length; i += 1) {
        if (newGroupQuestions[i].id !== questionId)
          return newGroupQuestions[i].id;
      }
    }
  }
  return null;
};

export const getNewGroupPosition = (groups: QuestionGroupDTO[]) => {
  const lastPlainGroup = findLast(
    groups,
    ({ type }) => type === GroupType.PLAIN,
  );

  return lastPlainGroup ? lastPlainGroup.position + 1 : 1;
};

export const prepareNewGroupQuestions = (
  groupType: GroupType,
  formatMessage: IntlFormatters['formatMessage'],
  narrator: NarratorDTO['settings'],
) => {
  if (groupType === GroupType.TLFB) {
    const config = {
      ...instantiateEmptyQuestion(
        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_CONFIG],
        ),
        QuestionTypes.TLFB_CONFIG,
        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_CONFIG],
        ),
      ),
      narrator: { blocks: [], settings: narrator },
    };
    const events = {
      ...instantiateEmptyQuestion(
        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_EVENTS],
        ),
        QuestionTypes.TLFB_EVENTS,

        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_EVENTS],
        ),
      ),
      narrator: { blocks: [], settings: narrator },
    };
    const question = {
      ...instantiateEmptyQuestion(
        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_QUESTION],
        ),
        QuestionTypes.TLFB_QUESTION,
        formatMessage(
          // @ts-ignore
          globalMessages.defaultTlfbTitles[QuestionTypes.TLFB_QUESTION],
        ),
      ),
      narrator: { blocks: [], settings: narrator },
    };
    return [config, events, question];
  }
};
