import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  numericRegex,
  floatRegex,
  floatValidatorRegex,
} from 'global/constants/regex';
import globalMessages from 'global/i18n/globalMessages';

export const numericValidator = (target: string) => {
  if (numericRegex.test(target) || target === '') return true;

  return false;
};

export const numericValidationSchema = Yup.string().matches(
  numericRegex,
  /* @ts-ignore */
  formatMessage(globalMessages.validators.numeric),
);

export const floatValidator = (target: string) => {
  if (floatValidatorRegex.test(target) || target === '') return true;

  return false;
};

export const floatValidationSchema = Yup.string().matches(
  floatRegex,
  /* @ts-ignore */
  formatMessage(globalMessages.validators.numeric),
);
