import { defineMessages } from 'react-intl';

export const scope =
  'app.components.InterventionModals.InterventionSettingsModal';

export default defineMessages({
  interventionSettingsModalSubtitle: {
    id: `${scope}.interventionSettingsModalSubtitle`,
    defaultMessage: 'Change the default settings for the entire intervention',
  },
  interventionSettingsLanguageLabel: {
    id: `${scope}.interventionSettingsLanguageLabel`,
    defaultMessage: 'Language',
  },
  interventionSettingsQuickExit: {
    id: `${scope}.interventionSettingsQuickExit`,
    defaultMessage: 'Quick Exit',
  },
  quickExitHelp: {
    id: `${scope}.quickExitHelp`,
    defaultMessage: `This setting allows participants to quickly leave the intervention if their privacy is compromised. To learn more, click <a href='https://www.cias.app/_files/ugd/afc5c9_2656a8eb9ed6490d9d33c1d36a30405a.pdf' target='_blank'>here</a>. For more resources, visit <a href='https://www.cias.app/resources' target='_blank'>www.cias.app/resources</a>.`,
  },
  interventionSettingsQuickExitLabel: {
    id: `${scope}.interventionSettingsQuickExitLabel`,
    defaultMessage: 'Turn on Quick Exit',
  },
  skipWarningScreen: {
    id: `${scope}.skipWarningScreen`,
    defaultMessage: 'Initial Warning Screen',
  },
  skipWarningScreenLabel: {
    id: `${scope}.skipWarningScreenLabel`,
    defaultMessage: 'Turn on Initial Warning Screen',
  },
  skipWarningScreenHelp: {
    id: `${scope}.skipWarningScreenHelp`,
    defaultMessage:
      'When enabled, participants will be presented with the initial warning screen before they can proceed to the intervention content.',
  },
  applyChangesButton: {
    id: `${scope}.applyChangesButton`,
    defaultMessage: 'Apply global changes',
  },
  interventionLinkHeader: {
    id: `${scope}.interventionLinkHeader`,
    defaultMessage: 'Custom Intervention Link',
  },
  defaultNarrator: {
    id: `${scope}.defaultNarrator`,
    defaultMessage: 'Default narrator',
  },
  copyLink: {
    id: `${scope}.copyLink`,
    defaultMessage: 'Copy link',
  },
  createLink: {
    id: `${scope}.createLink`,
    defaultMessage: 'Create custom link',
  },
  removeLink: {
    id: `${scope}.removeLink`,
    defaultMessage: 'Remove custom link',
  },
  linkTaken: {
    id: `${scope}.linkTaken`,
    defaultMessage: 'This intervention link is already taken',
  },
  linkMustBeUnique: {
    id: `${scope}.linkMustBeUnique`,
    defaultMessage: 'Each intervention link must be unique',
  },
  linkSwitchAriaLabel: {
    id: `${scope}.linkSwitchAriaLabel`,
    defaultMessage: 'Toggle custom intervention link usage',
  },
  linkSwitchAriaLabelForClinic: {
    id: `${scope}.linkSwitchAriaLabelForClinic`,
    defaultMessage:
      'Toggle custom intervention link usage for {healthClinicName}',
  },
  linkInputAriaLabel: {
    id: `${scope}.linkInputAriaLabel`,
    defaultMessage: 'Custom intervention link',
  },
  linkInputAriaLabelForClinic: {
    id: `${scope}.linkInputAriaLabelForClinic`,
    defaultMessage: 'Custom intervention link for {healthClinicName}',
  },
});
