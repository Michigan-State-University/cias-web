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
});
