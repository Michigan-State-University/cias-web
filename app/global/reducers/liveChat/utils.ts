import { Conversation, DenormalizedConversation } from 'models/LiveChat';
import { ApiData } from 'models/Api';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';
import { normalizeArrayToObject } from 'utils/normalizeArrayToObject';

export const mapFetchConversationsResponse = (
  data: ApiData<DenormalizedConversation>,
): Record<Conversation['id'], Conversation> => {
  const denormalizedConversations: DenormalizedConversation[] = jsonApiToArray(
    data,
    'conversation',
  );

  // normalizes conversation recursively with interlocutors
  // param reassign used for improving performance
  return denormalizedConversations.reduce((conversations, conversation) => {
    const normalizedInterlocutors = normalizeArrayToObject(
      conversation.liveChatInterlocutors,
      'id',
    );

    // eslint-disable-next-line no-param-reassign
    conversations[conversation.id] = {
      ...conversation,
      liveChatInterlocutors: normalizedInterlocutors,
    };

    return conversations;
  }, {} as Record<Conversation['id'], Conversation>);
};

export const mapConversationCreatedMessageData = (
  data: ApiData<DenormalizedConversation>,
): Conversation => {
  const denormalizedConversation: DenormalizedConversation = jsonApiToObject(
    data,
    'conversation',
  );

  const normalizedInterlocutors = normalizeArrayToObject(
    denormalizedConversation.liveChatInterlocutors,
    'id',
  );

  return {
    ...denormalizedConversation,
    liveChatInterlocutors: normalizedInterlocutors,
  };
};
