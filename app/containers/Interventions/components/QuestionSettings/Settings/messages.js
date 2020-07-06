import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DefaultSettings';

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
});
