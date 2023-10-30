import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  numericRegex,
  floatRegex,
  floatValidatorRegex,
  naturalNumberRegex,
  floatCharRegex,
  nonNegativeIntegerRegex,
} from 'global/constants/regex';
import validatorsMessages from 'global/i18n/validatorsMessages';

export const numericValidator = (target: string) =>
  numericRegex.test(target) || target === '';

export const numericValidationSchema = Yup.string().matches(
  numericRegex,
  formatMessage(validatorsMessages.numeric),
);

export const floatValidator = (target: string) =>
  floatValidatorRegex.test(target) || target === '';

export const floatValidationSchema = Yup.string().matches(
  floatRegex,
  formatMessage(validatorsMessages.numeric),
);

export const floatCharValidator = (target: string) =>
  floatCharRegex.test(target);

export const naturalNumberValidator = (target: string) =>
  naturalNumberRegex.test(target) || target === '';

export const naturalNumberValidationSchema = Yup.string().matches(
  naturalNumberRegex,
  formatMessage(validatorsMessages.naturalNumber),
);

export const nonNegativeIntegerValidationSchema = Yup.string()
  .matches(
    nonNegativeIntegerRegex,
    formatMessage(validatorsMessages.nonNegativeInteger),
  )
  .required(formatMessage(validatorsMessages.nonNegativeInteger))
  .trim();
