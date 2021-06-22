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
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Email(s)',
  },
  emailError: {
    id: `${scope}.emailError`,
    defaultMessage:
      'Please enter email(s) in the following format, email1@example.com,email2@example.com',
  },
});
