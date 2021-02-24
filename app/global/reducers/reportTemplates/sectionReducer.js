/*
 *
 * ReportTemplates reducer
 *
 */
import produce from 'immer';

import { TemplateSection } from 'models/ReportTemplate/TemplateSection';
import {
  UPDATE_TEMPLATE_SECTION_REQUEST,
  UPDATE_SECTION_CASE_REQUEST,
  DELETE_SECTION_CASE_REQUEST,
  DELETE_SECTION_CASE_IMAGE_REQUEST,
  ADD_SECTION_CASE_SUCCESS,
  UPDATE_SECTION_CASE_SUCCESS,
} from './constants';

export const initialState = {
  ...new TemplateSection({
    id: '',
    reportTemplateId: '',
    formula: '',
    variants: [],
  }),
};

/* eslint-disable default-case, no-param-reassign */
const templateSectionReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case UPDATE_TEMPLATE_SECTION_REQUEST:
        return { ...state, ...payload.section };

      case ADD_SECTION_CASE_SUCCESS:
        draft.variants.push(payload.sectionCase);
        break;

      case UPDATE_SECTION_CASE_SUCCESS:
      case UPDATE_SECTION_CASE_REQUEST: {
        const caseIndex = state.variants.findIndex(
          ({ id }) => id === payload.sectionCase.id,
        );

        if (caseIndex >= 0) draft.variants[caseIndex] = payload.sectionCase;
        break;
      }

      case DELETE_SECTION_CASE_REQUEST: {
        const caseIndex = state.variants.findIndex(
          ({ id }) => id === payload.caseId,
        );

        if (caseIndex >= 0) draft.variants.splice(caseIndex, 1);
        break;
      }

      case DELETE_SECTION_CASE_IMAGE_REQUEST:
        const caseIndex = state.variants.findIndex(
          ({ id }) => id === payload.caseId,
        );

        if (caseIndex >= 0) draft.variants[caseIndex].imageUrl = null;
        break;
    }
  });

export default templateSectionReducer;
