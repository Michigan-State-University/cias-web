import produce from 'immer';

import { EDIT_SECTION_REQUEST } from './constants';

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionReducer = (state = null, action) =>
  produce(state, () => {
    const { type, payload } = action;

    switch (type) {
      case EDIT_SECTION_REQUEST: {
        return { ...state, ...payload.dashboardSection };
      }
    }
  });

export { dashboardSectionReducer };
