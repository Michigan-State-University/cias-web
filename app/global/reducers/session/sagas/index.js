import { all } from 'redux-saga/effects';
import editInterventionSaga from './editIntervention';
import getInterventionSaga from './getIntervention';

export { editInterventionSaga, getInterventionSaga };

export default function* allInterventionSagas() {
  yield all([editInterventionSaga(), getInterventionSaga()]);
}
