import {
  gridQuestion,
  textboxQuestion,
  numberQuestion,
} from 'models/Intervention/QuestionTypes';
import { splitAndKeep } from 'utils/splitAndKeep';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';

export const mapQuestionDataForType = question => {
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

export const getFromQuestionTTS = question => {
  const delimiters = [',', '.', '?', '!'];

  const subtileTTS = question.subtitle
    ? splitAndKeep(htmlToPlainText(question.subtitle), delimiters)
    : [];

  return subtileTTS;
};

export const assignFromQuestionTTS = (draft, state) => {
  const { narrator } = draft.questions[state.selectedQuestion];
  const readQuestionBlockIndex = narrator.blocks.findIndex(
    ({ type }) => type === readQuestionBlockType,
  );

  if (readQuestionBlockIndex !== -1)
    narrator.blocks[readQuestionBlockIndex] = {
      ...narrator.blocks[readQuestionBlockIndex],
      text: getFromQuestionTTS(draft.questions[state.selectedQuestion]),
    };
};

/* eslint-disable default-case, no-param-reassign */
export const editQuestionSuccessCommon = (draft, payload) => {
  draft.loaders.updateQuestionLoading = false;
  const index = draft.questions.findIndex(
    question => question.id === payload.question.id,
  );
  draft.questions[index] = mapQuestionDataForType(payload.question);
  draft.cache.questions = draft.questions;
};

/* eslint-disable default-case, no-param-reassign */
export const editQuestionErrorCommon = (draft, payload) => {
  draft.loaders.updateQuestionLoading = false;
  const finder = question => question.id === payload.questionId;
  const cacheIndex = draft.cache.questions.findIndex(finder);
  const index = draft.questions.findIndex(finder);
  if (cacheIndex > -1 && index > -1)
    draft.questions[index] = draft.cache.questions[cacheIndex];
};
