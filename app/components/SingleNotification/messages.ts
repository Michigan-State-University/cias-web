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
});
