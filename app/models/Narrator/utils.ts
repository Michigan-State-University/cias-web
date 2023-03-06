import {
  NARRATOR_SETTINGS_POSITIONS,
  NarratorSettings,
  NarratorSettingsKey,
} from './NarratorSettings';

export const narratorSettingsToSortedEntries = (settings: NarratorSettings) =>
  (
    Object.entries(settings) as [
      NarratorSettingsKey,
      ValueOf<NarratorSettings>,
    ][]
  ).sort(([settingKeyA], [settingKeyB]) => {
    const positionA = NARRATOR_SETTINGS_POSITIONS.get(settingKeyA);
    const positionB = NARRATOR_SETTINGS_POSITIONS.get(settingKeyB);
    if (positionA == null || positionB == null) {
      return 0;
    }
    return positionA - positionB;
  });
