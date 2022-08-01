export const CONVERSATION_CHANNEL_NAME = 'ConversationChannel';

export enum ConversationChannelMessageTopic {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_ERROR = 'message_error',
  MESSAGE_READ = 'message_read',
  CONVERSATION_CREATED = 'conversation_created',
  CONVERSATION_ARCHIVED = 'conversation_archived',
  NAVIGATOR_UNAVAILABLE = 'navigator_unavailable',
  NAVIGATOR_UNAVAILABLE_ERROR = 'navigator_unavailable_error',
  NAVIGATOR_UNAVAILABLE_SETUP_SENT = 'navigator_unavailable_setup_sent',
}

export enum ConversationChannelActionName {
  ON_MESSAGE_SENT = 'on_message_sent',
  ON_MESSAGE_READ = 'on_message_read',
  ON_CONVERSATION_CREATED = 'on_conversation_created',
  ON_CONVERSATION_ARCHIVED = 'on_conversation_archived',
  FETCH_NAVIGATOR_UNAVAILABLE_SETUP = 'on_no_navigator_available',
}
