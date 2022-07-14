export const CONVERSATION_CHANNEL_NAME = 'ConversationChannel';

export enum ConversationChannelMessageTopic {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_READ = 'message_read',
  CONVERSATION_CREATED = 'conversation_created',
  CONVERSATION_ARCHIVED = 'conversation_archived',
}

export enum ConversationChannelActionName {
  ON_MESSAGE_SENT = 'on_message_sent',
  ON_MESSAGE_READ = 'on_message_read',
  ON_CONVERSATION_CREATED = 'on_conversation_created',
  ON_CONVERSATION_ARCHIVED = 'on_conversation_archived',
}
