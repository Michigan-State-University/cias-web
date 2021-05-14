import { all } from 'redux-saga/effects';
import editDashboardSectionSaga from './editDashboardSection';
import fetchDashboardSectionSaga from './fetchDashboardSection';
import fetchDashboardSectionsSaga from './fetchDashboardSections';
import addDashboardSectionSaga from './addDashboardSection';
import deleteDashboardSectionSaga from './deleteDashboardSection';

export {
  fetchDashboardSectionSaga,
  fetchDashboardSectionsSaga,
  addDashboardSectionSaga,
  editDashboardSectionSaga,
  deleteDashboardSectionSaga,
};

export default function* allDashboardSectionsSagas() {
  yield all([
    fetchDashboardSectionSaga(),
    fetchDashboardSectionsSaga(),
    addDashboardSectionSaga(),
    editDashboardSectionSaga(),
    deleteDashboardSectionSaga(),
  ]);
}
