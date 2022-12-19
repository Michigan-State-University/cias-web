import { Narrator, NarratorAnimation } from 'models/Narrator';

export type MissingAnimationReplacement = {
  from: NarratorAnimation;
  to: NarratorAnimation;
  availableAnimations: NarratorAnimation[];
};

export type MissingAnimationModalData = {
  missingAnimations: MissingAnimationReplacement[];
  newNarrator: Narrator;
};
