import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectKeysToSnakeCase from 'utils/objectToSnakeCase';
import { getObjectKeysWithoutIds } from 'utils/getObjectKeys';
import { formatMessage } from 'utils/intlOutsideReact';

import { EDIT_ORGANIZATION_REQUEST } from '../constants';
import { editOrganizationFailure, editOrganizationSuccess } from '../actions';
import messages from '../messages';

export function* editOrganization({ payload: { organization } }) {
  const requestURL = `v1/organizations/${organization.id}`;

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectKeysToSnakeCase({ organization }),
    );

    const updatedOrganization = jsonApiToObject(data, 'organization');

    yield put(editOrganizationSuccess(updatedOrganization));
  } catch (error) {
    const objectKeys = getObjectKeysWithoutIds(organization);
    yield call(
      toast.error,
      formatMessage(messages.editEntityError, {
        properties: objectKeys.join(', '),
        propertiesCount: objectKeys.length,
      }),
    );
    yield put(editOrganizationFailure(error));
  }
}

export default function* editOrganizationSaga() {
  yield takeLatest(EDIT_ORGANIZATION_REQUEST, editOrganization);
}
