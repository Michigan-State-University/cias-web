import produce from 'immer';

import { EDIT_SECTION_REQUEST, EDIT_SECTION_SUCCESS } from './constants';

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionReducer = (state = null, action) =>
  produce(state, () => {
    const { type, payload } = action;

    switch (type) {
      case EDIT_SECTION_REQUEST:
      case EDIT_SECTION_SUCCESS: {
        return { ...state, ...payload.dashboardSection };
      }
    }
  });

export { dashboardSectionReducer };
