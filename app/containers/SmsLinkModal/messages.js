/*
 * SmsLinkModal Messages
 *
 * This contains all the text for the SmsLinkModal container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SmsLinkModal';

export default defineMessages({
  videoCheckbox: {
    id: `${scope}.videoCheckbox`,
    defaultMessage: 'Video',
  },
  websiteCheckbox: {
    id: `${scope}.websiteCheckbox`,
    defaultMessage: 'Website',
  },
  checkboxLabel: {
    id: `${scope}.checkboxLabel`,
    defaultMessage: 'Link to',
  },
  urlLabel: {
    id: `${scope}.urlLabel`,
    defaultMessage: 'URL',
  },
  urlPlaceholder: {
    id: `${scope}.urlPlaceholder`,
    defaultMessage: 'Paste or type a webpage link',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save',
  },
});
