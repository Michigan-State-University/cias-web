import { all } from '@redux-saga/core/effects';
import { addNewEventSaga } from './addNewEvent';
import { editTlfbEventNameSaga } from './editEventName';
import { removeTlfbEventSaga } from './removeEvent';
import { addNewSubstanceSaga } from './addNewSubstance';
import { editSubstanceBodySaga } from './editSubstance';

export default function* allTlfbSagas() {
  yield all([
    addNewEventSaga(),
    editTlfbEventNameSaga(),
    removeTlfbEventSaga(),
    addNewSubstanceSaga(),
    editSubstanceBodySaga(),
  ]);
}
