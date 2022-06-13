import { all } from 'redux-saga/effects';

import { fetchChatMessagesSaga } from './fetchChatMessages';
import { fetchConversationsSaga } from './fetchConversations';

export { fetchChatMessagesSaga, fetchConversationsSaga };

export const allLiveChatSagasKey = 'allLiveChatSagas';

export function* allLiveChatSagas() {
  yield all([fetchChatMessagesSaga(), fetchConversationsSaga()]);
}
