import { CharacterType } from 'models/Character';
import { ShortLink } from 'models/ShortLink';
import { SimpleHealthClinic } from 'models/HealthClinic';
import { ApiDataCollection } from 'models/Api';

import { LanguageSelectOption } from 'utils/formatters';

export type InterventionSettingsFormValues = {
  interventionSettings: {
    language: LanguageSelectOption;
    quickExit: boolean;
  };
  currentNarrator: CharacterType;
  links: {
    selected?: boolean;
    name?: string;
  };
};

export type GetShortLinksResponse = ApiDataCollection<ShortLink> & {
  health_clinics: ApiDataCollection<SimpleHealthClinic>['data'];
};

export type ShortLinksData = {
  shortLinks: ShortLink[];
  healthClinics: SimpleHealthClinic[];
};
