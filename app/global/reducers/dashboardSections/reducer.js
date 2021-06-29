import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import { assignDraftItemsById, updateItemById } from 'utils/reduxUtils';

import { dashboardSectionReducer } from './dashboardSectionReducer';
import {
  ADD_CHART_ERROR,
  ADD_CHART_REQUEST,
  ADD_CHART_SUCCESS,
  ADD_SECTION_ERROR,
  ADD_SECTION_REQUEST,
  ADD_SECTION_SUCCESS,
  DELETE_CHART_ERROR,
  DELETE_CHART_REQUEST,
  DELETE_CHART_SUCCESS,
  DELETE_SECTION_ERROR,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  EDIT_CHART_ERROR,
  EDIT_CHART_REQUEST,
  EDIT_CHART_SUCCESS,
  EDIT_SECTION_ERROR,
  EDIT_SECTION_REQUEST,
  EDIT_SECTION_SUCCESS,
  FETCH_SECTION_ERROR,
  FETCH_SECTION_REQUEST,
  FETCH_SECTION_SUCCESS,
  FETCH_SECTIONS_ERROR,
  FETCH_SECTIONS_REQUEST,
  FETCH_SECTIONS_SUCCESS,
  COPY_CHART_SUCCESS,
  SELECT_CHART_ACTION,
  SET_CHARTS_DATA,
  SET_CHARTS_FILTERS,
  REORDER_DASHBOARD_SECTIONS_SUCCESS,
  REORDER_DASHBOARD_SECTIONS_FAILURE,
  REORDER_DASHBOARD_SECTIONS_REQUEST,
  REORDER_CHARTS_REQUEST,
} from './constants';

