export const CONVERSATION_CHANNEL_NAME = 'ConversationChannel';

export enum ConversationChannelMessageTopic {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_ERROR = 'message_error',
  MESSAGE_READ = 'message_read',
  CONVERSATION_CREATED = 'conversation_created',
  CONVERSATION_ARCHIVED = 'conversation_archived',
  NAVIGATOR_UNAVAILABLE = 'navigator_unavailable',
  NAVIGATOR_UNAVAILABLE_ERROR = 'navigator_unavailable_error',
  LIVE_CHAT_SETUP_FETCHED = 'live_chat_setup_fetched',
  NAVIGATOR_AVAILABLE = 'navigator_available',
  CURRENT_SCREEN_TITLE_CHANGED = 'current_screen_title_changed',
}

export enum ConversationChannelActionName {
  ON_MESSAGE_SENT = 'on_message_sent',
  ON_MESSAGE_READ = 'on_message_read',
  ON_CONVERSATION_CREATED = 'on_conversation_created',
  ON_CONVERSATION_ARCHIVED = 'on_conversation_archived',
  ON_FETCH_LIVE_CHAT_SETUP = 'on_fetch_live_chat_setup',
  ON_CURRENT_SCREEN_TITLE_CHANGED = 'on_current_screen_title_changed',
}
