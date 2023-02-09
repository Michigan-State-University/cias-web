import { AppFile } from 'models/File';
import { LastMessage } from './Message';
import { Interlocutor } from './Interlocutor';

export type DenormalizedConversation = {
  id: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Interlocutor[];
  archivedAt: Nullable<string>;
  interventionId: string;
  interventionName: string;
  transcript: Nullable<AppFile>;
  currentScreenTitle: string;
};

export type Conversation = {
  id: string;
  interventionId: string;
  lastMessage: LastMessage;
  liveChatInterlocutors: Record<Interlocutor['id'], Interlocutor>;
  archivedAt: Nullable<string>;
  transcript: Nullable<AppFile>;
  currentScreenTitle: string;
};
