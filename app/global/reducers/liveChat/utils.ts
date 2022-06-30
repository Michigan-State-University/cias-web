import { DenormalizedConversation } from 'models/LiveChat';
import { ApiData } from 'models/Api';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';
import { normalizeArrayToObject } from 'utils/normalizeArrayToObject';
import { NewConversationData, ReducedConversationsData } from './types';

export const mapFetchConversationsResponse = (
  data: ApiData<DenormalizedConversation>,
): ReducedConversationsData => {
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

      if (accumulator.interventionConversations[interventionId]) {
        accumulator.interventionConversations[
          interventionId
        ].conversationIds.push(id);
      } else {
        accumulator.interventionConversations[interventionId] = {
          interventionId,
          interventionName,
          conversationIds: [id],
        };
      }

      // eslint-disable-next-line no-param-reassign
      accumulator.conversations[conversation.id] = {
        ...conversation,
        liveChatInterlocutors: normalizedInterlocutors,
      };

      return accumulator;
    },
    {
      interventionConversations: {},
      conversations: {},
    } as ReducedConversationsData,
  );
};

export const mapConversationCreatedMessageData = (
  data: ApiData<DenormalizedConversation>,
): NewConversationData => {
  const {
    id,
    interventionId,
    interventionName,
    lastMessage,
    liveChatInterlocutors,
  }: DenormalizedConversation = jsonApiToObject(data, 'conversation');

  const normalizedInterlocutors = normalizeArrayToObject(
    liveChatInterlocutors,
    'id',
  );

  return {
    conversation: {
      id,
      lastMessage,
      liveChatInterlocutors: normalizedInterlocutors,
    },
    interventionConversation: {
      conversationIds: [id],
      interventionId,
      interventionName,
    },
  };
};
