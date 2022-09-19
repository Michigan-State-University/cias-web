import { all } from '@redux-saga/core/effects';
import { addNewEventSaga } from './addNewEvent';
import { editTlfbEventNameSaga } from './editEventName';
import { removeTlfbEventSaga } from './removeEvent';
import { addTlfbQuestionAnswerSaga } from './addTlfbQuestionAnswer';
import { editTlfbQuestionAnswerSaga } from './editTlfbQuestionAnswer';
import { fetchCalendarDataSaga } from './fetchCalendarData';

export default function* allTlfbSagas() {
  yield all([
    addNewEventSaga(),
    editTlfbEventNameSaga(),
    removeTlfbEventSaga(),
    addTlfbQuestionAnswerSaga(),
    editTlfbQuestionAnswerSaga(),
    fetchCalendarDataSaga(),
  ]);
}
