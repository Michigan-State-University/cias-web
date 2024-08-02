import PeedyIcon from 'assets/svg/character-peedy.svg';
import EmmiIcon from 'assets/svg/character-emmi.svg';
import CrystalIcon from 'assets/svg/character-crystal.svg';

import { CharacterType } from 'models/Character';

export const characterToIconMap: Record<CharacterType, SVGElement> = {
  [CharacterType.PEEDY]: PeedyIcon,
  [CharacterType.EMMI]: EmmiIcon,
  [CharacterType.CRYSTAL]: CrystalIcon,
};
