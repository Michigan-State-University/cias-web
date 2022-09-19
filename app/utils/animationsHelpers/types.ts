import { NarratorAnimation, NarratorBlockTypes } from 'models/Narrator';

export type TAnimationData = {
  type?: NarratorBlockTypes;
  name: NarratorAnimation;
  animationData: JSON;
  pause: number;
  isAutoRest: boolean;
};
