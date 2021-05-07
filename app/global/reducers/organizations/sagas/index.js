import { all } from 'redux-saga/effects';
import fetchOrganizationsSaga from './fetchOrganizations';
import createOrganizationSaga from './addOrganization';
import fetchOrganizationSaga from './fetchOrganization';
import deleteOrganizationSaga from './deleteOrganization';
import editOrganizationSaga from './editOrganization';
import inviteAdminSaga from './inviteAdmin';
import addHealthSystemSaga from './addHealthSystem';

export {
  fetchOrganizationsSaga,
  deleteOrganizationSaga,
  editOrganizationSaga,
  fetchOrganizationSaga,
  inviteAdminSaga,
  addHealthSystemSaga,
};

export default function* allOrganizationsSagas() {
  yield all([
    fetchOrganizationsSaga(),
    createOrganizationSaga(),
    fetchOrganizationSaga(),
    deleteOrganizationSaga(),
    editOrganizationSaga(),
    inviteAdminSaga(),
    addHealthSystemSaga(),
  ]);
}
