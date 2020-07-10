import { all } from 'redux-saga/effects';
import createInterventionSaga from './createIntervention';
import editInterventionSaga from './editIntervention';
import getInterventionSaga from './getIntervention';

export { createInterventionSaga, editInterventionSaga, getInterventionSaga };

export default function* allInterventionSagas() {
  yield all([
    createInterventionSaga(),
    editInterventionSaga(),
    getInterventionSaga(),
  ]);
}
