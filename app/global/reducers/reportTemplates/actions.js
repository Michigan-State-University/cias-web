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
  FETCH_SINGLE_REPORT_TEMPLATE_REQUEST,
  FETCH_SINGLE_REPORT_TEMPLATE_SUCCESS,
  FETCH_SINGLE_REPORT_TEMPLATE_FAILURE,
  ADD_TEMPLATE_SECTION_REQUEST,
  ADD_TEMPLATE_SECTION_SUCCESS,
  ADD_TEMPLATE_SECTION_FAILURE,
  UPDATE_TEMPLATE_SECTION_REQUEST,
  UPDATE_TEMPLATE_SECTION_SUCCESS,
  UPDATE_TEMPLATE_SECTION_FAILURE,
  DELETE_TEMPLATE_SECTION_REQUEST,
  DELETE_TEMPLATE_SECTION_SUCCESS,
  DELETE_TEMPLATE_SECTION_FAILURE,
  ADD_SECTION_CASE_REQUEST,
  ADD_SECTION_CASE_SUCCESS,
  ADD_SECTION_CASE_FAILURE,
  UPDATE_SECTION_CASE_REQUEST,
  UPDATE_SECTION_CASE_SUCCESS,
  UPDATE_SECTION_CASE_FAILURE,
  DELETE_SECTION_CASE_REQUEST,
  DELETE_SECTION_CASE_SUCCESS,
  DELETE_SECTION_CASE_FAILURE,
  DELETE_SECTION_CASE_IMAGE_REQUEST,
  DELETE_SECTION_CASE_IMAGE_SUCCESS,
  DELETE_SECTION_CASE_IMAGE_FAILURE,
  SELECT_TEMPLATE_SECTION,
  GENERATE_TEST_REPORT_REQUEST,
  GENERATE_TEST_REPORT_SUCCESS,
  GENERATE_TEST_REPORT_FAILURE,
  REORDER_TEMPLATE_SECTIONS_REQUEST,
  REORDER_TEMPLATE_SECTIONS_SUCCESS,
  REORDER_TEMPLATE_SECTIONS_ERROR,
  REORDER_SECTION_CASES_REQUEST,
  REORDER_SECTION_CASES_SUCCESS,
  REORDER_SECTION_CASES_FAILURE,
  DUPLICATE_REPORT_TEMPLATE_REQUEST,
  DUPLICATE_REPORT_TEMPLATE_SUCCESS,
  DUPLICATE_REPORT_TEMPLATE_FAILURE,
  DELETE_COVER_LETTER_CUSTOM_LOGO_REQUEST,
  DELETE_COVER_LETTER_CUSTOM_LOGO_SUCCESS,
  DELETE_COVER_LETTER_CUSTOM_LOGO_FAILURE,
  UPLOAD_REPORT_TEMPLATE_LOGO_REQUEST,
  UPLOAD_REPORT_TEMPLATE_LOGO_SUCCESS,
  UPLOAD_REPORT_TEMPLATE_LOGO_FAILURE,
  UPLOAD_COVER_LETTER_CUSTOM_LOGO_REQUEST,
  UPLOAD_COVER_LETTER_CUSTOM_LOGO_SUCCESS,
  UPLOAD_COVER_LETTER_CUSTOM_LOGO_FAILURE,
} from './constants';

export const fetchReportTemplatesRequest = (
  sessionId,
  interventionId,
  showLoader,
) =>
  actionBuilder(FETCH_REPORT_TEMPLATES_REQUEST, {
    sessionId,
    interventionId,
    showLoader,
  });
export const fetchReportTemplatesSuccess = (reportTemplates) =>
  actionBuilder(FETCH_REPORT_TEMPLATES_SUCCESS, { reportTemplates });
export const fetchReportTemplatesFailure = (error) =>
  actionBuilder(FETCH_REPORT_TEMPLATES_FAILURE, error);

export const fetchSingleReportTemplateRequest = (
  reportId,
  sessionId,
  interventionId,
) =>
  actionBuilder(FETCH_SINGLE_REPORT_TEMPLATE_REQUEST, {
    sessionId,
    reportId,
    interventionId,
  });
export const fetchSingleReportTemplateSuccess = (reportTemplate) =>
  actionBuilder(FETCH_SINGLE_REPORT_TEMPLATE_SUCCESS, { reportTemplate });
export const fetchSingleReportTemplateFailure = (error) =>
  actionBuilder(FETCH_SINGLE_REPORT_TEMPLATE_FAILURE, error);

