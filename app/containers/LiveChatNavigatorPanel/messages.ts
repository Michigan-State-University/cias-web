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
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'Type your message here...',
  },
  inputSendIconTitle: {
    id: `${scope}.inputSendIconTitle`,
    defaultMessage: 'Send message',
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
  noConversationsIconAlt: {
    id: `${scope}.noConversationsIconAlt`,
    defaultMessage: 'No conversations available icon',
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
  archiveConfirmationModalMessage: {
    id: `${scope}.archiveConfirmationModalMessage`,
    defaultMessage: `Are you sure you want to archive this conversation?`,
  },
  archiveConfirmationModalContent: {
    id: `${scope}.archiveConfirmationModalContent`,
    defaultMessage: `This operation is irreversible.`,
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
  inbox: {
    id: `${scope}.inbox`,
    defaultMessage: 'Inbox',
  },
  archivedMessages: {
    id: `${scope}.archivedMessages`,
    defaultMessage: 'Archived messages',
  },
  noActiveConversations: {
    id: `${scope}.noActiveConversations`,
    defaultMessage:
      "It seems you don't have any conversations in inbox. Wait for messages from participant or go to the <bold>Archive</bold> to see archived conversations.",
  },
  noArchivedConversations: {
    id: `${scope}.noArchivedConversations`,
    defaultMessage:
      "It seems you don't have any archived conversations. Go to the <bold>Inbox</bold> to see active chats.",
  },
  noActiveConversationOpened: {
    id: `${scope}.noActiveConversationOpened`,
    defaultMessage:
      'Please, <bold>select a conversation</bold> to talk with participant',
  },
  noArchivedConversationOpened: {
    id: `${scope}.noArchivedConversationOpened`,
    defaultMessage:
      'Please, <bold>select a conversation</bold> to see messages',
  },
  helpingMaterials: {
    id: `${scope}.helpingMaterials`,
    defaultMessage: 'Helping materials',
  },
  usefulLinks: {
    id: `${scope}.usefulLinks`,
    defaultMessage: 'Useful links',
  },
  filesToDownload: {
    id: `${scope}.filesToDownload`,
    defaultMessage: 'Files to download',
  },
});
