import PeedyIcon from 'assets/svg/character-peedy.svg';
import FridaIcon from 'assets/svg/character-frida.svg';

import { CharacterType } from 'models/Character';

export const characterToIconMap: Record<CharacterType, SVGElement> = {
  [CharacterType.PEEDY]: PeedyIcon,
  [CharacterType.FRIDA]: FridaIcon,
};
