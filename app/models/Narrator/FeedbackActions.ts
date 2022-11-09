import { values } from 'lodash';
import { CharacterType } from 'models/Character';

export enum EFeedbackAction {
  SHOW_SPECTRUM = 'SHOW_SPECTRUM',
  SHOW_USER_VALUE = 'SHOW_USER_VALUE',
  SHOW_LOWER_VALUE = 'SHOW_LOWER_VALUE',
  SHOW_HIGHER_VALUE = 'SHOW_HIGHER_VALUE',
  NO_ACTION = 'NO_ACTION',
}

export const characterToEFeedbackActionMap: Record<CharacterType, string[]> = {
  [CharacterType.PEEDY]: values(EFeedbackAction),
  [CharacterType.EMMI]: [
    EFeedbackAction.SHOW_SPECTRUM,
    EFeedbackAction.NO_ACTION,
  ],
};
