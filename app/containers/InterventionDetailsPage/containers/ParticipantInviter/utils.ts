import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import groupBy from 'lodash/groupBy';
import countBy from 'lodash/countBy';
import isNil from 'lodash/isNil';

import { RoutePath } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';
import {
  PredefinedParticipantData,
  InterventionInvitationTargetType,
  SendInterventionInvitationsData,
} from 'global/reducers/intervention';

import { parametrizeRoutePath } from 'utils/router';
import { csvEmailValidator, emailFormValidationSchema } from 'utils/validators';

import { SelectOption } from 'components/Select/types';
import {
  getInitialValues,
  getPhoneAttributes,
  phoneNumberSchema,
} from 'components/FormikPhoneNumberInput';

import {
  PredefinedParticipantFormValues,
  InterventionTypeDependentInviteEmailParticipantsFormValues,
  InviteEmailParticipantsFormValues,
  NormalizedHealthClinicsInfos,
  ParsedEmailsCsv,
  ReportingInterventionInviteEmailParticipantsFormValues,
  UploadedEmailsCsvData,
} from './types';
import messages from './messages';
import { PredefinedParticipant } from '../../../../models/PredefinedParticipant';

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
        function (
          list: ReportingInterventionInviteEmailParticipantsFormValues['clinics'],
        ) {
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

export const createPredefinedParticipantFormSchema = (
  formatMessage: IntlShape['formatMessage'],
  isReportingIntervention: boolean,
) =>
  Yup.object()
    .shape({
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
      email: emailFormValidationSchema,
    })
    // @ts-ignore
    .concat(phoneNumberSchema(formatMessage, false, true));

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
  firstSessionOption: Nullable<SelectOption<string>>,
): InterventionTypeDependentInviteEmailParticipantsFormValues =>
  isModularIntervention
    ? {
        isModularIntervention,
      }
    : {
        isModularIntervention,
        sessionOption: firstSessionOption ?? null,
        selectFirstSession: true,
      };

export const getInviteEmailParticipantsFormInitialValues = (
  isModularIntervention: boolean,
  firstSessionOption: Nullable<SelectOption<string>>,
  isReportingIntervention: boolean,
): InviteEmailParticipantsFormValues => {
  const interventionDependentFormValues =
    getInterventionTypeDependedInitialValues(
      isModularIntervention,
      firstSessionOption,
    );

  if (isReportingIntervention) {
    return {
      isReportingIntervention: true,
      clinics: [{ healthClinicOption: null, emails: [] }],
      ...interventionDependentFormValues,
    };
  }

  return {
    isReportingIntervention: false,
    emails: [],
    ...interventionDependentFormValues,
  };
};

export const getPredefinedParticipantFormInitialValues = (
  healthClinicOptions: SelectOption<string>[],
  participant: Nullable<PredefinedParticipant>,
): PredefinedParticipantFormValues => {
  const healthClinicOption = participant?.healthClinicId
    ? healthClinicOptions.find(
        ({ value }) => value === participant.healthClinicId,
      )
    : null;
  const phoneAttributes = getInitialValues(
    participant?.phone?.number,
    participant?.phone?.iso,
  );
  return {
    healthClinicOption,
    ...phoneAttributes,
    firstName: participant?.firstName ?? '',
    lastName: participant?.lastName ?? '',
    email: participant?.email ?? '',
    externalId: participant?.externalId ?? '',
  };
};

export const prepareUploadEmailsInitialValues = (
  parsedData: ParsedEmailsCsv,
  isReportingIntervention: boolean,
  isModularIntervention: boolean,
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos,
  firstSessionOption: Nullable<SelectOption<string>>,
): InviteEmailParticipantsFormValues => {
  const interventionDependentFormValues =
    getInterventionTypeDependedInitialValues(
      isModularIntervention,
      firstSessionOption,
    );

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
): SendInterventionInvitationsData => {
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

export const preparePredefinedParticipantData = ({
  healthClinicOption,
  firstName,
  lastName,
  externalId,
  email,
  iso,
  number,
}: PredefinedParticipantFormValues): PredefinedParticipantData => {
  const phoneAttributes =
    number && iso ? getPhoneAttributes(number, iso) : null;
  return {
    firstName: firstName || null,
    lastName: lastName || null,
    healthClinicId: healthClinicOption?.value || null,
    externalId: externalId || null,
    email: email || null,
    phoneAttributes,
  };
};
