import { defineMessages } from 'react-intl';

import { InterventionType } from 'models/Intervention';

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
  interventionSettingsQuickExitLabel: {
    id: `${scope}.interventionSettingsQuickExitLabel`,
    defaultMessage: 'Turn on Quick Exit',
  },
  applyChangesButton: {
    id: `${scope}.applyChangesButton`,
    defaultMessage: 'Apply global changes',
  },
  interventionLinkHeader: {
    id: `${scope}.interventionLinkHeader`,
    defaultMessage: 'Custom Intervention Link',
  },
  interventionLinkDescription: {
    id: `${scope}.interventionLinkDescription`,
    defaultMessage: `This link directs user to the {interventionType, select, ${InterventionType.DEFAULT} {first session in this intervention} other {module home screen}}`,
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