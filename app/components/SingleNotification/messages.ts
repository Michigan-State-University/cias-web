import { defineMessages } from 'react-intl';

export const scope = 'app.components.SingleNotification';

export default defineMessages({
  transcriptIsReady: {
    id: `${scope}.conversationTranscriptReadyTitle`,
    defaultMessage: 'Transcript is ready',
  },
  conversationTranscriptReadyContent: {
    id: `${scope}.conversationTranscriptReadyContent`,
    defaultMessage: `Transcript of a conversation in <secondaryColorBold>{interventionName}</secondaryColorBold> is ready`,
  },
  interventionConversationsTranscriptReadyContent: {
    id: `${scope}.conversationTranscriptReadyContent`,
    defaultMessage: `Transcript of all conversations in <secondaryColorBold>{interventionName}</secondaryColorBold> is ready`,
  },
  successfullyRestoredInterventionTitle: {
    id: `${scope}.successfullyRestoredInterventionTitle`,
    defaultMessage: 'Intervention imported',
  },
  successfullyRestoredInterventionContent: {
    id: `${scope}.successfullyRestoredInterventionContent`,
    defaultMessage: `Intervention <secondaryColorBold>{interventionName}</secondaryColorBold> has been imported successfully`,
  },
  importFailedNotificationTitle: {
    id: `${scope}.importFailedNotificationTitle`,
    defaultMessage: 'Unsuccessful import',
  },
  importFailedNotificationContent: {
    id: `${scope}.importFailedNotificationContent`,
    defaultMessage: 'There was an issue with importing intervention',
  },
});