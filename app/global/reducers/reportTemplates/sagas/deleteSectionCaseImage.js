import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { DELETE_SECTION_CASE_IMAGE_REQUEST } from '../constants';
import {
  deleteSectionCaseImageSuccess,
  deleteSectionCaseImageFailure,
} from '../actions';

function* deleteSectionCaseImage({ payload: { caseId, sectionId } }) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/variants/${caseId}/remove_image`;

  try {
    yield axios.delete(requestUrl);

    yield put(deleteSectionCaseImageSuccess());
  } catch (error) {
    yield put(deleteSectionCaseImageFailure(error));
  }
}

export default function* updateSectionCaseImageSaga() {
  yield takeLatest(DELETE_SECTION_CASE_IMAGE_REQUEST, deleteSectionCaseImage);
}
