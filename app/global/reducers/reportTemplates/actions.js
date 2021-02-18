/*
 *
 * ReportTemplates actions
 *
 */

import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_REPORT_TEMPLATES_REQUEST,
  FETCH_REPORT_TEMPLATES_SUCCESS,
  FETCH_REPORT_TEMPLATES_FAILURE,
  ADD_REPORT_TEMPLATE_REQUEST,
  ADD_REPORT_TEMPLATE_SUCCESS,
  ADD_REPORT_TEMPLATE_FAILURE,
  SELECT_REPORT_TEMPLATE,
  UPDATE_REPORT_TEMPLATE_REQUEST,
  UPDATE_REPORT_TEMPLATE_SUCCESS,
  UPDATE_REPORT_TEMPLATE_FAILURE,
  DELETE_REPORT_TEMPLATE_REQUEST,
  DELETE_REPORT_TEMPLATE_SUCCESS,
  DELETE_REPORT_TEMPLATE_FAILURE,
  DELETE_REPORT_TEMPLATE_LOGO_REQUEST,
  DELETE_REPORT_TEMPLATE_LOGO_SUCCESS,
  DELETE_REPORT_TEMPLATE_LOGO_FAILURE,
} from './constants';

export const fetchReportTemplatesRequest = (sessionId, interventionId) =>
  actionBuilder(FETCH_REPORT_TEMPLATES_REQUEST, { sessionId, interventionId });
export const fetchReportTemplatesSuccess = reportTemplates =>
  actionBuilder(FETCH_REPORT_TEMPLATES_SUCCESS, { reportTemplates });
export const fetchReportTemplatesFailure = error =>
  actionBuilder(FETCH_REPORT_TEMPLATES_FAILURE, error);

export const addReportTemplateRequest = (sessionId, reportTemplate) =>
  actionBuilder(ADD_REPORT_TEMPLATE_REQUEST, { reportTemplate, sessionId });
export const addReportTemplateSuccess = reportTemplate =>
  actionBuilder(ADD_REPORT_TEMPLATE_SUCCESS, { reportTemplate });
export const addReportTemplateFailure = error =>
  actionBuilder(ADD_REPORT_TEMPLATE_FAILURE, error);

export const updateReportTemplateRequest = (
  sessionId,
  reportTemplate,
  imageData,
) =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_REQUEST, {
    reportTemplate,
    sessionId,
    imageData,
  });
export const updateReportTemplateSuccess = reportTemplate =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_SUCCESS, { reportTemplate });
export const updateReportTemplateFailure = error =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_FAILURE, error);

export const deleteReportTemplateRequest = (sessionId, id) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_REQUEST, { id, sessionId });
export const deleteReportTemplateSuccess = () =>
  actionBuilder(DELETE_REPORT_TEMPLATE_SUCCESS, {});
export const deleteReportTemplateFailure = error =>
  actionBuilder(DELETE_REPORT_TEMPLATE_FAILURE, error);

export const deleteReportTemplateLogoRequest = (sessionId, id) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_REQUEST, { id, sessionId });
export const deleteReportTemplateLogoSuccess = () =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_SUCCESS, {});
export const deleteReportTemplateLogoFailure = error =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_FAILURE, error);

export const selectReportTemplate = id =>
  actionBuilder(SELECT_REPORT_TEMPLATE, { id });
