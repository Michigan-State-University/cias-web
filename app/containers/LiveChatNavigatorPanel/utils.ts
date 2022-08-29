import { Conversation, InterventionConversation } from 'models/LiveChat';
import {
  ParsedNavigatorScriptsFileRow,
  NavigatorScriptsGroup,
} from 'models/NavigatorSetup';

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

export const groupNavigatorScripts = (
  parsedNavigatorScriptsFileRows: ParsedNavigatorScriptsFileRow[],
): NavigatorScriptsGroup[] => {
  const reducedScripts = parsedNavigatorScriptsFileRows.reduce<
    Record<string, string[]>
  >((accumulator, { header, sampleMessage }) => {
    const reducedGroup = accumulator[header];
    if (reducedGroup) {
      reducedGroup.push(sampleMessage);
    } else {
      accumulator[header] = [sampleMessage];
    }
    return accumulator;
  }, {});
  return Object.entries(reducedScripts).map(([header, sampleMessages]) => ({
    header,
    sampleMessages,
  }));
};
