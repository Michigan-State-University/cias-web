import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CollaborationPanel';

export default defineMessages({
  currentMode: {
    id: `${scope}.currentMode`,
    defaultMessage:
      'You are currently in <medium>{editing, select, true {edit} other {view only}}</medium> mode',
  },
  enableEditing: {
    id: `${scope}.enableEditing`,
    defaultMessage: 'Enable Editing',
  },
  editedByOtherUser: {
    id: `${scope}.editedByOtherUser`,
    defaultMessage: 'Now edited by {firstName} {lastName} ({email})',
  },
  forceEditModalDescription: {
    id: `${scope}.forceEditModalDescription`,
    defaultMessage: 'Are you sure you want to enable editing?',
  },
  forceEditModalContent: {
    id: `${scope}.forceEditModalContent`,
    defaultMessage:
      'This intervention is being edited by {firstName} {lastName} ({email}) now. The user will be forced to finish editing.',
  },
});
