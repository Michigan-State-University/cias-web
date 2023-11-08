import { all } from 'redux-saga/effects';

import copyInterventionSaga from './copyIntervention';
import importInterventionSaga from './importIntervention';

export * from './starIntervention';
export * from './unstarIntervention';
export * from './fetchInterventions';

export { copyInterventionSaga, importInterventionSaga };

export default function* allInterventionSagas() {
  yield all([copyInterventionSaga(), importInterventionSaga()]);
}
