/*
 * LiveChat Messages
 *
 * This contains all the text for the LiveChat component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LiveChat';

export default defineMessages({
  header: {
    id: `${scope}.header`,
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
  conversationError: {
    id: `${scope}.conversationError`,
    defaultMessage: 'There was a problem with fetching chat messages',
  },
});
