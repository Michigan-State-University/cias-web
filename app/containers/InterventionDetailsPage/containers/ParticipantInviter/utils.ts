import * as Yup from 'yup';
import { IntlShape } from 'react-intl';

import { RoutePath } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';

import { parametrizeRoutePath } from 'utils/router';
import { csvEmailValidator } from 'utils/validators';
import {
  NormalizedHealthClinicsInfos,
  ParsedEmailsCsv,
  UploadedEmailsCsvData,
} from './types';

export const createCopyLinkFormSchema = (
  formatMessage: IntlShape['formatMessage'],
  isModularIntervention: boolean,
  isReportingIntervention: boolean,
) =>
  Yup.object().shape({
    ...(isModularIntervention
      ? {}
      : {
          sessionOption: Yup.object()
            .required(
              // @ts-ignore
              formatMessage(globalMessages.validators.required),
            )
            .nullable(),
        }),
    ...(isReportingIntervention
      ? {
          healthClinicOption: Yup.object()
            .required(
              // @ts-ignore
              formatMessage(globalMessages.validators.required),
            )
            .nullable(),
        }
      : {}),
  });

export const createInviteUrl = (
  isModularIntervention: boolean,
  isReportingIntervention: boolean,
  interventionId: string,
  sessionId: Nullable<string>,
  healthClinicId: Nullable<string>,
): string => {
  let url;

  if (isModularIntervention) {
    url = `${process.env.WEB_URL}${parametrizeRoutePath(
      RoutePath.INTERVENTION_INVITE,
      {
        interventionId,
      },
    )}`;
  } else {
    url = `${process.env.WEB_URL}${parametrizeRoutePath(
      RoutePath.ANSWER_SESSION,
      {
        interventionId,
        sessionId: sessionId ?? '',
      },
    )}`;
  }

  if (isReportingIntervention && healthClinicId) {
    url = `${url}?cid=${healthClinicId}`;
  }

  return url;
};

export const createInviteEmailsParticipantsFormSchema = (
  formatMessage: IntlShape['formatMessage'],
  isModularIntervention: boolean,
  isReportingIntervention: boolean,
) =>
  Yup.object().shape({
    ...(isModularIntervention
      ? {}
      : {
          sessionOption: Yup.object()
            .required(
              // @ts-ignore
              formatMessage(globalMessages.validators.required),
            )
            .nullable(),
        }),
    ...(isReportingIntervention
      ? {
          healthClinicOption: Yup.object()
            .required(
              // @ts-ignore
              formatMessage(globalMessages.validators.required),
            )
            .nullable(),
        }
      : {}),
    emails: Yup.array().min(
      1,
      // @ts-ignore
      formatMessage(globalMessages.validators.required),
    ),
  });

export const parseEmailsCsv = (
  data: UploadedEmailsCsvData,
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos,
  isReportingIntervention: boolean,
): ParsedEmailsCsv =>
  data
    .map((columns) => {
      if (!columns || !columns.data) return null;

      const [email, healthClinicId] = columns.data;
      if (!email || !csvEmailValidator(email)) return null;

      if (!isReportingIntervention) {
        return { email };
      }

      if (!healthClinicId) return null;

      const healthClinicInfo = normalizedHealthClinicsInfos[healthClinicId];
      if (!healthClinicInfo || healthClinicInfo.deleted) return null;

      return { email, healthClinicId };
    })
    .filter(Boolean) as ParsedEmailsCsv;
