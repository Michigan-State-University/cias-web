import { all } from '@redux-saga/core/effects';
import { addNewEventSaga } from './addNewEvent';
import { editTlfbEventNameSaga } from './editEventName';
import { removeTlfbEventSaga } from './removeEvent';

export default function* allTlfbSagas() {
  yield all([
    addNewEventSaga(),
    editTlfbEventNameSaga(),
    removeTlfbEventSaga(),
  ]);
}
