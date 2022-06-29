import { DenormalizedConversation, Conversation } from 'models/LiveChat';
import { ApiData } from 'models/Api';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';
import { normalizeArrayToObject } from 'utils/normalizeArrayToObject';
import { ReducedData } from './types';

export const mapFetchConversationsResponse = (
  data: ApiData<DenormalizedConversation>,
): ReducedData => {
  const denormalizedConversations: DenormalizedConversation[] = jsonApiToArray(
    data,
    'conversation',
  );

  // normalizes conversation recursively with interlocutors
  // param reassign used for improving performance
  return denormalizedConversations.reduce(
    (
      accumulator,
      {
        id,
        interventionId,
        interventionName,
        lastMessage,
        liveChatInterlocutors,
      },
    ) => {
      const conversation = { id, lastMessage, liveChatInterlocutors };

      const normalizedInterlocutors = normalizeArrayToObject(
        conversation.liveChatInterlocutors,
        'id',
      );

      accumulator.interventionConversations[interventionId] = {
        interventionId,
        interventionName,
        conversationIds: [
          ...(
            accumulator.interventionConversations[interventionId] || {
              conversationIds: [],
            }
          ).conversationIds,
          id,
        ],
      };

      // eslint-disable-next-line no-param-reassign
      accumulator.conversations[conversation.id] = {
        ...conversation,
        liveChatInterlocutors: normalizedInterlocutors,
      };

      return accumulator;
    },
    { interventionConversations: {}, conversations: {} } as ReducedData,
  );
};

export const mapConversationCreatedMessageData = (
  data: ApiData<DenormalizedConversation>,
): Omit<DenormalizedConversation, 'liveChatInterlocutors'> &
  Pick<Conversation, 'liveChatInterlocutors'> => {
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
