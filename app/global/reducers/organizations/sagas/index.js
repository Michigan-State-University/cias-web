import { all } from 'redux-saga/effects';
import fetchOrganizationsSaga from './fetchOrganizations';
import createOrganizationSaga from './addOrganization';
import fetchOrganizationSaga from './fetchOrganization';
import deleteOrganizationSaga from './deleteOrganization';
import editOrganizationSaga from './editOrganization';
import inviteAdminSaga from './inviteAdmin';
import fetchHealthSystemSaga from './fetchHealthSystem';
import addHealthSystemSaga from './addHealthSystem';
import editHealthSystemSaga from './editHealthSystem';
import deleteHealthSystemSaga from './deleteHealthSystem';
import fetchClinicSaga from './fetchClinic';
import addClinicSaga from './addClinic';
import editClinicSaga from './editClinic';
import deleteClinicSaga from './deleteClinic';

export {
  fetchOrganizationsSaga,
  deleteOrganizationSaga,
  editOrganizationSaga,
  fetchOrganizationSaga,
  inviteAdminSaga,
  fetchHealthSystemSaga,
  addHealthSystemSaga,
  editHealthSystemSaga,
  deleteHealthSystemSaga,
  addClinicSaga,
  editClinicSaga,
  deleteClinicSaga,
};

export default function* allOrganizationsSagas() {
  yield all([
    fetchOrganizationsSaga(),
    createOrganizationSaga(),
    fetchOrganizationSaga(),
    deleteOrganizationSaga(),
    editOrganizationSaga(),
    inviteAdminSaga(),
    fetchHealthSystemSaga(),
    addHealthSystemSaga(),
    editHealthSystemSaga(),
    deleteHealthSystemSaga(),
    fetchClinicSaga(),
    addClinicSaga(),
    editClinicSaga(),
    deleteClinicSaga(),
  ]);
}
