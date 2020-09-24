import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UrlQuestion';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Paste or type a web page link to show it to a respondent.',
  },
  invalidUrl: {
    id: `${scope}.invalidUrl`,
    defaultMessage: 'A URL is not valid.',
  },
});
