import { Narrator, NarratorAnimation } from 'models/Narrator';

export type MissingAnimationReplacement = {
  from: NarratorAnimation;
  to: NarratorAnimation;
};

export type MissingAnimationModalState = Nullable<{
  missingAnimations: MissingAnimationReplacement[];
  newNarrator?: Narrator;
}>;
