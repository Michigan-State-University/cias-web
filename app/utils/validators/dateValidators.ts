import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import validatorsMessages from 'global/i18n/validatorsMessages';

export const requiredDateValidationSchema = Yup.date()
  .required(formatMessage(validatorsMessages.required))
  .nullable();
