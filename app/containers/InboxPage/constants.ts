export const CONVERSATION_CHANNEL_NAME = 'ConversationChannel';

export enum ConversationChannelMessageTopic {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_READ = 'message_read',
}

export enum ConversationChannelActionName {
  ON_MESSAGE_SENT = 'on_message_sent',
  ON_MESSAGE_READ = 'on_message_read',
}
