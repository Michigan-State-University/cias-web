import axios from 'axios';
import { toast } from 'react-toastify';

import { put, takeLatest, call } from 'redux-saga/effects';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { fetchInterventionsWithPaginationSuccess } from '../actions';
import { FETCH_INTERVENTIONS_WITH_PAGINATION } from '../constants';

import messages from '../messages';

export function* fetchInterventionsWithPagination({
  payload: { paginationData, filterData },
}) {
  const requestURL = `v1/interventions`;
  const { startIndex, endIndex } = paginationData ?? {};
  try {
    const {
      data: { interventions, interventions_size: interventionsSize },
    } = yield call(axios.get, requestURL, {
      params: objectToSnakeCase({ startIndex, endIndex, ...filterData }),
    });
    yield put(
      fetchInterventionsWithPaginationSuccess(interventions, interventionsSize),
    );
  } catch (error) {
    yield call(toast.error, formatMessage(messages.fetchInterventionsError));
  }
}
export default function* fetchInterventionsWithPaginationSaga() {
  yield takeLatest(
    FETCH_INTERVENTIONS_WITH_PAGINATION,
    fetchInterventionsWithPagination,
  );
}
