import { all } from '@redux-saga/core/effects';
import { addNewEventSaga } from './addNewEvent';
import { editTlfbEventNameSaga } from './editEventName';

export default function* allTlfbSagas() {
  yield all([addNewEventSaga(), editTlfbEventNameSaga()]);
}
