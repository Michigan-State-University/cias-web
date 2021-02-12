import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CurrencySelect';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Select currency',
  },
  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: 'Currency not found',
  },
});
