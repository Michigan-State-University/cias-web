export type LiveChatMessage = {
  content: string;
  conversationId: string;
  firstName: string;
  id: string;
  lastName: string;
  userId: string;
};

export type SendLiveChatMessageDTO = {
  conversationId: string;
  senderId: string;
  content: string;
};
