import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  addInterventionLogoError,
  addInterventionLogoSuccess,
  deleteInterventionLogoError,
  deleteInterventionLogoSuccess,
  updateInterventionLogoError,
  updateInterventionLogoSuccess,
} from '../actions';
import {
  ADD_INTERVENTION_LOGO_ERROR,
  DELETE_INTERVENTION_LOGO_ERROR,
  ADD_INTERVENTION_LOGO_REQUEST,
  DELETE_INTERVENTION_LOGO_REQUEST,
  UPDATE_INTERVENTION_LOGO_REQUEST,
} from '../constants';

export function* addInterventionLogo({
  payload: { interventionId, logoData },
}) {
  const requestURL = `v1/interventions/${interventionId}/logo`;

  try {
    const formData = new FormData();
    formData.append('logo[file]', logoData);

    const { data } = yield axios.post(requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedData = jsonApiToObject(data, 'intervention');
    yield put(addInterventionLogoSuccess(mappedData.logo));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.editInterventionError),
      {
        toastId: ADD_INTERVENTION_LOGO_ERROR,
      },
    );
    yield put(addInterventionLogoError(error));
  }
}

export function* deleteInterventionLogo({ payload: { interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/logo`;

  try {
    yield call(axios.delete, requestURL);

    yield put(deleteInterventionLogoSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.editInterventionError),
      {
        toastId: DELETE_INTERVENTION_LOGO_ERROR,
      },
    );
    yield put(deleteInterventionLogoError(error));
  }
}

export function* updateInterventionLogo({
  payload: { interventionId, description },
}) {
  const requestURL = `v1/interventions/${interventionId}/logo`;

  try {
    yield axios.patch(requestURL, {
      logo: { alt: description },
    });

    yield put(updateInterventionLogoSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.editInterventionError),
      {
        toastId: ADD_INTERVENTION_LOGO_ERROR,
      },
    );
    yield put(updateInterventionLogoError(error));
  }
}

export default function* interventionLogoSaga() {
  yield takeLatest(ADD_INTERVENTION_LOGO_REQUEST, addInterventionLogo);
  yield takeLatest(DELETE_INTERVENTION_LOGO_REQUEST, deleteInterventionLogo);
  yield takeLatest(UPDATE_INTERVENTION_LOGO_REQUEST, updateInterventionLogo);
}
