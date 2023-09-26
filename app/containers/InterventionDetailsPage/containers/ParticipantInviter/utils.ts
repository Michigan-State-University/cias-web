import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import groupBy from 'lodash/groupBy';

import { RoutePath } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';
import {
  InterventionInvitationTargetType,
  SendInvitationsPayload,
} from 'global/reducers/intervention';

import { parametrizeRoutePath } from 'utils/router';
import { csvEmailValidator } from 'utils/validators';
import {
  InviteEmailParticipantsFormValues,
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

export const prepareInitialValues = (
  parsedData: ParsedEmailsCsv,
  isReportingIntervention: boolean,
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos,
): InviteEmailParticipantsFormValues => {
  if (!isReportingIntervention) {
    return {
      isReportingIntervention: false,
      sessionOption: null,
      emails: parsedData.map((item) => item.email),
    };
  }

  const emailsGroupedByHealthClinic = Object.entries(
    groupBy(parsedData, 'healthClinicId'),
  );

  return {
    isReportingIntervention: true,
    sessionOption: null,
    clinics: emailsGroupedByHealthClinic.map(
      ([healthClinicId, healthClinicItems]) => ({
        healthClinicOption: {
          value: healthClinicId,
          label: normalizedHealthClinicsInfos[healthClinicId].healthClinicName,
        },
        emails: healthClinicItems.map(({ email }) => email),
      }),
    ),
  };
};

export const prepareSendInvitationsPayload = (
  formValues: InviteEmailParticipantsFormValues,
  isModularIntervention: boolean,
  interventionId: string,
): SendInvitationsPayload => {
  const targetId = isModularIntervention
    ? interventionId
    : formValues.sessionOption!.value;
  const targetType = isModularIntervention
    ? InterventionInvitationTargetType.INTERVENTION
    : InterventionInvitationTargetType.SESSION;

  if (!formValues.isReportingIntervention) {
    return [
      {
        emails: formValues.emails,
        targetId,
        targetType,
      },
    ];
  }

  return formValues.clinics.map((clinic) => ({
    emails: clinic.emails,
    healthClinicId: clinic.healthClinicOption!.value,
    targetId,
    targetType,
  }));
};
