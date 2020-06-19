import { UPDATE_SETTINGS, ADD_BLOCK } from './constants';

const instantiateBlockForType = type => {
  switch (type) {
    case 'BodyAnimation':
      return { type: 'BodyAnimation', animation: 'MoveLeft' };
    case 'Speech':
      return {
        type: 'Speech',
        text: 'This is a first sentence. This is a second sentence.',
      };
    default:
      return undefined;
  }
};

/* eslint-disable default-case, no-param-reassign */
const defaultQuestionSettingsReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_SETTINGS:
      return {
        ...question,
        settings: {
          ...question.settings,
          [payload.data.property]: payload.data.value,
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
