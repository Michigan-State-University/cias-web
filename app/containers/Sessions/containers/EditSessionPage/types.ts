import { SelectOption } from 'components/Select/types';
import { CatSessionDto } from 'models/Session/SessionDto';

export type EditCatSessionProps = {
  session: CatSessionDto;
  editingPossible: boolean;
  sessionIsEditing: boolean;
  editSession: any;
};

export type EditCatSessionState = {
  selectedLanguage: null | SelectOption<number>;
  selectedTimeFrame: null | SelectOption<number>;
  selectedPopulation: null | SelectOption<number>;
  selectedVoice: null | SelectOption<number>;
  sessionVariable: string;
  selectedTestIds: number[];
};
