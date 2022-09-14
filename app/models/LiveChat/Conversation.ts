import { LastMessage } from './Message';
import { Interlocutor } from './Interlocutor';

export type DenormalizedConversation = {
  id: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Interlocutor[];
  archived: boolean;
  interventionId: string;
  interventionName: string;
  currentScreenTitle: string;
};

export type Conversation = {
  id: string;
  interventionId: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Record<Interlocutor['id'], Interlocutor>;
  archived: boolean;
  currentScreenTitle: string;
};
