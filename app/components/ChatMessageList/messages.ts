/*
 * ChatMessageList Messages
 *
 * This contains all the text for the ChatMessageList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ChatMessageList';

export default defineMessages({
  noMessages: {
    id: `${scope}.noMessages`,
    defaultMessage: 'No messages yet',
  },
});
