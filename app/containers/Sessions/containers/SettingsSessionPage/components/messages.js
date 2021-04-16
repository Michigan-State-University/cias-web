import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsSessionPage.Components';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Session Name',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Name',
  },
  variableLabel: {
    id: `${scope}.variableLabel`,
    defaultMessage: 'Variable',
  },
  narratorSettings: {
    id: `${scope}.narratorSettings`,
    defaultMessage: 'Narrator Settings',
  },
  narratorActive: {
    id: `${scope}.narratorActive`,
    defaultMessage: 'Narrator Active',
  },
  voice: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
  animation: {
    id: `${scope}.animation`,
    defaultMessage: 'Display Narrator',
  },
  getLink: {
    id: `${scope}.getLink`,
    defaultMessage: 'Get the link',
  },
  copied: {
    id: `${scope}.copied`,
    defaultMessage: 'Copied!',
  },
  accountRequired: {
    id: `${scope}.accountRequired`,
    defaultMessage: 'CIAS Account Required',
  },
  selectUsers: {
    id: `${scope}.selectUsers`,
    defaultMessage: 'Select users',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Enter new user e-mail addresses',
  },
  globalSettingRemovalConfirmation: {
    id: `${scope}.globalSettingRemovalConfirmation`,
    defaultMessage: 'Are you sure you want to disable Narrator?',
  },
  blockRemovalConfirmation: {
    id: `${scope}.blockRemovalConfirmation`,
    defaultMessage: 'Are you sure you want to disable {setting} setting?',
  },
  blockRemovalConfirmationDescription: {
    id: `${scope}.blockRemovalConfirmationDescription`,
    defaultMessage:
      'Those block types will be removed in all questions in this session and their data will be wiped out',
  },
  voiceSettings: {
    id: `${scope}.voiceSettings`,
    defaultMessage: 'Peedy voice settings',
  },
  peedyLanguage: {
    id: `${scope}.peedyLanguage`,
    defaultMessage: 'Peedy language',
  },
  peedyVoiceType: {
    id: `${scope}.peedyVoiceType`,
    defaultMessage: 'Peedy voice type',
  },
  saveVoiceSettings: {
    id: `${scope}.saveVoiceSettings`,
    defaultMessage: 'Save voice settings',
  },
});
