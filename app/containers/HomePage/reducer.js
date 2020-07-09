import produce from 'immer';

import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_ERROR,
  CREATE_INTERVENTION_SUCCESS,
} from './constants';

export const initialState = {
  loaders: {
    interventionCreating: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_INTERVENTION_REQUEST:
        draft.loaders.interventionCreating = true;
        break;

      case CREATE_INTERVENTION_SUCCESS:
      case CREATE_INTERVENTION_ERROR:
        draft.loaders.interventionCreating = false;
        break;
    }
  });

export default dashboardPageReducer;
