/*
 * ChatMessage Messages
 *
 * This contains all the text for the ChatMessage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ChatMessage';

export default defineMessages({
  read: {
    id: `${scope}.read`,
    defaultMessage: 'Read',
  },
  me: {
    id: `${scope}.me`,
    defaultMessage: 'Me',
  },
});
