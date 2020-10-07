import produce from 'immer';

import { GET_QUESTION_GROUPS_SUCCESS } from './constants';

export const initialState = {
  groups: [],
};

/* eslint-disable default-case, no-param-reassign */
const questionGroupsReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case GET_QUESTION_GROUPS_SUCCESS: {
        draft.groups = payload.groups;
        break;
      }
    }
  });

export { questionGroupsReducer };
