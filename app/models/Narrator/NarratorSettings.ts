import { CharacterType } from 'models/Character';

export enum NarratorSettingsKey {
  VOICE = 'voice',
  ANIMATION = 'animation',
  EXTRA_SPACE_FOR_NARRATOR = 'extra_space_for_narrator',
  CHARACTER = 'character',
}

export type NarratorSettings = {
  [NarratorSettingsKey.VOICE]: boolean;
  [NarratorSettingsKey.ANIMATION]: boolean;
  [NarratorSettingsKey.EXTRA_SPACE_FOR_NARRATOR]?: boolean;
  [NarratorSettingsKey.CHARACTER]: CharacterType;
};

export const CONFIRMED_OFF_SETTINGS: NarratorSettingsKey[] = [
  NarratorSettingsKey.ANIMATION,
  NarratorSettingsKey.VOICE,
];

export const NARRATOR_SETTINGS_POSITIONS = new Map<NarratorSettingsKey, number>(
  [
    [NarratorSettingsKey.VOICE, 0],
    [NarratorSettingsKey.ANIMATION, 1],
    [NarratorSettingsKey.EXTRA_SPACE_FOR_NARRATOR, 2],
    [NarratorSettingsKey.CHARACTER, 3],
  ],
);

// TODO use new setting in layouts
