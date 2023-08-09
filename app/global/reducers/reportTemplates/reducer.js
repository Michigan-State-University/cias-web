/*
 *
 * ReportTemplates reducer
 *
 */
import cloneDeep from 'lodash/cloneDeep';
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

import { assignDraftItems } from 'utils/reduxUtils';
import sectionReducer from 'global/reducers/reportTemplates/sectionReducer';
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
  DELETE_REPORT_TEMPLATE_SUCCESS,
  DELETE_REPORT_TEMPLATE_REQUEST,
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
  DUPLICATE_REPORT_TEMPLATE_REQUEST,
  DUPLICATE_REPORT_TEMPLATE_SUCCESS,
  DUPLICATE_REPORT_TEMPLATE_FAILURE,
} from './constants';

export const initialState = {
  reportTemplates: [],
  singleReportTemplate: null,
  selectedReportId: null,
  selectedTemplateSectionId: null,
  cache: {
    reportTemplates: [],
    singleReportTemplate: null,
  },
  loaders: {
    fetchReportTemplatesLoading: true,
    fetchSingleReportTemplateLoading: false,
    duplicateReportTemplateLoading: false,
    addReportTemplateLoading: false,
    updateReportTemplateLoading: false,
    deleteReportTemplateLoading: false,
    deleteReportTemplateLogoLoading: false,
    generateTestReportLoading: false,
    reorderSectionsLoading: false,
    shouldRefetch: false,
  },
  errors: {
    fetchReportTemplatesError: null,
    fetchSingleReportTemplateError: null,
    addReportTemplateError: null,
    updateReportTemplateError: null,
    deleteReportTemplateError: null,
    deleteReportTemplateLogoError: null,
    generateTestReportError: null,
    reorderSectionsError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const reportTemplatesReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_REPORT_TEMPLATES_REQUEST:
        if (isEmpty(state.reportTemplates) || payload.showLoader)
          draft.loaders.fetchReportTemplatesLoading = true;
        draft.errors.fetchReportTemplatesError = null;
        draft.loaders.shouldRefetch = false;
        break;

      case FETCH_REPORT_TEMPLATES_SUCCESS:
        const { reportTemplates } = payload;

        draft.reportTemplates = cloneDeep(reportTemplates);
        draft.cache.reportTemplates = cloneDeep(reportTemplates);

        draft.loaders.fetchReportTemplatesLoading = false;
        draft.errors.fetchReportTemplatesError = null;
        break;

      case FETCH_REPORT_TEMPLATES_FAILURE:
        draft.loaders.fetchReportTemplatesLoading = false;
        draft.errors.fetchReportTemplatesError = payload;

        draft.reportTemplates = cloneDeep(state.cache.reportTemplates);
        break;

      case DUPLICATE_REPORT_TEMPLATE_REQUEST:
        draft.loaders.duplicateReportTemplateLoading = true;
        break;

      case DUPLICATE_REPORT_TEMPLATE_SUCCESS:
        draft.loaders.duplicateReportTemplateLoading = false;
        const { reportTemplate } = payload;
        draft.reportTemplates.push(reportTemplate);
        break;

      case DUPLICATE_REPORT_TEMPLATE_FAILURE:
        draft.loaders.duplicateReportTemplateLoading = false;
        break;

      case ADD_REPORT_TEMPLATE_REQUEST:
        draft.loaders.addReportTemplateLoading = true;
        draft.errors.addReportTemplateError = null;
        break;

      case ADD_REPORT_TEMPLATE_SUCCESS:
        draft.loaders.addReportTemplateLoading = false;
        draft.errors.addReportTemplateError = null;
        draft.loaders.shouldRefetch = true;
        break;

      case ADD_REPORT_TEMPLATE_FAILURE:
        draft.loaders.addReportTemplateLoading = false;
        draft.errors.addReportTemplateError = payload;
        break;

      case UPDATE_REPORT_TEMPLATE_REQUEST: {
        draft.loaders.updateReportTemplateLoading = true;
        draft.errors.updateReportTemplateError = null;

        draft.singleReportTemplate = cloneDeep(payload.reportTemplate);

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.reportTemplate.id,
        );

        if (reportTemplateIndex >= 0)
          draft.reportTemplates[reportTemplateIndex] = cloneDeep(
            payload.reportTemplate,
          );
        break;
      }

      case UPDATE_REPORT_TEMPLATE_SUCCESS: {
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = null;

        draft.singleReportTemplate = cloneDeep(payload.reportTemplate);
        draft.cache.singleReportTemplate = cloneDeep(payload.reportTemplate);

        const reportTemplateCacheIndex = state.cache.reportTemplates.findIndex(
          ({ id }) => id === payload.reportTemplate?.id,
        );

        if (reportTemplateCacheIndex >= 0)
          draft.cache.reportTemplates[reportTemplateCacheIndex] = cloneDeep(
            payload.reportTemplate,
          );

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.reportTemplate?.id,
        );

        if (reportTemplateIndex >= 0)
          draft.reportTemplates[reportTemplateIndex] = cloneDeep(
            payload.reportTemplate,
          );
        break;
      }

      case UPDATE_SECTION_CASE_FAILURE:
      case DELETE_SECTION_CASE_FAILURE:
      case DELETE_SECTION_CASE_IMAGE_FAILURE:
      case ADD_SECTION_CASE_FAILURE:
      case DELETE_TEMPLATE_SECTION_FAILURE:
      case UPDATE_TEMPLATE_SECTION_FAILURE:
      case UPDATE_REPORT_TEMPLATE_FAILURE: {
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = payload;

        draft.reportTemplates = cloneDeep(state.cache.reportTemplates);
        draft.singleReportTemplate = cloneDeep(
          state.cache.singleReportTemplate,
        );
        break;
      }

      case SELECT_REPORT_TEMPLATE:
        draft.selectedReportId = payload.id;

        if (!payload.id) {
          draft.singleReportTemplate = null;
          draft.selectedTemplateSectionId = null;
        }
        break;

      case DELETE_REPORT_TEMPLATE_REQUEST: {
        draft.loaders.deleteReportTemplateLoading = true;
        draft.errors.deleteReportTemplateError = null;

        draft.singleReportTemplate = null;

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.id,
        );

        if (reportTemplateIndex >= 0) {
          draft.reportTemplates.splice(reportTemplateIndex, 1);

          if (payload.id === state.selectedReportId) {
            draft.selectedReportId = null;
            draft.selectedTemplateSectionId = null;
          }
        }
        break;
      }

      case DELETE_REPORT_TEMPLATE_SUCCESS: {
        draft.loaders.deleteReportTemplateLoading = false;
        draft.errors.deleteReportTemplateError = null;
        break;
      }

      case DELETE_REPORT_TEMPLATE_FAILURE: {
        draft.loaders.deleteReportTemplateLoading = false;
        draft.errors.deleteReportTemplateError = payload;

        draft.reportTemplates = cloneDeep(state.cache.reportTemplates);
        draft.singleReportTemplate = cloneDeep(
          state.cache.singleReportTemplate,
        );

        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_REQUEST: {
        draft.loaders.deleteReportTemplateLogoLoading = true;
        draft.errors.deleteReportTemplateLogoError = null;

        draft.singleReportTemplate.logoUrl = null;
        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_SUCCESS: {
        draft.loaders.deleteReportTemplateLogoLoading = false;
        draft.errors.deleteReportTemplateLogoError = null;

        draft.cache.singleReportTemplate = cloneDeep(
          state.singleReportTemplate,
        );

        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_FAILURE: {
        draft.loaders.deleteReportTemplateLogoLoading = false;
        draft.errors.deleteReportTemplateLogoError = payload;

        draft.singleReportTemplate = cloneDeep(
          state.cache.singleReportTemplate,
        );
        break;
      }

      case FETCH_SINGLE_REPORT_TEMPLATE_REQUEST:
        draft.loaders.fetchSingleReportTemplateLoading = true;
        draft.errors.fetchSingleReportTemplateError = null;
        break;

      case FETCH_SINGLE_REPORT_TEMPLATE_SUCCESS:
        draft.loaders.fetchSingleReportTemplateLoading = false;
        draft.errors.fetchSingleReportTemplateError = null;

        draft.singleReportTemplate = cloneDeep(payload.reportTemplate);
        draft.cache.singleReportTemplate = cloneDeep(payload.reportTemplate);
        break;

      case FETCH_SINGLE_REPORT_TEMPLATE_FAILURE:
        draft.loaders.fetchSingleReportTemplateLoading = false;
        draft.errors.fetchSingleReportTemplateError = payload;
        break;

      case ADD_TEMPLATE_SECTION_REQUEST:
        draft.loaders.updateReportTemplateLoading = true;
        draft.errors.updateReportTemplateError = null;
        break;

      case ADD_TEMPLATE_SECTION_SUCCESS:
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = null;

        draft.singleReportTemplate.sections.push(
          cloneDeep(sectionReducer(payload.section, { type, payload })),
        );
        draft.cache.singleReportTemplate.sections.push(
          cloneDeep(sectionReducer(payload.section, { type, payload })),
        );
        break;

      case ADD_TEMPLATE_SECTION_FAILURE:
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = payload;
        break;

      case UPDATE_SECTION_CASE_SUCCESS:
      case DELETE_SECTION_CASE_SUCCESS:
      case DELETE_SECTION_CASE_IMAGE_SUCCESS:
      case ADD_SECTION_CASE_SUCCESS:
      case UPDATE_TEMPLATE_SECTION_SUCCESS: {
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = null;

        const sectionId =
          payload.sectionId ||
          payload.section?.id ||
          payload.sectionCase?.reportTemplateSectionId;

        draft.singleReportTemplate = {
          ...state.singleReportTemplate,
          sections: state.singleReportTemplate.sections.map((section) => {
            if (section.id === sectionId)
              return cloneDeep(
                sectionReducer(section, {
                  type,
                  payload,
                }),
              );

            return cloneDeep(section);
          }),
        };

        draft.cache.singleReportTemplate = {
          ...state.cache.singleReportTemplate,
          sections: state.cache.singleReportTemplate.sections.map((section) => {
            if (section.id === sectionId)
              return cloneDeep(
                sectionReducer(section, {
                  type,
                  payload,
                }),
              );

            return cloneDeep(section);
          }),
        };

        break;
      }

      case UPDATE_SECTION_CASE_REQUEST:
      case DELETE_SECTION_CASE_IMAGE_REQUEST:
      case DELETE_SECTION_CASE_REQUEST:
      case ADD_SECTION_CASE_REQUEST:
      case UPDATE_TEMPLATE_SECTION_REQUEST: {
        draft.loaders.updateReportTemplateLoading = true;
        draft.errors.updateReportTemplateError = null;

        const sectionId = payload.sectionId || payload.section?.id;

        draft.singleReportTemplate = {
          ...state.singleReportTemplate,
          sections: state.singleReportTemplate.sections.map((section) => {
            if (section.id === sectionId)
              return cloneDeep(
                sectionReducer(section, {
                  type,
                  payload,
                }),
              );

            return cloneDeep(section);
          }),
        };

        break;
      }

      case DELETE_TEMPLATE_SECTION_REQUEST: {
        draft.loaders.updateReportTemplateLoading = true;
        draft.errors.updateReportTemplateError = null;

        const sectionIndex = state.singleReportTemplate.sections.findIndex(
          ({ id }) => id === payload.sectionId,
        );

        if (sectionIndex >= 0)
          draft.singleReportTemplate.sections.splice(sectionIndex, 1);
        break;
      }

      case DELETE_TEMPLATE_SECTION_SUCCESS:
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = null;

        const sectionCacheIndex =
          state.cache.singleReportTemplate.sections.findIndex(
            ({ id }) => id === payload.sectionId,
          );

        if (sectionCacheIndex >= 0)
          draft.cache.singleReportTemplate.sections.splice(
            sectionCacheIndex,
            1,
          );
        break;

      case SELECT_TEMPLATE_SECTION:
        draft.selectedTemplateSectionId = payload.id;
        break;

      case GENERATE_TEST_REPORT_REQUEST:
        draft.loaders.generateTestReportLoading = true;
        draft.loaders.generateTestReportError = null;
        break;

      case GENERATE_TEST_REPORT_SUCCESS:
        draft.loaders.generateTestReportLoading = false;
        draft.loaders.generateTestReportError = null;
        break;

      case GENERATE_TEST_REPORT_FAILURE:
        draft.loaders.generateTestReportLoading = false;
        draft.loaders.generateTestReportError = payload;
        break;

      case REORDER_TEMPLATE_SECTIONS_REQUEST:
        draft.loaders.reorderSectionsLoading = true;
        draft.loaders.reorderSectionsError = null;
        if (draft.singleReportTemplate.id === payload.reportId)
          draft.singleReportTemplate.sections = payload.reorderedSections;
        break;

      case REORDER_TEMPLATE_SECTIONS_SUCCESS:
        draft.loaders.reorderSectionsLoading = false;
        draft.loaders.reorderSectionsError = null;
        assignDraftItems(
          draft.singleReportTemplate.sections,
          draft.cache.singleReportTemplate.sections,
        );
        break;

      case REORDER_TEMPLATE_SECTIONS_ERROR:
        draft.loaders.reorderSectionsLoading = false;
        draft.loaders.reorderSectionsError = payload;
        assignDraftItems(
          draft.cache.singleReportTemplate.sections,
          draft.singleReportTemplate.sections,
        );
        break;
    }
  });

export default reportTemplatesReducer;
