/*
 * ChatWidget Messages
 *
 * This contains all the text for the LiveChatParticipantPanel container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LiveChatParticipantPanel';

export default defineMessages({
  iconAlt: {
    id: `${scope}.iconAlt`,
    defaultMessage: 'Live chat active icon',
  },
  openPanelTitle: {
    id: `${scope}.openPanelTitle`,
    defaultMessage: 'Open chat panel',
  },
  minimizePanelTitle: {
    id: `${scope}.minimizePanelTitle`,
    defaultMessage: 'Minimize chat panel',
  },
  startConversation: {
    id: `${scope}.startConversation`,
    defaultMessage:
      'Write a message to start a new conversation with navigator',
  },
});
