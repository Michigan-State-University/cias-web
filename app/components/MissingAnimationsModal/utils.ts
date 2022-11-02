import { NarratorAnimation } from 'models/Narrator';

import { MissingAnimationReplacement } from './types';

export const getAnimationReplacement = (
  animationState: MissingAnimationReplacement[],
) =>
  animationState.reduce(
    (accumulator, { from, to }) => ({ ...accumulator, [from]: to }),
    {} as Record<NarratorAnimation, NarratorAnimation>,
  );
