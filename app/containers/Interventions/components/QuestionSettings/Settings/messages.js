import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Settings';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  narrator: {
    id: `${scope}.narrator`,
    defaultMessage: 'Narrator',
  },
  branching: {
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
