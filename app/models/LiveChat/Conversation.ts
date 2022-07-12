import { LastMessage } from './Message';
import { Interlocutor } from './Interlocutor';

export type DenormalizedConversation = {
  id: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Interlocutor[];
  interventionId: string;
  interventionName: string;
};

export type Conversation = {
  id: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Record<Interlocutor['id'], Interlocutor>;
};

export type ConversationCreatedDTO = {
  firstMessageContent: string;
  interventionId: string;
};
