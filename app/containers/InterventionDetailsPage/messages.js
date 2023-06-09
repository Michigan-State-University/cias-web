/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

import { CatMhLicenseType } from 'models/Intervention';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  createSession: {
    id: `${scope}.createSession`,
    defaultMessage: 'Create session',
  },
  noInterventions: {
    id: `${scope}.noInterventions`,
    defaultMessage: `You don't have any interventions`,
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: `Filter by name`,
  },
  noFilterResults: {
    id: `${scope}.noFilterResults`,
    defaultMessage: `There are no interventions with this criteria`,
  },
  showArchived: {
    id: `${scope}.showArchived`,
    defaultMessage: `Show Archived`,
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back to dashboard',
  },
  backToOrganization: {
    id: `${scope}.backToOrganization`,
    defaultMessage: 'Back to organization dashboard setup',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Intervention Name',
  },
  adjust: {
    id: `${scope}.adjust`,
    defaultMessage: 'Edit',
  },
  translate: {
    id: `${scope}.translate`,
    defaultMessage: 'Translate',
  },
  shareExternally: {
    id: `${scope}.shareExternally`,
    defaultMessage: 'Share externally',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
  },
  duplicateHere: {
    id: `${scope}.duplicateHere`,
    defaultMessage: 'Duplicate here',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  participantShareModalTitle: {
    id: `${scope}.participantShareModalTitle`,
    defaultMessage: 'Send an email with the invitation',
  },
  catMhSettingsOption: {
    id: `${scope}.catMhSettingsOption`,
    defaultMessage: 'CAT-MH™ Access',
  },
  catMhSettingsModalTitle: {
    id: `${scope}.catMhSettingsModalTitle`,
    defaultMessage: 'Access to CAT-MH™',
  },
  anyone: {
    id: `${scope}.anyone`,
    defaultMessage: 'Anyone with the link can access sessions',
  },
  registered: {
    id: `${scope}.registered`,
    defaultMessage:
      'Anyone who is a registered participant can access sessions',
  },
  invited: {
    id: `${scope}.invited`,
    defaultMessage: 'Only selected registered participants can access sessions',
  },
  sessionDeleteHeader: {
    id: `${scope}.sessionDeleteHeader`,
    defaultMessage: 'Delete Session',
  },
  sessionDeleteMessage: {
    id: `${scope}.sessionDeleteMessage`,
    defaultMessage:
      'Are you sure you want to delete this session? It will no longer be possible to recover it later.',
  },
  interventionArchiveHeader: {
    id: `${scope}.interventionArchiveHeader`,
    defaultMessage: 'Archive Intervention',
  },
  interventionArchiveMessage: {
    id: `${scope}.interventionArchiveMessage`,
    defaultMessage: 'Are you sure you want to archive this Intervention?',
  },
  interventionSettings: {
    id: `${scope}.interventionSettings`,
    defaultMessage: '<b>Intervention Settings</b> (Language, Quick Exit)',
  },
  interventionSettingsIconTooltip: {
    id: `${scope}.interventionSettingsIconTooltip`,
    defaultMessage: 'Open Intervention Settings',
  },
  interventionSettingsModalTitle: {
    id: `${scope}.interventionSettingsModalTitle`,
    defaultMessage: 'Intervention Settings',
  },
  assignOrganization: {
    id: `${scope}.assignOrganization`,
    defaultMessage: 'Assign Organization',
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Intervention: {name}',
  },
  translateInterventionModalLabel: {
    id: `${scope}.translateInterventionModalLabel`,
    defaultMessage: 'Translate Intervention',
  },
  catMhCounter: {
    id: `${scope}.catMhCounter`,
    defaultMessage: `<bold>CAT-MH™ License</bold>: {licenseType, select,
        ${CatMhLicenseType.LIMITED} {Limited (<counter>{used}/{initial}</counter> <space></space> tests used)}
        ${CatMhLicenseType.UNLIMITED} {Unlimited (<counter>{used}</counter> <space></space> tests used)}
      }`,
  },
  catMhCountInfo: {
    id: `${scope}.catMhCountInfo`,
    defaultMessage:
      "This assessment count is for informational purposes and may not align with your institution's <bold>Adaptive Testing Technologies (ATT) CAT-MH™</bold> license and should not be relied upon for financial or budgetary purposes. Please contact your ATT project director or <bold>info@adaptivetestingtechnologies.com</bold> for license or usage questions.",
  },
  inviteToIntervention: {
    id: `${scope}.inviteToIntervention`,
    defaultMessage: 'Invite Participants',
  },
  exportIntervention: {
    id: `${scope}.exportIntervention`,
    defaultMessage: 'Export Intervention',
  },
  collaborate: {
    id: `${scope}.collaborate`,
    defaultMessage: 'Collaborate',
  },
  collaborateDescription: {
    id: `${scope}.collaborateDescription`,
    defaultMessage:
      'Use this feature to share your original intervention and indicate the desired access level for each collaborator.',
  },
});
