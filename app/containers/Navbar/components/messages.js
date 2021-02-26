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
    defaultMessage: 'e-Session Name',
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: 'Screen Creation',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'General Settings',
  },
  reportTemplates: {
    id: `${scope}.reportTemplates`,
    defaultMessage: 'Report Templates',
  },
  previewStart: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview From Start',
  },
  previewCurrent: {
    id: `${scope}.previewCurrent`,
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
  saving: {
    id: `${scope}.saving`,
    defaultMessage: 'Saving',
  },
  saved: {
    id: `${scope}.saved`,
    defaultMessage: 'Saved',
  },
});
