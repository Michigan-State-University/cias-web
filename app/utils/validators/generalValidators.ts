import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import validatorsMessages from 'global/i18n/validatorsMessages';

export const requiredValidationSchema = Yup.string()
  .required(formatMessage(validatorsMessages.required))
  .trim();
