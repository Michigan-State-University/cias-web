import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  numericRegex,
  floatRegex,
  floatValidatorRegex,
  naturalNumberRegex,
} from 'global/constants/regex';
import globalMessages from 'global/i18n/globalMessages';

export const numericValidator = (target: string) =>
  numericRegex.test(target) || target === '';

export const numericValidationSchema = Yup.string().matches(
  numericRegex,
  /* @ts-ignore */
  formatMessage(globalMessages.validators.numeric),
);

export const floatValidator = (target: string) =>
  floatValidatorRegex.test(target) || target === '';

export const floatValidationSchema = Yup.string().matches(
  floatRegex,
  /* @ts-ignore */
  formatMessage(globalMessages.validators.numeric),
);

export const naturalNumberValidator = (target: string) =>
  naturalNumberRegex.test(target) || target === '';
