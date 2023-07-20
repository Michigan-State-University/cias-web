import * as Yup from 'yup';

import globalMessages from 'global/i18n/globalMessages';
import { nameRegex } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';

export const nameValidationSchema = Yup.string().matches(
  nameRegex,
  // @ts-ignore
  formatMessage(globalMessages.validators.name),
);
