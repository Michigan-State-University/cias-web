import produce from 'immer';

import {
  EDIT_CHART_REQUEST,
  EDIT_CHART_SUCCESS,
  SET_CHARTS_DATA,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = null, action) =>
  produce(state, () => {
    const { type, payload } = action;

    switch (type) {
      case EDIT_CHART_REQUEST:
      case EDIT_CHART_SUCCESS: {
        return { ...state, ...payload.chart };
      }
      case SET_CHARTS_DATA: {
        return { ...state, chartData: payload.data };
      }
    }
  });

export { chartReducer };
