import { Conversation, InterventionConversation } from 'models/LiveChat';

export const countUnreadConversations = (
  interventionConversationsValues: InterventionConversation[],
  conversations: Record<Conversation['id'], Conversation>,
  userId: string,
): Record<InterventionConversation['interventionId'], number> =>
  interventionConversationsValues.reduce(
    (unreadConversationsCounts, { interventionId, conversationIds }) => {
      const count = conversationIds.filter((conversationId) => {
        const { lastMessage, liveChatInterlocutors } =
          conversations[conversationId];
        if (!lastMessage || lastMessage.isRead) return false;

        return (
          liveChatInterlocutors[lastMessage.interlocutorId]?.userId !== userId
        );
      }).length;

      // eslint-disable-next-line no-param-reassign
      unreadConversationsCounts[interventionId] = count;
      return unreadConversationsCounts;
    },
    {} as Record<InterventionConversation['interventionId'], number>,
  );
