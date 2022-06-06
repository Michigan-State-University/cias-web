import { all } from 'redux-saga/effects';
import fetchChatMessagesSaga from './fetchChatMessages';

export { fetchChatMessagesSaga };

export const allLiveChatSagasKey = 'allLiveChatSagas';

export default function* allLiveChatSagas() {
  yield all([fetchChatMessagesSaga()]);
}
