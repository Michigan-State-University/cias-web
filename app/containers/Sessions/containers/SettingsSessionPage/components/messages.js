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
  autofinishSettings: {
    id: `${scope}.autofinishSettings`,
    defaultMessage: 'Autofinish settings',
  },
  autofinishTooltip: {
    id: `${scope}.autofinishTooltip`,
    defaultMessage:
      'If you don’t mark any screen as "Fire report if get this far.", the autofinish timer will start at the begging of the session. The autofinish timer will be reset every time participant answers a question.',
  },
  autofinishEnabledLabel: {
    id: `${scope}.autofinishEnabledLabel`,
    defaultMessage: 'Finish session automatically',
  },
  autofinishDelayLabel: {
    id: `${scope}.autofinishDelayLabel`,
    defaultMessage: 'Autofinish delay',
  },
  hours: {
    id: `${scope}.hours`,
    defaultMessage: 'hours',
  },
  minutes: {
    id: `${scope}.minutes`,
    defaultMessage: 'minutes',
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
    defaultMessage: 'Narrator voice settings',
  },
  voiceLanguage: {
    id: `${scope}.voiceLanguage`,
    defaultMessage: 'Narrator language',
  },
  voiceType: {
    id: `${scope}.voiceType`,
    defaultMessage: 'Narrator voice type',
  },
  saveVoiceSettings: {
    id: `${scope}.saveVoiceSettings`,
    defaultMessage: 'Save voice settings',
  },
  testVoice: {
    id: `${scope}.testVoice`,
    defaultMessage: 'Test voice!',
  },
  defaultNarrator: {
    id: `${scope}.defaultNarrator`,
    defaultMessage: 'Default narrator',
  },
  multipleFill: {
    id: `${scope}.multipleFill`,
    defaultMessage: 'Ability to fill the session multiple times',
  },
  multipleFillTooltip: {
    id: `${scope}.multipleFillTooltip`,
    defaultMessage:
      'If the session is filled multiple times by the logged-in user, the scheduling and SMS will not change. You cannot use variables from the multiple fill session in other sessions.',
  },
});
