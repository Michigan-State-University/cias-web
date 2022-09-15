import { CharacterType } from 'models/Character';
import { IntlShape, MessageDescriptor } from 'react-intl';
import {
  getBodyAnimations,
  getHeadAnimations,
} from 'utils/animations/animationsNames';

import messages from './messages';

export const headAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getHeadAnimations(character).map((name) =>
    formatMessage(messages[name as keyof typeof messages] as MessageDescriptor),
  );

export const bodyAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getBodyAnimations(character).map((name) =>
    formatMessage(messages[name as keyof typeof messages]),
  );
