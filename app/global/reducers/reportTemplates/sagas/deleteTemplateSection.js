import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { DELETE_TEMPLATE_SECTION_REQUEST } from '../constants';
import {
  deleteTemplateSectionSuccess,
  deleteTemplateSectionFailure,
} from '../actions';

function* deleteTemplateSection({ payload: { sectionId, reportId } }) {
  const requestUrl = `/v1/report_templates/${reportId}/sections/${sectionId}`;

  try {
    yield axios.delete(requestUrl);

    yield put(deleteTemplateSectionSuccess());
  } catch (error) {
    yield put(deleteTemplateSectionFailure(error));
  }
}

export default function* deleteTemplateSectionSaga() {
  yield takeLatest(DELETE_TEMPLATE_SECTION_REQUEST, deleteTemplateSection);
}
