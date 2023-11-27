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
  autofinishTooltipOne: {
    id: `${scope}.autofinishTooltipOne`,
    defaultMessage: `Autofinish lets researchers determine when a session will be marked as complete for participants after a period of inactivity. If a participant becomes inactive past the autofinish time determined by the researcher, the intervention will be marked as complete, whether or not the participant reaches the end of the session. The autofinish timer will reset every time the participant answers a question. By default, autofinish is turned off, meaning the session will only be marked as complete when the participant reaches the end of the session. Using the autofinish feature is beneficial if you want to ensure participants receive any reports or text messages associated with completion of the session, and if you want to ensure the next session of the intervention becomes available within the pre-determined about of time.`,
  },
  autofinishTooltipTwo: {
    id: `${scope}.autofinishTooltipTwo`,
    defaultMessage: `<bold>Note: Autofinish needs to be turned on for the “Send reports/SMS after this screen” toggle to become available on a screen level. That toggle allows you to tell CIAS to begin the autofinish countdown only after a certain screen is reached.</bold>`,
  },
  autofinishEnabledLabel: {
    id: `${scope}.autofinishEnabledLabel`,
    defaultMessage: 'Set Autofinish timer',
  },
  autofinishDelayLabel: {
    id: `${scope}.autofinishDelayLabel`,
    defaultMessage: 'Autofinish delay',
  },
  autocloseEnabledLabel: {
    id: `${scope}.autocloseEnabledLabel`,
    defaultMessage: 'Set session close date',
  },
  autocloseTooltip: {
    id: `${scope}.autocloseTooltip`,
    defaultMessage: `Select a time to automatically close the session. This will prevent participants from accessing the session after the selected time.`,
  },
  autocloseAtLabel: {
    id: `${scope}.autocloseAtLabel`,
    defaultMessage: 'Session close date',
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
