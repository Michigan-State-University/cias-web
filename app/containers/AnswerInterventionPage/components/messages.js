import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Answer';

export default defineMessages({
  textPlaceholder: {
    id: `${scope}.textPlaceholder`,
    defaultMessage: 'Answer the question...',
  },
  numberPlaceholder: {
    id: `${scope}.numberPlaceholder`,
    defaultMessage: 'Enter a number...',
  },
});
