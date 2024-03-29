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
  CURRENT_NAVIGATOR_AVAILABLE = 'current_navigator_available',
  CURRENT_NAVIGATOR_UNAVAILABLE = 'current_navigator_unavailable',
  NAVIGATOR_CALLED_OUT = 'navigators_called_out',
  CALL_OUT_UNAVAILABLE_ERROR = 'call_out_unavailable_error',
  CALL_OUT_CANCELLED = 'call_out_canceled',
  INTERVENTION_HAS_NAVIGATORS = 'intervention_has_navigators',
  INTERVENTION_HAS_NO_NAVIGATORS = 'intervention_has_no_navigators',
}

export enum ConversationChannelActionName {
  ON_MESSAGE_SENT = 'on_message_sent',
  ON_MESSAGE_READ = 'on_message_read',
  ON_CONVERSATION_CREATED = 'on_conversation_created',
  ON_CONVERSATION_ARCHIVED = 'on_conversation_archived',
  ON_FETCH_LIVE_CHAT_SETUP = 'on_fetch_live_chat_setup',
  ON_CURRENT_SCREEN_TITLE_CHANGED = 'on_current_screen_title_changed',
  ON_CALL_OUT_NAVIGATOR = 'on_call_out_navigator',
  ON_CANCEL_CALL_OUT = 'on_cancel_call_out',
}