export const initialState = {
  dashboardSections: [],
  singleDashboardSection: null,
  selectedChart: null,
  filters: null,
  cache: { dashboardSections: [], singleDashboardSection: null },
  loaders: {
    fetchDashboardSectionLoader: false,
    fetchDashboardSectionsLoader: false,
    editDashboardSectionLoader: false,
    addDashboardSectionLoader: false,
    deleteDashboardSectionLoader: false,
    addChartLoader: false,
    editChartLoader: false,
    deleteChartLoader: false,
  },
  errors: {
    fetchDashboardSectionError: null,
    fetchDashboardSectionsError: null,
    editDashboardSectionError: null,
    addDashboardSectionError: null,
    deleteDashboardSectionError: null,
    addChartError: null,
    editChartError: null,
    deleteChartError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const dashboardSectionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case ADD_SECTION_REQUEST: {
        draft.loaders.addDashboardSectionLoader = true;
        draft.errors.addDashboardSectionError = null;
        break;
      }

      case ADD_SECTION_SUCCESS: {
        draft.loaders.addDashboardSectionLoader = false;
        draft.errors.addDashboardSectionError = null;

        draft.dashboardSections.push(payload.dashboardSection);
        draft.cache.dashboardSections.push(cloneDeep(payload.dashboardSection));
        break;
      }
      case ADD_SECTION_ERROR: {
        draft.loaders.addDashboardSectionLoader = false;
        draft.errors.addDashboardSectionError = payload.error;
        break;
      }

      case DELETE_SECTION_REQUEST: {
        draft.loaders.deleteDashboardSectionLoader = true;
        draft.errors.deleteDashboardSectionError = null;
        break;
      }

      case DELETE_SECTION_SUCCESS: {
        draft.loaders.deleteDashboardSectionLoader = false;
        draft.errors.deleteDashboardSectionError = null;
        break;
      }
      case DELETE_SECTION_ERROR: {
        draft.loaders.deleteDashboardSectionLoader = false;
        draft.errors.deleteDashboardSectionError = payload.error;
        break;
      }

      case EDIT_SECTION_REQUEST: {
        draft.loaders.editDashboardSectionLoader = true;
        draft.errors.editDashboardSectionError = null;

        updateItemById(
          draft.dashboardSections,
          payload.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        break;
      }

      case EDIT_SECTION_SUCCESS: {
        draft.loaders.editDashboardSectionLoader = false;
        draft.errors.editDashboardSectionError = null;

        assignDraftItemsById(
          draft.dashboardSections,
          draft.cache.dashboardSections,
          payload.dashboardSectionId,
        );
        break;
      }

      case EDIT_SECTION_ERROR: {
        draft.loaders.editDashboardSectionLoader = false;
        draft.errors.editDashboardSectionError = payload.error;

        draft.dashboardSections = state.cache.dashboardSections;
        break;
      }

      case FETCH_SECTION_REQUEST: {
        draft.loaders.fetchDashboardSectionLoader = true;
        draft.errors.fetchDashboardSectionError = null;
        break;
      }

      case FETCH_SECTION_SUCCESS: {
        draft.loaders.fetchDashboardSectionLoader = false;
        draft.errors.fetchDashboardSectionError = null;

        draft.singleDashboardSection = payload.dashboardSection;
        draft.cache.singleDashboardSection = cloneDeep(
          payload.dashboardSection,
        );
        break;
      }

      case FETCH_SECTION_ERROR: {
        draft.loaders.fetchDashboardSectionLoader = false;
        draft.errors.fetchDashboardSectionError = payload.error;
        break;
      }

      case FETCH_SECTIONS_REQUEST: {
        draft.loaders.fetchDashboardSectionsLoader = true;
        draft.errors.fetchDashboardSectionsError = null;
        break;
      }

      case FETCH_SECTIONS_SUCCESS: {
        draft.loaders.fetchDashboardSectionsLoader = false;
        draft.errors.fetchDashboardSectionsError = null;

        draft.dashboardSections = payload.dashboardSections;
        draft.cache.dashboardSections = cloneDeep(payload.dashboardSections);
        break;
      }

      case FETCH_SECTIONS_ERROR: {
        draft.loaders.fetchDashboardSectionsLoader = false;
        draft.errors.fetchDashboardSectionsError = payload.error;
        break;
      }

      case ADD_CHART_REQUEST: {
        draft.loaders.addChartLoader = true;
        draft.errors.addChartError = null;
        break;
      }

      case ADD_CHART_SUCCESS: {
        draft.loaders.addChartLoader = false;
        draft.errors.addChartError = null;

        updateItemById(
          draft.dashboardSections,
          payload.chart.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        updateItemById(
          draft.cache.dashboardSections,
          payload.chart.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );
        break;
      }

      case ADD_CHART_ERROR: {
        draft.loaders.addChartLoader = false;
        draft.errors.addChartError = payload.error;
        draft.dashboardSections = state.cache.dashboardSections;

        break;
      }

      case EDIT_CHART_REQUEST: {
        draft.loaders.editChartLoader = true;
        draft.errors.editChartError = null;

        updateItemById(
          draft.dashboardSections,
          payload.chart.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        break;
      }

      case EDIT_CHART_SUCCESS: {
        draft.loaders.editChartLoader = false;
        draft.errors.editChartError = null;

        updateItemById(
          draft.cache.dashboardSections,
          payload.chart.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        break;
      }

      case EDIT_CHART_ERROR: {
        draft.loaders.editChartLoader = false;
        draft.errors.editChartError = payload.error;

        draft.dashboardSections = state.cache.dashboardSections;

        break;
      }

      case DELETE_CHART_REQUEST: {
        draft.loaders.deleteChartLoader = true;
        draft.errors.deleteChartError = null;

        break;
      }

      case DELETE_CHART_SUCCESS: {
        draft.loaders.deleteChartLoader = false;
        draft.errors.deleteChartError = null;

        updateItemById(
          draft.dashboardSections,
          payload.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        updateItemById(
          draft.cache.dashboardSections,
          payload.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );

        if (payload.chartId === state.selectedChart?.chartId)
          draft.selectedChart = null;

        break;
      }

      case DELETE_CHART_ERROR: {
        draft.loaders.deleteChartLoader = false;
        draft.errors.deleteChartError = payload.error;

        break;
      }

      case COPY_CHART_SUCCESS: {
        updateItemById(
          draft.dashboardSections,
          payload.chart.dashboardSectionId,
          item => dashboardSectionReducer(item, action),
        );
        break;
      }

      case SELECT_CHART_ACTION: {
        if (state.selectedChart?.chartId !== payload.chartId)
          draft.selectedChart = {
            chartId: payload.chartId,
            dashboardSectionId: payload.dashboardSectionId,
          };
        else draft.selectedChart = null;

        break;
      }

      case SET_CHARTS_DATA: {
        const { chartsData } = payload;
        for (let i = 0; i < chartsData.length; i++) {
          updateItemById(
            draft.dashboardSections,
            chartsData[i].dashboardSectionId,
            item =>
              dashboardSectionReducer(item, { type, payload: chartsData[i] }),
          );
        }

        break;
      }
      case SET_CHARTS_FILTERS: {
        const { filters } = payload;
        draft.filters = filters;
        for (let i = 0; i < draft.dashboardSections.length; i++) {
          updateItemById(
            draft.dashboardSections,
            draft.dashboardSections[i].id,
            item => dashboardSectionReducer(item, action),
          );
        }
        break;
      }

      case REORDER_DASHBOARD_SECTIONS_REQUEST: {
        const { dashboardSections } = payload;
        draft.cache.dashboardSections = state.dashboardSections;
        draft.dashboardSections = dashboardSections;
        break;
      }

      case REORDER_DASHBOARD_SECTIONS_SUCCESS: {
        draft.cache.dashboardSections = state.dashboardSections;
        break;
      }

      case REORDER_DASHBOARD_SECTIONS_FAILURE: {
        draft.dashboardSections = state.cache.dashboardSections;
        break;
      }

      case REORDER_CHARTS_REQUEST: {
        const { dashboardSectionId } = payload;
        draft.cache.dashboardSections = state.dashboardSections;
        updateItemById(draft.dashboardSections, dashboardSectionId, item =>
          dashboardSectionReducer(item, action),
        );
        break;
      }
    }
  });

export { dashboardSectionsReducer };
