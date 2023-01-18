import * as Yup from 'yup';

import { Intervention, InterventionType } from 'models/Intervention';
import { ShortLinkData } from 'models/ShortLink';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { LanguageSelectOption } from 'utils/formatters';
import {
  requiredValidationSchema,
  unreservedURLCharactersSchema,
} from 'utils/validators';

import {
  InterventionSettingsFormValues,
  GetShortLinksResponse,
  ShortLinksData,
} from './types';

// TODO validate duplicates
export const InterventionSettingsFormValidationSchema = Yup.object().shape({
  links: Yup.array().of(
    Yup.object({
      selected: Yup.boolean(),
      name: Yup.string().when('selected', {
        is: (selected) => selected,
        then: unreservedURLCharactersSchema.concat(requiredValidationSchema),
      }),
      healthClinicId: Yup.string(),
    }),
  ),
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
  inOrganization: boolean,
): InterventionSettingsFormValues['links'] => {
  if (!inOrganization) {
    const links = shortLinksData?.shortLinks?.map(({ name }) => ({
      selected: !!name,
      name: name ?? '',
    }));
    return links?.length ? links : [{ selected: false, name: '' }];
  }

  return (
    shortLinksData?.healthClinics?.map(({ id }) => {
      const { name } =
        shortLinksData?.shortLinks?.find(
          ({ healthClinicId }) => healthClinicId === id,
        ) ?? {};
      return {
        selected: !!name,
        name: name ?? '',
        healthClinicId: id,
      };
    }) ?? []
  );
};

export const mapFormValuesToShortLinks = (
  links: InterventionSettingsFormValues['links'],
): ShortLinkData[] =>
  links
    .filter(({ selected, name }) => selected && name)
    .map(({ name, healthClinicId }) => ({ name: name!, healthClinicId }));

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

export const getPlaceholderBase = (
  interventionId: string,
  interventionType: InterventionType,
  firstSessionId: Nullable<string>,
) => {
  const base = `${process.env.WEB_URL}/interventions/${interventionId}`;

  switch (interventionType) {
    case InterventionType.DEFAULT:
      if (!firstSessionId) return '';
      return `${base}/sessions/${firstSessionId}/fill`;
    default:
      return `${base}/invite`;
  }
};
