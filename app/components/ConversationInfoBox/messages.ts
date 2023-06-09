/*
 * ConversationInfoBox Messages
 *
 * This contains all the text for the ConversationInfoBox component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ConversationInfoBox';

export default defineMessages({
  you: {
    id: `${scope}.you`,
    defaultMessage: 'You: {messageContent}',
  },
  me: {
    id: `${scope}.me`,
    defaultMessage: 'Me: {messageContent}',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
});
