import produce from 'immer';
import { CHANGE_CURRENT_INTERVENTION } from './constants';

export const initialState = {
  currentInterventionIndex: 0,
};

/* eslint-disable default-case, no-param-reassign */
const localStateReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case CHANGE_CURRENT_INTERVENTION:
        draft.currentInterventionIndex = payload.index;
        break;
    }
  });

export { localStateReducer };
