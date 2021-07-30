/*
 * TranslateLanguageSettings Messages
 *
 * This contains all the text for the TranslateLanguageSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.TranslateInterventionModal.components.TranslateLanguageSettings';

export default defineMessages({
  sourceLanguage: {
    id: `${scope}.sourceLanguage`,
    defaultMessage: 'Source language',
  },
  destinationLanguage: {
    id: `${scope}.destinationLanguage`,
    defaultMessage: 'Destination language',
  },
  searchLanguage: {
    id: `${scope}.searchLanguage`,
    defaultMessage: 'Search language',
  },
});
