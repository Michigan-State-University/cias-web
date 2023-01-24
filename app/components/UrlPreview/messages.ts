import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UrlPreview';

export default defineMessages({
  422: {
    id: `${scope}.422`,
    defaultMessage: 'The provided URL is invalid',
  },
  417: {
    id: `${scope}.417`,
    defaultMessage: 'The provided URL is empty',
  },
  defaultErrorMessage: {
    id: `${scope}.defaultErrorMessage`,
    defaultMessage: 'An unknown error occurred while parsing the URL',
  },
});
