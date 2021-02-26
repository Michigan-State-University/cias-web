import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ThirdParty';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Third Party {index}',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new Third Party',
  },
  emailError: {
    id: `${scope}.emailError`,
    defaultMessage: 'Incorrect email address entered',
  },
});
