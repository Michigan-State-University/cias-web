export const UPDATE_INTERVENTION = '@updateIntervention';
export const GET_SESSION_QUESTION_GROUPS = '@getSessionQuestionGroups';
export const CREATE_QUESTION = '@createQuestion';
export const UPDATE_QUESTION = '@updateQuestion';
export const ANSWER_QUESTION = '@answerQuestion';

export const ALIASES = {
  [UPDATE_INTERVENTION]: {
    METHOD: 'PATCH',
    URL: '**/problems/*',
    ALIAS: UPDATE_INTERVENTION.slice(1),
  },
  [GET_SESSION_QUESTION_GROUPS]: {
    METHOD: 'GET',
    URL: '**/interventions/*/question_groups',
    ALIAS: GET_SESSION_QUESTION_GROUPS.slice(1),
  },
  [CREATE_QUESTION]: {
    METHOD: 'POST',
    URL: '**/question_groups/*/questions',
    ALIAS: CREATE_QUESTION.slice(1),
  },
  [UPDATE_QUESTION]: {
    METHOD: 'PUT',
    URL: '**/question_groups/*/questions/*',
    ALIAS: UPDATE_QUESTION.slice(1),
  },
  [ANSWER_QUESTION]: {
    METHOD: 'POST',
    URL: '**/questions/*/answers',
    ALIAS: ANSWER_QUESTION.slice(1),
  },
};
