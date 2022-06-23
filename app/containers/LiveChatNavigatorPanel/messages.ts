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
  userId: {
    id: `${scope}.userId`,
    defaultMessage: 'User ID',
  },
  noConversations: {
    id: `${scope}.noConversations`,
    defaultMessage: "You don't have any active conversations",
  },
  noMessages: {
    id: `${scope}.noMessages`,
    defaultMessage: 'No messages yet',
  },
});
