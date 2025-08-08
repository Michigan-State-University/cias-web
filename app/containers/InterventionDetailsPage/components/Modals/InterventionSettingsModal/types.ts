import { CharacterType } from 'models/Character';
import { ShortLink } from 'models/ShortLink';
import { SimpleHealthClinic } from 'models/HealthClinic';
import { ApiDataCollection } from 'models/Api';

import { LanguageSelectOption } from 'utils/formatters';

export type InterventionSettingsFormValues = {
  interventionSettings: {
    language: LanguageSelectOption;
    quickExit: boolean;
    skipWarningScreen: boolean;
  };
  currentNarrator: CharacterType;
  links: {
    selected?: boolean;
    name?: string;
    healthClinicId?: Nullable<string>;
  }[];
};

export type FetchShortLinksResponse = ApiDataCollection<ShortLink> & {
  health_clinics: ApiDataCollection<SimpleHealthClinic>['data'];
};

export type ShortLinksData = {
  shortLinks: ShortLink[];
  healthClinics: SimpleHealthClinic[];
};
