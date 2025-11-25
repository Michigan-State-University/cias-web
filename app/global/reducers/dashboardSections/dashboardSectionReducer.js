import produce from 'immer';

import { deleteItemById, updateItemById } from 'utils/reduxUtils';

import {
  ADD_CHART_SUCCESS,
  COPY_CHART_SUCCESS,
  DELETE_CHART_SUCCESS,
  EDIT_CHART_REQUEST,
  EDIT_CHART_SUCCESS,
  EDIT_SECTION_REQUEST,
  EDIT_SECTION_SUCCESS,
  REORDER_CHARTS_REQUEST,
  SET_CHARTS_DATA,
  SET_CHARTS_FILTERS,
} from './constants';
import { chartReducer } from './chartReducer';

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionReducer = (state = null, action = null) =>
  produce(state, (draft) => {
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

      case EDIT_CHART_REQUEST:
      case EDIT_CHART_SUCCESS: {
        updateItemById(draft.charts, payload.chart.id, (item) =>
          chartReducer(item, action),
        );

        break;
      }

      case DELETE_CHART_SUCCESS: {
        deleteItemById(draft.charts, payload.chartId);

        break;
      }

      case COPY_CHART_SUCCESS: {
        draft.charts.push(payload.chart);

        break;
      }

      case SET_CHARTS_DATA: {
        updateItemById(draft.charts, payload.chartId, (item) =>
          chartReducer(item, action),
        );
        break;
      }

      case SET_CHARTS_FILTERS: {
        if (draft.charts) {
          for (let i = 0; i < draft.charts.length; i++)
            updateItemById(draft.charts, draft.charts[i].id, (item) =>
              chartReducer(item, action),
            );
        }
        break;
      }

      case REORDER_CHARTS_REQUEST: {
        draft.charts = payload.charts;
        break;
      }
    }
  });

export { dashboardSectionReducer };
