import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Name';

export default defineMessages({
  enterName: {
    id: `${scope}.enterName`,
    defaultMessage: 'Enter your name',
  },
  enterNamePhonetic: {
    id: `${scope}.enterNamePhonetic`,
    defaultMessage: 'Enter your name in phonetic notation',
  },
});
