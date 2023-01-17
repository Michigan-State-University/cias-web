import { Organization } from 'models/Organization';
import { Intervention } from 'models/Intervention';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { LanguageSelectOption } from 'utils/formatters';

import { SelectOption } from 'components/Select/types';

import {
  InterventionSettingsFormValues,
  GetShortLinksResponse,
  ShortLinksData,
} from './types';

export const organizationSelectOptionFormatter = ({
  id: value,
  name: label,
}: Organization): SelectOption<string> => ({
  value,
  label,
});

export const getShortLinksDataParser = (
  data: GetShortLinksResponse,
): ShortLinksData => ({
  shortLinks: jsonApiToArray(data, 'shortLink'),
  healthClinics: jsonApiToArray(
    { data: data.health_clinics },
    'simpleHealthClinic',
  ),
});

export const mapShortLinksToFormValues = (
  shortLinksData: Nullable<ShortLinksData>,
): InterventionSettingsFormValues['links'] => {
  const name = shortLinksData?.shortLinks?.[0]?.name;
  return { selected: !!name, name: name ?? '' };
};

export const mapFormValuesToShortLinks = (
  links: InterventionSettingsFormValues['links'],
) => {
  const { name, selected } = links;
  return selected ? [{ name }] : [];
};

export const mapLanguageToInterventionChanges = ({
  value,
  label,
  googleLanguageId,
}: LanguageSelectOption): Pick<
  Intervention,
  'languageCode' | 'languageName' | 'googleLanguageId'
> => ({
  languageCode: value,
  languageName: label,
  googleLanguageId: +googleLanguageId,
});
