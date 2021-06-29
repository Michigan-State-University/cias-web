import { all } from 'redux-saga/effects';
import editDashboardSectionSaga from './editDashboardSection';
import fetchDashboardSectionSaga from './fetchDashboardSection';
import fetchDashboardSectionsSaga from './fetchDashboardSections';
import addDashboardSectionSaga from './addDashboardSection';
import deleteDashboardSectionSaga from './deleteDashboardSection';
import addChartSaga from './addChart';
import editChartSaga from './editChart';
import deleteChartSaga from './deleteChart';
import copyChartSaga from './copyChart';
import filterChartsDataSaga from './filterChartsData';
import reorderDashboardSectionsSaga from './reorderDashboardSections';

export {
  fetchDashboardSectionSaga,
  fetchDashboardSectionsSaga,
  addDashboardSectionSaga,
  editDashboardSectionSaga,
  deleteDashboardSectionSaga,
  addChartSaga,
  editChartSaga,
  deleteChartSaga,
  copyChartSaga,
  filterChartsDataSaga,
  reorderDashboardSectionsSaga,
};

export default function* allDashboardSectionsSagas() {
  yield all([
    fetchDashboardSectionSaga(),
    fetchDashboardSectionsSaga(),
    addDashboardSectionSaga(),
    editDashboardSectionSaga(),
    deleteDashboardSectionSaga(),
    addChartSaga(),
    editChartSaga(),
    deleteChartSaga(),
    copyChartSaga(),
    filterChartsDataSaga(),
    reorderDashboardSectionsSaga(),
  ]);
}
