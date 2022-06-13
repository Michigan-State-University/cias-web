import {
  Conversation,
  DenormalizedConversation,
  Interlocutor,
} from 'models/LiveChat';
import { ApiData } from 'models/Api';

import { jsonApiToArray } from 'utils/jsonApiMapper';

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
    const normalizedInterlocutors = conversation.liveChatInterlocutors.reduce(
      (interlocutors, interlocutor) => {
        // eslint-disable-next-line no-param-reassign
        interlocutors[interlocutor.id] = interlocutor;
        return interlocutors;
      },
      {} as Record<Interlocutor['id'], Interlocutor>,
    );

    // eslint-disable-next-line no-param-reassign
    conversations[conversation.id] = {
      ...conversation,
      liveChatInterlocutors: normalizedInterlocutors,
    };

    return conversations;
  }, {} as Record<Conversation['id'], Conversation>);
};
