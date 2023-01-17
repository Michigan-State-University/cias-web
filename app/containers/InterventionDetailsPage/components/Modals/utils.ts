import * as Yup from 'yup';

import { Organization } from 'models/Organization';
import { Intervention } from 'models/Intervention';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { LanguageSelectOption } from 'utils/formatters';
import {
  requiredValidationSchema,
  unreservedURLCharactersSchema,
} from 'utils/validators';

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

export const createInterventionSettingsFormValidationSchema = (
  assignedToOrganization: boolean,
) => {
  if (assignedToOrganization) return null;
  return Yup.object().shape({
    links: Yup.object({
      selected: Yup.boolean(),
      name: Yup.string().when('selected', {
        is: (selected) => selected,
        then: unreservedURLCharactersSchema.concat(requiredValidationSchema),
      }),
    }),
  });
};

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
  return selected && name ? [{ name }] : [];
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
