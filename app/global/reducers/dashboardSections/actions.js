import { actionBuilder } from 'utils/actionBuilder';

import {
  ADD_SECTION_ERROR,
  ADD_SECTION_REQUEST,
  ADD_SECTION_SUCCESS,
  DELETE_SECTION_ERROR,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  EDIT_SECTION_ERROR,
  EDIT_SECTION_REQUEST,
  EDIT_SECTION_SUCCESS,
  FETCH_SECTION_ERROR,
  FETCH_SECTION_REQUEST,
  FETCH_SECTION_SUCCESS,
  FETCH_SECTIONS_ERROR,
  FETCH_SECTIONS_REQUEST,
  FETCH_SECTIONS_SUCCESS,
} from './constants';

export const addDashboardSectionRequest = (name, organizationId) =>
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

export const fetchDashboardSectionsRequest = organizationId =>
  actionBuilder(FETCH_SECTIONS_REQUEST, { organizationId });
export const fetchDashboardSectionsSuccess = dashboardSections =>
  actionBuilder(FETCH_SECTIONS_SUCCESS, { dashboardSections });
export const fetchDashboardSectionsError = error =>
  actionBuilder(FETCH_SECTIONS_ERROR, { error });

export const editDashboardSectionRequest = dashboardSection =>
  actionBuilder(EDIT_SECTION_REQUEST, { dashboardSection });
export const editDashboardSectionSuccess = dashboardSection =>
  actionBuilder(EDIT_SECTION_SUCCESS, { dashboardSection });
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
