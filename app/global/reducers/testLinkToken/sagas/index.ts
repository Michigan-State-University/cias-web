import { all } from 'redux-saga/effects';

import { verifyTestLinkTokenSaga } from './verifyTestLinkToken';

export * from './verifyTestLinkToken';

export function* allTestLinkTokenSagas() {
  yield all([verifyTestLinkTokenSaga()]);
}
