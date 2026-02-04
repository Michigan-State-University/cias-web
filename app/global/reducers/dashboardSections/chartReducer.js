import produce from 'immer';

import {
  EDIT_CHART_REQUEST,
  EDIT_CHART_SUCCESS,
  SET_CHARTS_DATA,
  SET_CHARTS_FILTERS,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = null, action = null) =>
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
      case SET_CHARTS_FILTERS: {
        return { ...state, chartData: null };
      }
    }
  });

export { chartReducer };
