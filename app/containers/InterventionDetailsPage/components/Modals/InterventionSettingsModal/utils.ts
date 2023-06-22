import * as Yup from 'yup';
import countBy from 'lodash/countBy';
import isNil from 'lodash/isNil';

import { Intervention, InterventionType } from 'models/Intervention';
import { ShortLinkData } from 'models/ShortLink';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { LanguageSelectOption } from 'utils/formatters';
import {
  requiredValidationSchema,
  unreservedURLCharactersSchema,
} from 'utils/validators';
import { formatMessage } from 'utils/intlOutsideReact';
import { parametrizeRoutePath } from 'utils/router';

import { RoutePath, WEB_HOST } from 'global/constants';

import {
  InterventionSettingsFormValues,
  FetchShortLinksResponse,
  ShortLinksData,
} from './types';

import messages from './messages';

export const createInterventionSettingsFormValidationSchema = () => {
  // eslint-disable-next-line func-names
  Yup.addMethod(Yup.array, 'uniqueLinks', function (message) {
    return (this as any).test(
      'uniqueLinks',
      message,
      // eslint-disable-next-line func-names
      function (list: InterventionSettingsFormValues['links']) {
        const counts = countBy(list, ({ selected, name }) =>
          selected ? name : '',
        );
        const errors: Yup.ValidationError[] = [];

        list.forEach((item, index) => {
          const { selected, name } = item;
          if (!selected || !name) return;

          const count = counts[name];
          if (!isNil(count) && count > 1) {
            errors.push(
              new Yup.ValidationError(
                message,
                name,
                // @ts-ignore
                `${this.path}.${index}.name`,
              ),
            );
          }
        });

        // @ts-ignore
        return errors.length ? new Yup.ValidationError(errors) : true;
      },
    );
  });

  return Yup.object().shape({
    links: Yup.array()
      .of(
        Yup.object({
          selected: Yup.boolean(),
          name: Yup.string().when('selected', {
            is: (selected) => selected,
            then: unreservedURLCharactersSchema.concat(
              requiredValidationSchema,
            ),
          }),
          healthClinicId: Yup.string(),
        }),
      )
      // @ts-ignore
      .uniqueLinks(formatMessage(messages.linkMustBeUnique)),
  });
};

export const fetchShortLinksDataParser = (
  data: FetchShortLinksResponse,
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

export const mapLanguageSelectOptionToInterventionChanges = ({
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
  switch (interventionType) {
    case InterventionType.DEFAULT:
      if (!firstSessionId) return '';
      return `${WEB_HOST}${parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
        interventionId,
        sessionId: firstSessionId,
      })}`;
    default:
      return `${WEB_HOST}${parametrizeRoutePath(RoutePath.INTERVENTION_INVITE, {
        interventionId,
      })}`;
  }
};
