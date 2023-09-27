import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import groupBy from 'lodash/groupBy';
import countBy from 'lodash/countBy';
import isNil from 'lodash/isNil';

import { RoutePath } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';
import {
  InterventionInvitationTargetType,
  SendInvitationsPayload,
} from 'global/reducers/intervention';

import { parametrizeRoutePath } from 'utils/router';
import { csvEmailValidator } from 'utils/validators';
import {
  InterventionTypeDependentFormValues,
  InviteEmailParticipantsFormValues,
  NormalizedHealthClinicsInfos,
  ParsedEmailsCsv,
  ReportingInterventionFormValues,
  UploadedEmailsCsvData,
} from './types';
import messages from './messages';

export const UNIQUE_CLINICS_METHOD = 'uniqueClinics';

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
) => {
  Yup.addMethod(
    Yup.array,
    UNIQUE_CLINICS_METHOD,
    // eslint-disable-next-line func-names
    function (message) {
      return (this as any).test(
        UNIQUE_CLINICS_METHOD,
        message,
        // eslint-disable-next-line func-names
        function (list: ReportingInterventionFormValues['clinics']) {
          const counts = countBy(
            list,
            (item) => item.healthClinicOption?.value,
          );
          const errors: Yup.ValidationError[] = [];

          list.forEach((item, index) => {
            const healthClinicId = item.healthClinicOption?.value;
            if (!healthClinicId) return;

            const count = counts[healthClinicId];
            if (!isNil(count) && count > 1) {
              errors.push(
                new Yup.ValidationError(
                  message,
                  item,
                  // @ts-ignore
                  `${this.path}.${index}.healthClinicOption`,
                ),
              );
            }
          });

          // @ts-ignore
          return errors.length ? new Yup.ValidationError(errors) : true;
        },
      );
    },
  );

  return Yup.object().shape({
    ...(!isModularIntervention
      ? {
          sessionOption: Yup.object()
            .required(
              // @ts-ignore
              formatMessage(globalMessages.validators.required),
            )
            .nullable(),
        }
      : {}),
    ...(isReportingIntervention
      ? {
          clinics: Yup.array()
            .of(
              Yup.object({
                healthClinicOption: Yup.object()
                  .required(
                    // @ts-ignore
                    formatMessage(globalMessages.validators.required),
                  )
                  .nullable(),
                emails: Yup.array().min(
                  1,
                  // @ts-ignore
                  formatMessage(globalMessages.validators.required),
                ),
              }),
            )
            // @ts-ignore
            .uniqueClinics(formatMessage(messages.clinicMustBeUnique)),
        }
      : {}),
    ...(!isReportingIntervention
      ? {
          emails: Yup.array().min(
            1,
            // @ts-ignore
            formatMessage(globalMessages.validators.required),
          ),
        }
      : {}),
  });
};

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

export const getInterventionTypeDependedInitialValues = (
  isModularIntervention: boolean,
): InterventionTypeDependentFormValues =>
  isModularIntervention
    ? {
        isModularIntervention,
      }
    : {
        isModularIntervention,
        sessionOption: null,
        selectFirstSession: true,
      };

export const prepareInitialValues = (
  parsedData: ParsedEmailsCsv,
  isReportingIntervention: boolean,
  isModularIntervention: boolean,
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos,
): InviteEmailParticipantsFormValues => {
  const interventionDependentFormValues =
    getInterventionTypeDependedInitialValues(isModularIntervention);

  if (!isReportingIntervention) {
    const emails = parsedData.map((item) => item.email);
    return {
      isReportingIntervention: false,
      emails,
      ...interventionDependentFormValues,
    };
  }

  const emailsGroupedByHealthClinic = Object.entries(
    groupBy(parsedData, 'healthClinicId'),
  );

  const reportingInterventionInitialValues: InviteEmailParticipantsFormValues =
    {
      ...interventionDependentFormValues,
      isReportingIntervention: true,
      clinics: emailsGroupedByHealthClinic.map(
        ([healthClinicId, healthClinicItems]) => {
          const { healthClinicName, healthSystemName } =
            normalizedHealthClinicsInfos[healthClinicId] ?? {};
          return {
            healthClinicOption: {
              value: healthClinicId,
              label: `${healthClinicName} (${healthSystemName})`,
            },
            emails: healthClinicItems.map(({ email }) => email),
          };
        },
      ),
    };

  if (!reportingInterventionInitialValues.clinics.length) {
    reportingInterventionInitialValues.clinics.push({
      healthClinicOption: null,
      emails: [],
    });
  }

  return reportingInterventionInitialValues;
};

export const prepareSendInvitationsPayload = (
  formValues: InviteEmailParticipantsFormValues,
  interventionId: string,
): SendInvitationsPayload => {
  const targetId = formValues.isModularIntervention
    ? interventionId
    : formValues.sessionOption!.value;
  const targetType = formValues.isModularIntervention
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
