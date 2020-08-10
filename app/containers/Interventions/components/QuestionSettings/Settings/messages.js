import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Settings';

export default defineMessages({
  Settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  Narrator: {
    id: `${scope}.narrator`,
    defaultMessage: 'Narrator',
  },
  Branching: {
    id: `${scope}.branching`,
    defaultMessage: 'Branching',
  },
  errors: {
    duplicateVariable: {
      id: `${scope}.duplicateVariable`,
      defaultMessage: 'This variable name is already in use!',
    },
  },
});
