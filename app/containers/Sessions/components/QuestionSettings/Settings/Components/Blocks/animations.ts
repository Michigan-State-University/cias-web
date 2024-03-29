import animationsMessages from 'global/i18n/animationsMessages';
import { CharacterType } from 'models/Character';
import { IntlShape } from 'react-intl';
import {
  getBodyAnimations,
  getHeadAnimations,
} from 'utils/animations/animationsNames';

export const headAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getHeadAnimations(character).map((name) =>
    formatMessage(animationsMessages[name]),
  );

export const bodyAnimations = (
  formatMessage: IntlShape['formatMessage'],
  character: CharacterType,
) =>
  getBodyAnimations(character).map((name) =>
    formatMessage(animationsMessages[name]),
  );
