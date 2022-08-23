import { all } from 'redux-saga/effects';

import { WithSaga } from 'global/reducers/types';

import { fetchChatMessagesSaga } from './fetchChatMessages';
import { fetchActiveConversationsSaga } from './fetchActiveConversations';
import { fetchArchivedConversationsSaga } from './fetchArchivedConversations';

export { fetchChatMessagesSaga, fetchActiveConversationsSaga };

export const allLiveChatSagasKey = 'allLiveChatSagas';

function* allLiveChatSagas() {
  yield all([
    fetchChatMessagesSaga(),
    fetchActiveConversationsSaga(),
    fetchArchivedConversationsSaga(),
  ]);
}

export const withAllLiveChatSagas: WithSaga = {
  key: allLiveChatSagasKey,
  saga: allLiveChatSagas,
};
