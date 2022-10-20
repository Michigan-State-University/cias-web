import { all } from 'redux-saga/effects';

import { WithSaga } from 'global/reducers/types';

import { fetchChatMessagesSaga } from './fetchChatMessages';
import { fetchActiveConversationsSaga } from './fetchActiveConversations';
import { fetchArchivedConversationsSaga } from './fetchArchivedConversations';
import { fetchNavigatorHelpingMaterialsSaga } from './fetchNavigatorHelpingMaterials';
import { generateConversationTranscriptSaga } from './generateConversationTranscript';

export { fetchChatMessagesSaga, fetchActiveConversationsSaga };

export const allLiveChatSagasKey = 'allLiveChatSagas';

function* allLiveChatSagas() {
  yield all([
    fetchChatMessagesSaga(),
    fetchActiveConversationsSaga(),
    fetchArchivedConversationsSaga(),
    fetchNavigatorHelpingMaterialsSaga(),
    generateConversationTranscriptSaga(),
  ]);
}

export const withAllLiveChatSagas: WithSaga = {
  key: allLiveChatSagasKey,
  saga: allLiveChatSagas,
};
