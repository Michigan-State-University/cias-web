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
  me: {
    id: `${scope}.me`,
    defaultMessage: 'Me: ',
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
  downloadTranscript: {
    id: `${scope}.downloadTranscript`,
    defaultMessage: 'Download CSV',
  },
  downloadTranscriptIconAlt: {
    id: `${scope}.downloadTranscriptIconAlt`,
    defaultMessage: 'Download CSV icon',
  },
  generateTranscript: {
    id: `${scope}.generateTranscript`,
    defaultMessage: 'Generate CSV',
  },
  generateTranscriptIconAlt: {
    id: `${scope}.generateTranscriptIconAlt`,
    defaultMessage: 'Generate CSV icon',
  },
  generateConversationTranscriptSuccess: {
    id: `${scope}.generateConversationTranscriptSuccess`,
    defaultMessage:
      'Generation of your transcript has just begun. You will receive an email after it is done.',
  },
  generateConversationTranscriptError: {
    id: `${scope}.generateConversationTranscriptError`,
    defaultMessage: 'Could not generate conversation transcript.',
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
    defaultMessage: 'Resources',
  },
  usefulLinks: {
    id: `${scope}.usefulLinks`,
    defaultMessage: 'Useful links',
  },
  filesToDownload: {
    id: `${scope}.filesToDownload`,
    defaultMessage: 'Files to download',
  },
  scriptsFromResearcher: {
    id: `${scope}.scriptsFromResearcher`,
    defaultMessage: 'Scripts from researcher',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Copy',
  },
});
