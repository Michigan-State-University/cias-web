import { CharacterType } from 'models/Character';
import { defineMessages } from 'react-intl';

export const scope = 'app.components.CharacterSelector';

export default defineMessages({
  [CharacterType.PEEDY]: {
    id: `${scope}.${CharacterType.PEEDY}`,
    defaultMessage: 'Peedy',
  },
  [CharacterType.EMMI]: {
    id: `${scope}.${CharacterType.EMMI}`,
    defaultMessage: 'Emmi',
  },
});
