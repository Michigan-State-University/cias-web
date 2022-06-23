import { all } from 'redux-saga/effects';

import fetchNavigatorSetup from './fetchNavigatorSetup';
import updateNavigatorSetup from './updateNavigatorSetup';

export function* allNavigatorSetupSagas() {
  yield all([fetchNavigatorSetup(), updateNavigatorSetup()]);
}
