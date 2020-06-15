import defaultQuestionSettingsReducer from './DefaultSettings/reducer';

/* eslint-disable default-case, no-param-reassign */
const questionSettingsReducer = (question, data) => {
  switch (question.type) {
    default:
      return defaultQuestionSettingsReducer(question, data);
  }
};

export default questionSettingsReducer;
