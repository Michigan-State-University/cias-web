import { defineMessages } from 'react-intl';

export const scope = 'app.components.AlertPhones`';

export default defineMessages({
  SMSAlertRecipients: {
    id: `${scope}.SMSAlertRecipients`,
    defaultMessage: 'SMS Alert Recipients',
  },
  removeRecipient: {
    id: `${scope}.removeRecipient`,
    defaultMessage: 'Remove recipient',
  },
  addAnotherRecipient: {
    id: `${scope}.addAnotherRecipient`,
    defaultMessage: '+ Add another recipient',
  },
});
