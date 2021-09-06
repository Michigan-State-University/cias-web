import { SelectOption } from 'components/Select/types';

export type EditCatSessionState = {
  selectedLanguage: null | SelectOption<number>;
  selectedTimeFrame: null | SelectOption<number>;
  selectedPopulation: null | SelectOption<number>;
  selectedVoice: null | SelectOption<string>;
  sessionVariable: string;
  selectedTestIds: number[];
};
