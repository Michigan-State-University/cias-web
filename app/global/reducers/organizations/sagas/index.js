import { all } from 'redux-saga/effects';
import fetchOrganizationsSaga from './fetchOrganizations';
import createOrganizationSaga from './addOrganization';

export { fetchOrganizationsSaga };

export default function* allOrganizationsSagas() {
  yield all([fetchOrganizationsSaga(), createOrganizationSaga()]);
}
