import produce from 'immer';
import { CHANGE_CURRENT_NARRATOR_BLOCK } from './constants';

export const initialState = {
  currentNarratorBlockIndex: -1,
};

/* eslint-disable default-case, no-param-reassign */
const localStateReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case CHANGE_CURRENT_NARRATOR_BLOCK:
        draft.currentNarratorBlockIndex = payload.index;
        break;
    }
  });

export { localStateReducer };
