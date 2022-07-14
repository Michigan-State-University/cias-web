/*
 * LiveChat Messages
 *
 * This contains all the text for the LiveChat component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LiveChat';

export default defineMessages({
  message: {
    id: `${scope}.message`,
    defaultMessage: 'Message',
  },
  inbox: {
    id: `${scope}.inbox`,
    defaultMessage: 'Inbox',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'Type your message here...',
  },
  inputSendIconTitle: {
    id: `${scope}.inputSendIconTitle`,
    defaultMessage: 'Send message',
  },
  messagesError: {
    id: `${scope}.messagesError`,
    defaultMessage: 'There was a problem with fetching chat messages',
  },
  conversationsError: {
    id: `${scope}.conversationsError`,
    defaultMessage: 'There was a problem with fetching chat conversations',
  },
  messageTooLong: {
    id: `${scope}.messageTooLong`,
    defaultMessage: 'The maximum length for message is {maxLength} characters',
  },
  startConversation: {
    id: `${scope}.startConversation`,
    defaultMessage: 'Start or open a conversation',
  },
  you: {
    id: `${scope}.you`,
    defaultMessage: 'You: ',
  },
  createConversation: {
    id: `${scope}.createConversation`,
    defaultMessage: 'Create conversation',
  },
  firstMessage: {
    id: `${scope}.firstMessage`,
    defaultMessage: 'First message',
  },
  noConversations: {
    id: `${scope}.noConversations`,
    defaultMessage:
      "It seems you don't have any conversations in inbox. Wait for messages from participant or go to the <bold>Archive</bold> to see archived conversations.",
  },
  noConversationsIconAlt: {
    id: `${scope}.noConversationsIconAlt`,
    defaultMessage: 'No conversations available icon',
  },
  noConversationOpened: {
    id: `${scope}.noConversationOpened`,
    defaultMessage:
      'Please, <bold>select a conversation</bold> to talk with participant',
  },
  noConversationOpenedIconAlt: {
    id: `${scope}.noConversationOpenedIconAlt`,
    defaultMessage: 'Select a conversation icon',
  },
  noMessages: {
    id: `${scope}.noMessages`,
    defaultMessage: 'No messages yet',
  },
  interventionId: {
    id: `${scope}.interventionId`,
    defaultMessage: 'Intervention ID',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  archiveIconAlt: {
    id: `${scope}.archiveIconAlt`,
    defaultMessage: 'Archive icon',
  },
  archiveConfirmationModalTitle: {
    id: `${scope}.archiveConfirmationModalTitle`,
    defaultMessage: 'Archive conversation',
  },
  archiveConfirmationModalMessage: {
    id: `${scope}.archiveConfirmationModalMessage`,
    defaultMessage:
      'Are you sure you want to archive this conversation? This operation is irreversible.',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
});
