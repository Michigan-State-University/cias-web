import {
  UPDATE_QUESTION_SETTINGS,
  ADD_BLOCK,
  UPDATE_NARRATOR_SETTINGS,
} from './constants';

const instantiateBlockForType = type => {
  switch (type) {
    case 'BodyAnimation':
      return { type: 'BodyAnimation', animation: null };
    case 'Speech':
      return { type: 'Speech', text: null };
    default:
      return undefined;
  }
};

/* eslint-disable default-case, no-param-reassign */
const defaultQuestionSettingsReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_QUESTION_SETTINGS:
      return {
        ...question,
        settings: {
          ...question.settings,
          [payload.data.property]: payload.data.value,
        },
      };

    case UPDATE_NARRATOR_SETTINGS:
      return {
        ...question,
        narrator: {
          ...question.narrator,
          settings: {
            ...question.narrator.settings,
            [payload.data.property]: payload.data.value,
          },
        },
      };

    case ADD_BLOCK:
      return {
        ...question,
        narrator: {
          ...question.narrator,
          blocks: [
            ...question.narrator.blocks,
            instantiateBlockForType(payload.data.type),
          ],
        },
      };

    default:
      return question;
  }
};

export default defaultQuestionSettingsReducer;
