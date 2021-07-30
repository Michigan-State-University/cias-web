import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

export const csvEmailValidator = (target) => {
  const email = target.replace('\r', '');
  return emailValidator(email);
};

export const emailValidator = (target) =>
  Yup.string().required().email().isValidSync(target);

export const emailFormValidationSchema = Yup.string()
  .required(formatMessage(globalMessages.validators.required))
  .email(formatMessage(globalMessages.validators.email));
