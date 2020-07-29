/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Navbar.components';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Intervention Name',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: 'Screens Content',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'General Settings',
  },
  sharing: {
    id: `${scope}.sharing`,
    defaultMessage: 'Manage Sharing',
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Open Preview',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next Question',
  },
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'Previous Question',
  },
});
