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
  showParticipantFiles: {
    id: `${scope}.showParticipantFiles`,
    defaultMessage: 'Show resources',
  },
  hideParticipantFiles: {
    id: `${scope}.hideParticipantFiles`,
    defaultMessage: 'Hide resources',
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
  navigatorOffline: {
    id: `${scope}.navigatorOffline`,
    defaultMessage: '- Navigator became offline -',
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
    defaultMessage: 'Download Resources:',
  },
  callOutTheNavigator: {
    id: `${scope}.callOutTheNavigator`,
    defaultMessage: 'Call out the navigator',
  },
  callOutTheNavigatorModalContent: {
    id: `${scope}.callOutTheNavigatorModalContent`,
    defaultMessage:
      'Are you sure you really need help? We will send a notification to the navigator who should join the conversation within <primaryColorBold>15 minutes</primaryColorBold>. If not, then neither of the navigators was able to do so.',
  },
  yesIReallyNeedHelp: {
    id: `${scope}.yesIReallyNeedHelp`,
    defaultMessage: 'Yes, I really need help',
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
  currentScreenTitle: {
    id: `${scope}.currentScreenTitle`,
    defaultMessage: '{sessionName} - <b>{screenTitle}</b>',
  },
  initialScreen: {
    id: `${scope}.initialScreen`,
    defaultMessage: 'Initial screen',
  },
  interventionPageTitle: {
    id: `${scope}.interventionPageTitle`,
    defaultMessage: 'Intervention page',
  },
  noTitle: {
    id: `${scope}.noTitle`,
    defaultMessage: 'No title',
  },
  tlfb: {
    id: `${scope}.tlfb`,
    defaultMessage: 'TLFB',
  },
  connectWithAnotherNavigator: {
    id: `${scope}.connectWithAnotherNavigator`,
    defaultMessage: 'Connect with another navigator',
  },
  waitingForNavigator: {
    id: `${scope}.waitingForNavigator`,
    defaultMessage: 'Waiting for navigator',
  },
  notificationSent: {
    id: `${scope}.notificationSent`,
    defaultMessage:
      'The notification has been sent to the navigator. We are waiting for the response...',
  },
  youJustCalledTheNavigator: {
    id: `${scope}.youJustCalledTheNavigator`,
    defaultMessage: `You've just called the navigator and canceled it. You should use this feature <bold>very carefully</bold>, so let's try <secondaryColorBold>{timeLeft}</secondaryColorBold>.`,
  },
});
