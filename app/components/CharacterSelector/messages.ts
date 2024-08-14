import { defineMessages } from 'react-intl';

import { CharacterType } from 'models/Character';

export const scope = 'app.components.CharacterSelector';

export default defineMessages({
  [CharacterType.PEEDY]: {
    id: `${scope}.peedy`,
    defaultMessage: 'Peedy',
  },
  [CharacterType.EMMI]: {
    id: `${scope}.emmi`,
    defaultMessage: 'Emmi',
  },
  [CharacterType.CRYSTAL]: {
    id: `${scope}.crystal`,
    defaultMessage: 'crystal',
  },
});
