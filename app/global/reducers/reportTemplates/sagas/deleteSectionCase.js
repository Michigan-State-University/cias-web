import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { DELETE_SECTION_CASE_REQUEST } from '../constants';
import { deleteSectionCaseSuccess, deleteSectionCaseFailure } from '../actions';

function* deleteSectionCase({ payload: { caseId, sectionId } }) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/variants/${caseId}`;

  try {
    yield axios.delete(requestUrl);

    yield put(deleteSectionCaseSuccess());
  } catch (error) {
    yield put(deleteSectionCaseFailure(error));
  }
}

export default function* updateSectionCaseSaga() {
  yield takeLatest(DELETE_SECTION_CASE_REQUEST, deleteSectionCase);
}
