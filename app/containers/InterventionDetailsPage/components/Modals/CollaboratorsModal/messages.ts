import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionModals.CollaboratorsModal';

export default defineMessages({
  inviteUsers: {
    id: `${scope}.inviteUsers`,
    defaultMessage: 'Invite users',
  },
  invite: {
    id: `${scope}.invite`,
    defaultMessage: 'Invite',
  },
  currentCollaborators: {
    id: `${scope}.currentCollaborators`,
    defaultMessage: 'Current collaborators',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: 'View',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  dataAccess: {
    id: `${scope}.dataAccess`,
    defaultMessage: 'Data access',
  },
  areYouSure: {
    id: `${scope}.areYouSure`,
    defaultMessage: 'Are you sure?',
  },
  removeAccess: {
    id: `${scope}.removeAccess`,
    defaultMessage: 'Remove access',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  tooltipDescription: {
    id: `${scope}.tooltipDescription`,
    defaultMessage: 'Pending invitation',
  },
  doNotRemoveAccess: {
    id: `${scope}.doNotRemoveAccess`,
    defaultMessage: 'Do not remove access',
  },
});
