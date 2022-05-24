import { all } from 'redux-saga/effects';
import fetchChatMessagesSaga from './fetchChatMessages';

export { fetchChatMessagesSaga };

export default function* allLiveChatSagas() {
  yield all([fetchChatMessagesSaga()]);
}
