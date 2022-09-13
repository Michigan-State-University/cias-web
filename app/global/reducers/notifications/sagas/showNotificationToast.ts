import { select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { toast } from 'react-toastify';

import { CustomDayjsLocale } from 'utils/dayjs';

import SingleNotification from 'components/SingleNotification';
import { CustomNotificationToastClassnames } from 'components/ReactToastify';

import { onNewNotificationReceive } from '../actions';

import { makeSelectNotificationsListVisible } from '../selectors';

function* showNotificationToast({
  payload: { notification },
}: ReturnType<typeof onNewNotificationReceive>) {
  const notificationsListVisible: boolean = yield select(
    makeSelectNotificationsListVisible(),
  );

  if (!notificationsListVisible) {
    toast(
      () =>
        SingleNotification({
          notification,
          timeFormatLocale: CustomDayjsLocale.EN_SHORT_RELATIVE_TIME,
        }),
      CustomNotificationToastClassnames,
    );
  }
}

export function* showNotificationToastSaga() {
  yield takeEvery(getType(onNewNotificationReceive), showNotificationToast);
}
