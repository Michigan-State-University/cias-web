import { CharacterType } from 'models/Character';

export const importAnimation = async (
  character: CharacterType = CharacterType.PEEDY,
  animationName: string,
) => import(`assets/animations/${character}/${animationName}.json`);
