/*
 * TranslateVoiceSettings Messages
 *
 * This contains all the text for the TranslateVoiceSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.TranslateInterventionModal.components.TranslateVoiceSettings';

export default defineMessages({
  noNarrator: {
    id: `${scope}.noNarrator`,
    defaultMessage:
      'The selected destination language does not have a narrator!',
  },
  voiceType: {
    id: `${scope}.voiceType`,
    defaultMessage: 'Peedy voice type',
  },
  selectVoice: {
    id: `${scope}.selectVoice`,
    defaultMessage: 'Select voice',
  },
  testVoice: {
    id: `${scope}.testVoice`,
    defaultMessage: 'Test voice!',
  },
});
