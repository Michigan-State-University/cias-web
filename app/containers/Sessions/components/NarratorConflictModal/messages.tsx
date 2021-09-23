/*
 * NarratorConflictModal Messages
 *
 * This contains all the text for the NarratorConflictModal component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Sessions.components.NarratorConflictModal';

export default defineMessages({
  turnOffNarrator: {
    id: `${scope}.turnOffNarrator`,
    defaultMessage: 'Turn off narrator',
  },
  changeNarratorLanguage: {
    id: `${scope}.changeNarratorLanguage`,
    defaultMessage: 'Change narrator language',
  },
  saveChanges: {
    id: `${scope}.saveChanges`,
    defaultMessage: 'Save changes',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  narratorVoiceType: {
    id: `${scope}.narratorVoiceType`,
    defaultMessage: 'Narrator voice type',
  },
  tryVoice: {
    id: `${scope}.tryVoice`,
    defaultMessage: 'Try it out!',
  },
  testNarratorVoice: {
    id: `${scope}.testNarratorVoice`,
    defaultMessage: 'Test narrator voice',
  },
  narratorConflictDescription: {
    id: `${scope}.narratorConflictDescription`,
    defaultMessage:
      'The {languageName} language chosen in the previous session is not available to the narrator. Turn off narration or change narrator language in this session.',
  },
  narratorVoiceConflict: {
    id: `${scope}.narratorVoiceConflict`,
    defaultMessage: 'Narrator voice conflict',
  },
});
