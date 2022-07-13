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
        id: conversationId,
        interventionId,
        interventionName,
        liveChatInterlocutors,
        ...restProps
      },
    ) => {
      const normalizedInterlocutors = normalizeArrayToObject(
        liveChatInterlocutors,
        'id',
      );

      if (accumulator.interventionConversations[interventionId]) {
        accumulator.interventionConversations[
          interventionId
        ].conversationIds.push(conversationId);
      } else {
        accumulator.interventionConversations[interventionId] = {
          interventionId,
          interventionName,
          conversationIds: [conversationId],
        };
      }

      // eslint-disable-next-line no-param-reassign
      accumulator.conversations[conversationId] = {
        id: conversationId,
        liveChatInterlocutors: normalizedInterlocutors,
        ...restProps,
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
    liveChatInterlocutors,
    ...restProps
  }: DenormalizedConversation = jsonApiToObject(data, 'conversation');

  const normalizedInterlocutors = normalizeArrayToObject(
    liveChatInterlocutors,
    'id',
  );

  return {
    conversation: {
      id,
      liveChatInterlocutors: normalizedInterlocutors,
      ...restProps,
    },
    interventionConversation: {
      conversationIds: [id],
      interventionId,
      interventionName,
    },
  };
};
