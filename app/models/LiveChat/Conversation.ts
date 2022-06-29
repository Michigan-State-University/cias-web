import { LastMessage } from './Message';
import { Interlocutor } from './Interlocutor';

export type DenormalizedConversation = {
  id: string;
  lastMessage: Nullable<LastMessage>;
  liveChatInterlocutors: Interlocutor[];
};

export type Conversation = {
  id: string;
  lastMessage: Nullable<LastMessage>;
  liveChatInterlocutors: Record<Interlocutor['id'], Interlocutor>;
};

export type ConversationCreatedDTO = {
  userId: string;
  interventionId: string;
};
