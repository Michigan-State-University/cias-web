/*
 * TranslateInterventionModal Messages
 *
 * This contains all the text for the TranslateInterventionModal component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TranslateInterventionModal';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Translate the intervention into another language',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage:
      'The translated intervention will appear on your dashboard as a new intervention.',
  },
  translationSettings: {
    id: `${scope}.translationSettings`,
    defaultMessage: 'Translation settings',
  },
  translationSettingsComment: {
    id: `${scope}.translationSettingsComment`,
    defaultMessage:
      'Select the original language of the intervention and then the destination language.',
  },
  costsComment: {
    id: `${scope}.costsComment`,
    defaultMessage:
      'Enjoy this feature! But please also help us limit costs by avoiding unnecessary translation requests.',
  },
  translate: {
    id: `${scope}.translate`,
    defaultMessage: 'Translate',
  },
});
