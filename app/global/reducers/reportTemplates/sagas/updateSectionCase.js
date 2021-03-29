import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { mapJsonApiToObject } from 'utils/jsonApiMapper';
import { SectionCase } from 'models/ReportTemplate';
import { formatMessage } from 'utils/intlOutsideReact';
import { toast } from 'react-toastify';
import { UPDATE_SECTION_CASE_REQUEST } from '../constants';
import { updateSectionCaseSuccess, updateSectionCaseFailure } from '../actions';
import messages from '../messages';

function* updateSectionCase({
  payload: { sectionCase, sectionId, imageData },
}) {
  const requestUrl = `/v1/report_templates/sections/${sectionId}/variants/${
    sectionCase.id
  }`;

  try {
    if (!imageData) {
      const { data } = yield axios.put(
        requestUrl,
        objectToSnakeCase(sectionCase),
      );

      const mappedData = mapJsonApiToObject(data, 'variant', {
        isSingleObject: true,
      });

      yield put(updateSectionCaseSuccess(new SectionCase({ ...mappedData })));
    } else {
      const formData = new FormData();
      formData.append('variant[image]', imageData);

      const { data } = yield axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const mappedData = mapJsonApiToObject(data, 'variant', {
        isSingleObject: true,
      });

      yield put(updateSectionCaseSuccess(new SectionCase({ ...mappedData })));
    }
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateSectionCaseError));
    yield put(updateSectionCaseFailure(error));
  }
}

export default function* updateSectionCaseSaga() {
  yield takeLatest(UPDATE_SECTION_CASE_REQUEST, updateSectionCase);
}
