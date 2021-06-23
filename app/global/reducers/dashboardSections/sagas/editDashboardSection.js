import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { getObjectKeysWithoutIds } from 'utils/getObjectKeys';
import { formatMessage } from 'utils/intlOutsideReact';

import { EDIT_SECTION_REQUEST } from '../constants';
import {
  editDashboardSectionError,
  editDashboardSectionSuccess,
} from '../actions';
import messages from '../messages';

export function* editDashboardSection({
  payload: { dashboardSection, dashboardSectionId },
}) {
  const requestURL = `v1/organizations/${
    dashboardSection.organizationId
  }/dashboard_sections/${dashboardSectionId}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({ dashboardSection }),
    );
    const updatedDashboardSection = jsonApiToObject(data, 'dashboardSection');

    yield put(
      editDashboardSectionSuccess(updatedDashboardSection, dashboardSectionId),
    );
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.editSectionError, {
        properties: JSON.stringify(getObjectKeysWithoutIds(dashboardSection)),
      }),
    );
    yield put(editDashboardSectionError(error));
  }
}

export default function* editDashboardSectionSaga() {
  yield takeLatest(EDIT_SECTION_REQUEST, editDashboardSection);
}
