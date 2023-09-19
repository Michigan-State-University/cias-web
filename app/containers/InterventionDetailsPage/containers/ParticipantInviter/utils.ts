import * as Yup from 'yup';
import { IntlShape } from 'react-intl';

import { RoutePath } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';

import { parametrizeRoutePath } from 'utils/router';

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
  });
