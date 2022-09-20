/*
 * ChatMessageInput Messages
 *
 * This contains all the text for the ChatMessageInput component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ChatMessageInput';

export default defineMessages({
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
});
