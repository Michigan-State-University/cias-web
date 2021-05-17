import produce from 'immer';

import {
  ADD_CHART_SUCCESS,
  EDIT_SECTION_REQUEST,
  EDIT_SECTION_SUCCESS,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionReducer = (state = null, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case EDIT_SECTION_REQUEST:
      case EDIT_SECTION_SUCCESS: {
        return { ...state, ...payload.dashboardSection };
      }

      case ADD_CHART_SUCCESS: {
        draft.charts.push(payload.chart);

        break;
      }
    }
  });

export { dashboardSectionReducer };
