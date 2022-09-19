import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserList.containers.InviteResearchers';

export default defineMessages({
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Invite researcher',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'e.g john.doe@contact.com',
  },
  sectionTitle: {
    id: `${scope}.sectionTitle`,
    defaultMessage: `User's e-mail address`,
  },
  invitationsSection: {
    id: `${scope}.invitationsSection`,
    defaultMessage: 'Invitations sent ({length})',
  },
  buttonText: {
    id: `${scope}.buttonText`,
    defaultMessage: 'Send invitation',
  },
  invitationSent: {
    id: `${scope}.invitationSent`,
    defaultMessage: 'Invitation was sent successfully!',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Invalid e-mail address',
  },
  sendInvite: {
    id: `${scope}.sendInvite`,
    defaultMessage: 'Send another invite',
  },
  errorCanceling: {
    id: `${scope}.errorCanceling`,
    defaultMessage: 'Cannot cancel an invitation.',
  },
  successCanceling: {
    id: `${scope}.successCanceling`,
    defaultMessage: 'Invitation was successfully deleted!',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  userRole: {
    id: `${scope}.userRole`,
    defaultMessage: `User's role`,
  },
  userRoleComment: {
    id: `${scope}.userRoleComment`,
    defaultMessage: `To send an invitation you must choose at least one role`,
  },
});
