/*
 *
 * ReportTemplates reducer
 *
 */
import cloneDeep from 'lodash/cloneDeep';
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';

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
} from './constants';

export const initialState = {
  reportTemplates: [],
  selectedReportId: null,
  cache: {
    reportTemplates: [],
  },
  loaders: {
    fetchReportTemplatesLoading: true,
    addReportTemplateLoading: false,
    updateReportTemplateLoading: false,
    deleteReportTemplateLoading: false,
    deleteReportTemplateLogoLoading: false,
    shouldRefetch: false,
  },
  errors: {
    fetchReportTemplatesError: null,
    addReportTemplateError: null,
    updateReportTemplateError: null,
    deleteReportTemplateError: null,
    deleteReportTemplateLogoError: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const reportTemplatesReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_REPORT_TEMPLATES_REQUEST:
        if (isEmpty(state.reportTemplates))
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

        const reportTemplateCacheIndex = state.cache.reportTemplates.findIndex(
          ({ id }) => id === payload.reportTemplate.id,
        );

        if (reportTemplateCacheIndex >= 0)
          draft.cache.reportTemplates[reportTemplateCacheIndex] = cloneDeep(
            payload.reportTemplate,
          );

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.reportTemplate.id,
        );

        if (reportTemplateIndex >= 0)
          draft.reportTemplates[reportTemplateIndex] = cloneDeep(
            payload.reportTemplate,
          );
        break;
      }

      case UPDATE_REPORT_TEMPLATE_FAILURE: {
        draft.loaders.updateReportTemplateLoading = false;
        draft.errors.updateReportTemplateError = payload;

        draft.reportTemplates = cloneDeep(state.cache.reportTemplates);
        break;
      }

      case SELECT_REPORT_TEMPLATE:
        draft.selectedReportId = payload.id;
        break;

      case DELETE_REPORT_TEMPLATE_REQUEST: {
        draft.loaders.deleteReportTemplateLoading = true;
        draft.errors.deleteReportTemplateError = null;

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.id,
        );

        if (reportTemplateIndex >= 0) {
          draft.reportTemplates.splice(reportTemplateIndex, 1);

          if (payload.id === state.selectedReportId)
            draft.selectedReportId = null;
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
        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_REQUEST: {
        draft.loaders.deleteReportTemplateLogoLoading = true;
        draft.errors.deleteReportTemplateLogoError = null;

        const reportTemplateIndex = state.reportTemplates.findIndex(
          ({ id }) => id === payload.id,
        );

        if (reportTemplateIndex >= 0)
          draft.reportTemplates[reportTemplateIndex].logoUrl = null;

        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_SUCCESS: {
        draft.loaders.deleteReportTemplateLogoLoading = false;
        draft.errors.deleteReportTemplateLogoError = null;

        draft.cache.reportTemplates = cloneDeep(state.reportTemplates);

        break;
      }

      case DELETE_REPORT_TEMPLATE_LOGO_FAILURE: {
        draft.loaders.deleteReportTemplateLogoLoading = false;
        draft.errors.deleteReportTemplateLogoError = payload;

        draft.reportTemplates = cloneDeep(state.cache.reportTemplates);
        break;
      }
    }
  });

export default reportTemplatesReducer;
