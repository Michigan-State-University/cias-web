import * as Yup from 'yup';

import validatorsMessages from 'global/i18n/validatorsMessages';
import { nameRegex } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';

export const nameValidationSchema = Yup.string().matches(
  nameRegex,
  formatMessage(validatorsMessages.name),
);
