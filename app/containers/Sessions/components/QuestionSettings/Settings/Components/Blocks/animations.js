import {
  bodyAnimations as bodyAnimationsNames,
  headAnimations as headAnimationsNames,
} from 'utils/animations/animationsNames';

import messages from './messages';

export const headAnimations = formatMessage =>
  headAnimationsNames.map(name => formatMessage(messages[name]));

export const bodyAnimations = formatMessage =>
  bodyAnimationsNames.map(name => formatMessage(messages[name]));
