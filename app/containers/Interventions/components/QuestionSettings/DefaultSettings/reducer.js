import { UPDATE_SETTINGS } from './constants';

/* eslint-disable default-case, no-param-reassign */
const defaultQuestionSettingsReducer = (question, payload) => {
  switch (payload.type) {
    case UPDATE_SETTINGS:
      return question;

    default:
      return question;
  }
};

export default defaultQuestionSettingsReducer;
