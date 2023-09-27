import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

export const requiredValidationSchema = Yup.string()
  .required(
    /* @ts-ignore */
    formatMessage(globalMessages.validators.required),
  )
  .trim();
