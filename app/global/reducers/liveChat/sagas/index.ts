import { all } from 'redux-saga/effects';

import { fetchChatMessagesSaga } from './fetchChatMessages';
import { fetchActiveConversationsSaga } from './fetchConversations';

export { fetchChatMessagesSaga, fetchActiveConversationsSaga };

export const allLiveChatSagasKey = 'allLiveChatSagas';

export function* allLiveChatSagas() {
  yield all([fetchChatMessagesSaga(), fetchActiveConversationsSaga()]);
}
