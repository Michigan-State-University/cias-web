import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';

import validatorsMessages from 'global/i18n/validatorsMessages';

export const csvEmailValidator = (target) => {
  const email = target.replace('\r', '');
  return emailValidator(email);
};

export const emailFormValidationSchema = Yup.string().email(
  formatMessage(validatorsMessages.email),
);

export const requiredEmailFormValidationSchema =
  emailFormValidationSchema.required(
    formatMessage(validatorsMessages.required),
  );

export const emailValidator = (target) =>
  requiredEmailFormValidationSchema.isValidSync(target);
