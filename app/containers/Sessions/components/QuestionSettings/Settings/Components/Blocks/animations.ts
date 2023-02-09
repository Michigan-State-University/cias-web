import animationNames from 'global/i18n/animationNames';
import { CharacterType } from 'models/Character';
import { IntlShape, MessageDescriptor } from 'react-intl';
import {
  getBodyAnimations,
  getHeadAnimations,
} from 'utils/animations/animationsNames';

export const headAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getHeadAnimations(character).map((name) =>
    formatMessage(
      animationNames[name as keyof typeof animationNames] as MessageDescriptor,
    ),
  );

export const bodyAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getBodyAnimations(character).map((name) =>
    formatMessage(animationNames[name as keyof typeof animationNames]),
  );
