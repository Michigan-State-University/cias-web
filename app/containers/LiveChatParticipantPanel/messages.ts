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
    defaultMessage: 'Live chat icon',
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
  callOutInstruction: {
    id: `${scope}.callOutInstruction`,
    defaultMessage: `Please click the "<textColorBold>Connect with Support</textColorBold>" button above to request a team member to message with.`,
  },
  call988or911: {
    id: `${scope}.call988or911`,
    defaultMessage: `If this an emergency please dial <phone>988</phone> for the suicide & crisis lifeline, or <phone>911</phone>.`,
  },
  phoneEmailContact: {
    id: `${scope}.phoneEmailContact`,
    defaultMessage:
      'You can contact us directly by calling our team or by sending us an e-mail',
  },
  phoneContact: {
    id: `${scope}.phoneContact`,
    defaultMessage: 'You can contact us directly by calling our team',
  },
  emailContact: {
    id: `${scope}.emailContact`,
    defaultMessage: 'You can contact us directly by sending us an e-mail',
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
    defaultMessage: 'Connect with Support',
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
  workingOnRequest: {
    id: `${scope}.workingOnRequest`,
    defaultMessage: `We're working on your request.\nThank you for your patience.`,
  },
  youJustCalledTheNavigator: {
    id: `${scope}.youJustCalledTheNavigator`,
    defaultMessage: `You've just called the navigator and canceled it. You should use this feature <bold>very carefully</bold>, so let's try <secondaryColorBold>{timeLeft}</secondaryColorBold>.`,
  },
  cancelRequest: {
    id: `${scope}.cancelRequest`,
    defaultMessage: `Cancel request`,
  },
  navigatorNotFound: {
    id: `${scope}.navigatorNotFound`,
    defaultMessage: `We haven't found anyone yet.\nDo you want to keep waiting?`,
  },
  call988: {
    id: `${scope}.call988`,
    defaultMessage: `Please remember that you can also call <phone>988</phone> to talk with a National Lifeline Counselor anytime.`,
  },
  endRequest: {
    id: `${scope}.endRequest`,
    defaultMessage: `End Request`,
  },
  iWillWait: {
    id: `${scope}.iWillWait`,
    defaultMessage: `I'll Wait`,
  },
});
