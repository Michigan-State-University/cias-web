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
    defaultMessage: 'Intervention Link',
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
});
