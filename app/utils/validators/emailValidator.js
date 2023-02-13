import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

export const csvEmailValidator = (target) => {
  const email = target.replace('\r', '');
  return emailValidator(email);
};

export const emailFormValidationSchema = Yup.string().email(
  formatMessage(globalMessages.validators.email),
);

export const requiredEmailFormValidationSchema =
  emailFormValidationSchema.required(
    formatMessage(globalMessages.validators.required),
  );

export const emailValidator = (target) =>
  requiredEmailFormValidationSchema.isValidSync(target);