export const duplicateReportTemplateRequest = (
  sessionId,
  reportTemplateId,
  targetSessionId,
) =>
  actionBuilder(DUPLICATE_REPORT_TEMPLATE_REQUEST, {
    sessionId,
    reportTemplateId,
    targetSessionId,
  });
export const duplicateReportTemplateSuccess = (
  reportTemplate,
  addToReportTemplateList,
) =>
  actionBuilder(DUPLICATE_REPORT_TEMPLATE_SUCCESS, {
    reportTemplate,
    addToReportTemplateList,
  });
export const duplicateReportTemplateFailure = () =>
  actionBuilder(DUPLICATE_REPORT_TEMPLATE_FAILURE, {});

export const addReportTemplateRequest = (sessionId, reportTemplate) =>
  actionBuilder(ADD_REPORT_TEMPLATE_REQUEST, { reportTemplate, sessionId });
export const addReportTemplateSuccess = (reportTemplate) =>
  actionBuilder(ADD_REPORT_TEMPLATE_SUCCESS, { reportTemplate });
export const addReportTemplateFailure = (error) =>
  actionBuilder(ADD_REPORT_TEMPLATE_FAILURE, error);

export const updateReportTemplateRequest = (sessionId, reportTemplate) =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_REQUEST, {
    reportTemplate,
    sessionId,
  });
export const updateReportTemplateSuccess = (reportTemplate) =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_SUCCESS, { reportTemplate });
export const updateReportTemplateFailure = (error) =>
  actionBuilder(UPDATE_REPORT_TEMPLATE_FAILURE, error);

export const generateTestReportRequest = (sessionId, reportId) =>
  actionBuilder(GENERATE_TEST_REPORT_REQUEST, {
    sessionId,
    reportId,
  });
export const generateTestReportSuccess = () =>
  actionBuilder(GENERATE_TEST_REPORT_SUCCESS, {});
export const generateTestReportFailure = (error) =>
  actionBuilder(GENERATE_TEST_REPORT_FAILURE, error);

export const deleteReportTemplateRequest = (sessionId, id) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_REQUEST, { id, sessionId });
export const deleteReportTemplateSuccess = () =>
  actionBuilder(DELETE_REPORT_TEMPLATE_SUCCESS, {});
export const deleteReportTemplateFailure = (error) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_FAILURE, error);

export const uploadReportTemplateLogoRequest = (
  sessionId,
  reportTemplateId,
  imageData,
) =>
  actionBuilder(UPLOAD_REPORT_TEMPLATE_LOGO_REQUEST, {
    sessionId,
    reportTemplateId,
    imageData,
  });
export const uploadReportTemplateLogoSuccess = () =>
  actionBuilder(UPLOAD_REPORT_TEMPLATE_LOGO_SUCCESS, {});
export const uploadReportTemplateLogoFailure = (error) =>
  actionBuilder(UPLOAD_REPORT_TEMPLATE_LOGO_FAILURE, error);

export const deleteReportTemplateLogoRequest = (sessionId, reportTemplateId) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_REQUEST, {
    reportTemplateId,
    sessionId,
  });
export const deleteReportTemplateLogoSuccess = () =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_SUCCESS, {});
export const deleteReportTemplateLogoFailure = (error) =>
  actionBuilder(DELETE_REPORT_TEMPLATE_LOGO_FAILURE, error);

export const uploadCoverLetterCustomLogoRequest = (
  sessionId,
  reportTemplateId,
  imageData,
) =>
  actionBuilder(UPLOAD_COVER_LETTER_CUSTOM_LOGO_REQUEST, {
    sessionId,
    reportTemplateId,
    imageData,
  });
export const uploadCoverLetterCustomLogoSuccess = () =>
  actionBuilder(UPLOAD_COVER_LETTER_CUSTOM_LOGO_SUCCESS, {});
export const uploadCoverLetterCustomLogoFailure = (error) =>
  actionBuilder(UPLOAD_COVER_LETTER_CUSTOM_LOGO_FAILURE, error);

export const deleteCoverLetterCustomLogoRequest = (
  sessionId,
  reportTemplateId,
) =>
  actionBuilder(DELETE_COVER_LETTER_CUSTOM_LOGO_REQUEST, {
    reportTemplateId,
    sessionId,
  });
export const deleteCoverLetterCustomLogoSuccess = () =>
  actionBuilder(DELETE_COVER_LETTER_CUSTOM_LOGO_SUCCESS, {});
export const deleteCoverLetterCustomLogoFailure = (error) =>
  actionBuilder(DELETE_COVER_LETTER_CUSTOM_LOGO_FAILURE, error);

