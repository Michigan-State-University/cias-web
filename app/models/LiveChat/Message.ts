export type Message = {
  content: string;
  conversationId: string;
  id: string;
  interlocutorId: string;
  isRead: boolean;
  createdAt: string;
};

export type LastMessage = {
  content: string;
  id: string;
  interlocutorId: string;
  isRead: boolean;
  createdAt: string;
};

export type NewMessageDTO = {
  conversationId: string;
  interlocutorId: string;
  content: string;
};

export type MessageReadDTO = {
  conversationId: string;
  messageId: string;
};
