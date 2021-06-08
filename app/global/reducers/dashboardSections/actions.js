import { actionBuilder } from 'utils/actionBuilder';

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
  SELECT_CHART_ACTION,
} from './constants';

export const addDashboardSectionRequest = (organizationId, name) =>
  actionBuilder(ADD_SECTION_REQUEST, { name, organizationId });
export const addDashboardSectionSuccess = dashboardSection =>
  actionBuilder(ADD_SECTION_SUCCESS, { dashboardSection });
export const addDashboardSectionError = error =>
  actionBuilder(ADD_SECTION_ERROR, { error });

export const fetchDashboardSectionRequest = (
  dashboardSectionId,
  organizationId,
) =>
  actionBuilder(FETCH_SECTION_REQUEST, { organizationId, dashboardSectionId });
export const fetchDashboardSectionSuccess = dashboardSection =>
  actionBuilder(FETCH_SECTION_SUCCESS, { dashboardSection });
export const fetchDashboardSectionError = error =>
  actionBuilder(FETCH_SECTION_ERROR, { error });

export const fetchDashboardSectionsRequest = (
  organizationId,
  fromDashboardView,
) =>
  actionBuilder(FETCH_SECTIONS_REQUEST, { organizationId, fromDashboardView });
export const fetchDashboardSectionsSuccess = dashboardSections =>
  actionBuilder(FETCH_SECTIONS_SUCCESS, { dashboardSections });
export const fetchDashboardSectionsError = error =>
  actionBuilder(FETCH_SECTIONS_ERROR, { error });

export const editDashboardSectionRequest = (
  dashboardSection,
  dashboardSectionId,
) =>
  actionBuilder(EDIT_SECTION_REQUEST, { dashboardSection, dashboardSectionId });
export const editDashboardSectionSuccess = (
  dashboardSection,
  dashboardSectionId,
) =>
  actionBuilder(EDIT_SECTION_SUCCESS, { dashboardSection, dashboardSectionId });
export const editDashboardSectionError = error =>
  actionBuilder(EDIT_SECTION_ERROR, { error });

export const deleteDashboardSectionRequest = (
  dashboardSectionId,
  organizationId,
) =>
  actionBuilder(DELETE_SECTION_REQUEST, { dashboardSectionId, organizationId });
export const deleteDashboardSectionSuccess = (
  dashboardSectionId,
  organizationId,
) =>
  actionBuilder(DELETE_SECTION_SUCCESS, { dashboardSectionId, organizationId });
export const deleteDashboardSectionError = error =>
  actionBuilder(DELETE_SECTION_ERROR, { error });

export const addChartRequest = (
  dashboardSectionId,
  chartType,
  name,
  description,
) =>
  actionBuilder(ADD_CHART_REQUEST, {
    name,
    description,
    dashboardSectionId,
    chartType,
  });
export const addChartSuccess = (chart, dashboardSectionId) =>
  actionBuilder(ADD_CHART_SUCCESS, { chart, dashboardSectionId });
export const addChartError = error => actionBuilder(ADD_CHART_ERROR, { error });

export const editChartRequest = chart =>
  actionBuilder(EDIT_CHART_REQUEST, {
    chart,
  });
export const editChartSuccess = chart =>
  actionBuilder(EDIT_CHART_SUCCESS, { chart });
export const editChartError = error =>
  actionBuilder(EDIT_CHART_ERROR, { error });

export const deleteChartRequest = (chartId, dashboardSectionId) =>
  actionBuilder(DELETE_CHART_REQUEST, {
    chartId,
    dashboardSectionId,
  });
export const deleteChartSuccess = (chartId, dashboardSectionId) =>
  actionBuilder(DELETE_CHART_SUCCESS, { chartId, dashboardSectionId });
export const deleteChartError = error =>
  actionBuilder(DELETE_CHART_ERROR, { error });

export const selectChartAction = (dashboardSectionId, chartId) =>
  actionBuilder(SELECT_CHART_ACTION, {
    dashboardSectionId,
    chartId,
  });