export const selectReportTemplate = (id) =>
  actionBuilder(SELECT_REPORT_TEMPLATE, { id });

export const addTemplateSectionRequest = (section, reportId) =>
  actionBuilder(ADD_TEMPLATE_SECTION_REQUEST, { reportId, section });
export const addTemplateSectionSuccess = (section) =>
  actionBuilder(ADD_TEMPLATE_SECTION_SUCCESS, { section });
export const addTemplateSectionFailure = (error) =>
  actionBuilder(ADD_TEMPLATE_SECTION_FAILURE, error);

export const updateTemplateSectionRequest = (section, reportId) =>
  actionBuilder(UPDATE_TEMPLATE_SECTION_REQUEST, { reportId, section });
export const updateTemplateSectionSuccess = (section) =>
  actionBuilder(UPDATE_TEMPLATE_SECTION_SUCCESS, { section });
export const updateTemplateSectionFailure = (error) =>
  actionBuilder(UPDATE_TEMPLATE_SECTION_FAILURE, error);

export const deleteTemplateSectionRequest = (sectionId, reportId) =>
  actionBuilder(DELETE_TEMPLATE_SECTION_REQUEST, { reportId, sectionId });
export const deleteTemplateSectionSuccess = () =>
  actionBuilder(DELETE_TEMPLATE_SECTION_SUCCESS, {});
export const deleteTemplateSectionFailure = (error) =>
  actionBuilder(DELETE_TEMPLATE_SECTION_FAILURE, error);

export const addSectionCaseRequest = (sectionCase, sectionId) =>
  actionBuilder(ADD_SECTION_CASE_REQUEST, {
    sectionCase,
    sectionId,
  });
export const addSectionCaseSuccess = (sectionCase) =>
  actionBuilder(ADD_SECTION_CASE_SUCCESS, { sectionCase });
export const addSectionCaseFailure = (error) =>
  actionBuilder(ADD_SECTION_CASE_FAILURE, error);

export const updateSectionCaseRequest = (
  sectionCase,
  sectionId,
  imageData,
  previewChanged = false,
) =>
  actionBuilder(UPDATE_SECTION_CASE_REQUEST, {
    sectionCase,
    sectionId,
    imageData,
    previewChanged,
  });
export const updateSectionCaseSuccess = (sectionCase) =>
  actionBuilder(UPDATE_SECTION_CASE_SUCCESS, { sectionCase });
export const updateSectionCaseFailure = (error) =>
  actionBuilder(UPDATE_SECTION_CASE_FAILURE, error);

export const deleteSectionCaseRequest = (caseId, sectionId) =>
  actionBuilder(DELETE_SECTION_CASE_REQUEST, { sectionId, caseId });
export const deleteSectionCaseSuccess = () =>
  actionBuilder(DELETE_SECTION_CASE_SUCCESS, {});
export const deleteSectionCaseFailure = (error) =>
  actionBuilder(DELETE_SECTION_CASE_FAILURE, error);

export const deleteSectionCaseImageRequest = (caseId, sectionId) =>
  actionBuilder(DELETE_SECTION_CASE_IMAGE_REQUEST, {
    sectionId,
    caseId,
  });
export const deleteSectionCaseImageSuccess = () =>
  actionBuilder(DELETE_SECTION_CASE_IMAGE_SUCCESS, {});
export const deleteSectionCaseImageFailure = (error) =>
  actionBuilder(DELETE_SECTION_CASE_IMAGE_FAILURE, error);

export const selectTemplateSection = (id) =>
  actionBuilder(SELECT_TEMPLATE_SECTION, { id });

export const reorderTemplateSectionRequest = (reportId, reorderedSections) =>
  actionBuilder(REORDER_TEMPLATE_SECTIONS_REQUEST, {
    reportId,
    reorderedSections,
  });
export const reorderTemplateSectionSuccess = () =>
  actionBuilder(REORDER_TEMPLATE_SECTIONS_SUCCESS, {});
export const reorderTemplateSectionFailure = (error) =>
  actionBuilder(REORDER_TEMPLATE_SECTIONS_ERROR, error);

export const reorderSectionCasesRequest = (sectionId, reorderedCases) =>
  actionBuilder(REORDER_SECTION_CASES_REQUEST, {
    sectionId,
    reorderedCases,
  });
export const reorderSectionCasesSuccess = (sectionId) =>
  actionBuilder(REORDER_SECTION_CASES_SUCCESS, { sectionId });
export const reorderSectionCasesFailure = (sectionId) =>
  actionBuilder(REORDER_SECTION_CASES_FAILURE, { sectionId });
