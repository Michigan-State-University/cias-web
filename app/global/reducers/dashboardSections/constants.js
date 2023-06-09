import { colors } from 'theme';

export const ADD_SECTION_REQUEST = 'app/dashboardSections/ADD_SECTION_REQUEST';
export const ADD_SECTION_SUCCESS = 'app/dashboardSections/ADD_SECTION_SUCCESS';
export const ADD_SECTION_ERROR = 'app/dashboardSections/ADD_SECTION_ERROR';

export const FETCH_SECTION_REQUEST =
  'app/dashboardSections/FETCH_SECTION_REQUEST';
export const FETCH_SECTION_SUCCESS =
  'app/dashboardSections/FETCH_SECTION_SUCCESS';
export const FETCH_SECTION_ERROR = 'app/dashboardSections/FETCH_SECTION_ERROR';

export const FETCH_SECTIONS_REQUEST =
  'app/dashboardSections/FETCH_SECTIONS_REQUEST';
export const FETCH_SECTIONS_SUCCESS =
  'app/dashboardSections/FETCH_SECTIONS_SUCCESS';
export const FETCH_SECTIONS_ERROR =
  'app/dashboardSections/FETCH_SECTIONS_ERROR';

export const EDIT_SECTION_REQUEST =
  'app/dashboardSections/EDIT_SECTION_REQUEST';
export const EDIT_SECTION_SUCCESS =
  'app/dashboardSections/EDIT_SECTION_SUCCESS';
export const EDIT_SECTION_ERROR = 'app/dashboardSections/EDIT_SECTION_ERROR';

export const DELETE_SECTION_REQUEST =
  'app/dashboardSections/DELETE_SECTION_REQUEST';
export const DELETE_SECTION_SUCCESS =
  'app/dashboardSections/DELETE_SECTION_SUCCESS';
export const DELETE_SECTION_ERROR =
  'app/dashboardSections/DELETE_SECTION_ERROR';

export const ADD_CHART_REQUEST = 'app/dashboardSections/ADD_CHART_REQUEST';
export const ADD_CHART_SUCCESS = 'app/dashboardSections/ADD_CHART_SUCCESS';
export const ADD_CHART_ERROR = 'app/dashboardSections/ADD_CHART_ERROR';

export const EDIT_CHART_REQUEST = 'app/dashboardSections/EDIT_CHART_REQUEST';
export const EDIT_CHART_SUCCESS = 'app/dashboardSections/EDIT_CHART_SUCCESS';
export const EDIT_CHART_ERROR = 'app/dashboardSections/EDIT_CHART_ERROR';

export const DELETE_CHART_REQUEST =
  'app/dashboardSections/DELETE_CHART_REQUEST';
export const DELETE_CHART_SUCCESS =
  'app/dashboardSections/DELETE_CHART_SUCCESS';
export const DELETE_CHART_ERROR = 'app/dashboardSections/DELETE_CHART_ERROR';

export const COPY_CHART_REQUEST = 'app/dashboardSections/COPY_CHART_REQUEST';
export const COPY_CHART_SUCCESS = 'app/dashboardSections/COPY_CHART_SUCCESS';
export const COPY_CHART_ERROR = 'app/dashboardSections/COPY_CHART_ERROR';

export const SELECT_CHART_ACTION = 'app/dashboardSections/SELECT_CHART_ACTION';
export const SET_CHARTS_DATA = 'app/dashboardSections/SET_CHARTS_DATA';
export const SET_CHARTS_FILTERS = 'app/dashboardSections/SET_CHARTS_FILTERS';

export const REORDER_DASHBOARD_SECTIONS_REQUEST =
  'app/dashboardSections/REORDER_DASHBOARD_SECTIONS_REQUEST';
export const REORDER_DASHBOARD_SECTIONS_SUCCESS =
  'app/dashboardSections/REORDER_DASHBOARD_SECTIONS_SUCCESS';
export const REORDER_DASHBOARD_SECTIONS_FAILURE =
  'app/dashboardSections/REORDER_DASHBOARD_SECTIONS_FAILURE';

export const REORDER_CHARTS_REQUEST =
  'app/dashboardSections/REORDER_CHARTS_REQUEST';
export const REORDER_CHARTS_SUCCESS =
  'app/dashboardSections/REORDER_CHARTS_SUCCESS';
export const REORDER_CHARTS_FAILURE =
  'app/dashboardSections/REORDER_CHARTS_FAILURE';

/**
 * @description Chart Type used by the API; DTO of charts uses this type internally
 * @readonly
 * @enum {string}
 */
export const ChartTypeDto = {
  PIE_CHART: 'pie_chart',
  NUMERIC_BAR_CHART: 'bar_chart',
  PERCENTAGE_BAR_CHART: 'percentage_bar_chart',
};

/**
 * @readonly
 * @enum {string}
 */
export const ChartStatus = {
  DRAFT: 'draft',
  DATA_COLLECTION: 'data_collection',
  PUBLISHED: 'published',
};

export const ChartStatusToColorMap = {
  [ChartStatus.DRAFT]: colors.jungleGreen,
  [ChartStatus.DATA_COLLECTION]: colors.bluewood,
  [ChartStatus.PUBLISHED]: colors.pistachio,
};

export const ALLOWED_CHART_EDIT = [ChartStatus.DRAFT];

export const StatusPermissions = (status) => ({
  canBeEdited: ALLOWED_CHART_EDIT.includes(status),
});
