/*
 * SelectResearchersModal Messages
 *
 * This contains all the text for the SelectResearchersModal component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectResearchersModal';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SelectResearchersModal component!',
  },
  find: {
    id: `${scope}.find`,
    defaultMessage: 'Find researcher',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send copies',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
});
