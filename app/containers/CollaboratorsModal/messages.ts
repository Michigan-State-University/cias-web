import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionModals.CollaboratorsModal';

export default defineMessages({
  collaborate: {
    id: `${scope}.collaborate`,
    defaultMessage: 'Collaborate',
  },
  collaborateDescription: {
    id: `${scope}.collaborateDescription`,
    defaultMessage:
      'Use this feature to share your original intervention and indicate the desired access level for each collaborator.',
  },
  collaboratorsHelp: {
    id: `${scope}.collaboratorsHelp`,
    defaultMessage: `Learn more about collaborate feature <a href='https://www.cias.app/_files/ugd/afc5c9_cf5b04b27ff6491e9fe55f073d1603d0.pdf' target='_blank'>here</a>. For more help resources, visit <a href='https://www.cias.app/resources' target='_blank'>www.cias.app/resources</a>.`,
  },
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
