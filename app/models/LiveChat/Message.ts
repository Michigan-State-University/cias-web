export type Message = {
  id: string;
  conversationId: string;
  interlocutorId: string;
  createdAt: string;
  content: string;
  isRead: boolean;
  interventionId?: string;
};

export type LastMessage = {
  id: string;
  interlocutorId: string;
  conversationId: string;
  createdAt: string;
  content: string;
  isRead: boolean;
};

export type MessageSentDTO = {
  conversationId: string;
  interlocutorId: string;
  content: string;
};

export type MessageReadDTO = {
  conversationId: string;
  messageId: string;
};
