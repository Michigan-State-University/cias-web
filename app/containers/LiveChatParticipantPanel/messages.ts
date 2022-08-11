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
  conversationArchived: {
    id: `${scope}.conversationArchived`,
    defaultMessage: '- Navigator ended this conversation -',
  },
  navigatorsBusy: {
    id: `${scope}.navigatorsBusy`,
    defaultMessage: 'Sorry, but all our navigators are busy at the moment.',
  },
  phoneEmailContact: {
    id: `${scope}.phoneEmailContact`,
    defaultMessage:
      'You can contact us directly by calling a hotline or sending us e-mail',
  },
  phoneContact: {
    id: `${scope}.phoneContact`,
    defaultMessage: 'You can contact us directly by calling a hotline',
  },
  emailContact: {
    id: `${scope}.emailContact`,
    defaultMessage: 'You can contact us directly by sending us e-mail',
  },
  usefulLinks: {
    id: `${scope}.usefulLinks`,
    defaultMessage: 'Useful links',
  },
  downloadInstructions: {
    id: `${scope}.downloadInstructions`,
    defaultMessage: 'Download instructions:',
  },
  navigatorUnavailable: {
    id: `${scope}.navigatorUnavailable`,
    defaultMessage: 'All navigators are unavailable',
  },
  hello: {
    id: `${scope}.hello`,
    defaultMessage: 'Hello!',
  },
  navigatorArrived: {
    id: `${scope}.navigatorArrived`,
    defaultMessage:
      'The navigator just arrived. If you have any questions feel free to ask.',
  },
});
