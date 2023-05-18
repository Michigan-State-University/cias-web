import { QuestionDTO, QuestionTypes } from 'models/Question';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';

import { splitAndKeep } from './splitAndKeep';
import { htmlToPlainText } from './htmlToPlainText';

const DELIMITERS = [',', '.', '?', '!'];

export const generateTTSArray = (text: string) =>
  splitAndKeep(htmlToPlainText(text), DELIMITERS);

export const getFromQuestionTTS = (question: QuestionDTO) => {
  switch (question.type) {
    case QuestionTypes.TLFB_CONFIG:
      return [];

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

    default: {
      const { settings: { subtitle } = { subtitle: true } } = question;
      return question.subtitle && subtitle
        ? generateTTSArray(question.subtitle)
        : [];
    }
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
