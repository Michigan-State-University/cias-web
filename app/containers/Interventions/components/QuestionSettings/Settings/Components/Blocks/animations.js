import { bodyAnimations as bodyAnimationsNames } from 'utils/animations/animationsNames';

import messages from './messages';

export const facialAnimations = () => [];

export const bodyAnimations = formatMessage =>
  bodyAnimationsNames.map(name => formatMessage(messages[name]));
