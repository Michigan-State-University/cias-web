import { Narrator, NarratorAnimation } from 'models/Narrator';

export type MissingAnimationReplacement = {
  from: NarratorAnimation;
  to: NarratorAnimation;
};

export type MissingAnimationModalData = {
  missingAnimations: MissingAnimationReplacement[];
  newNarrator: Narrator;
};
