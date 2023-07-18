import * as Yup from 'yup';
import messages from './messages';

export const generateLoginFormValidationSchema = (formatMessage) =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
    password: Yup.string().required(formatMessage(messages.passwordRequired)),
  });

export const generateVerificationCodeValidationSchema = (formatMessage) =>
  Yup.object().shape({
    verificationCode: Yup.string().required(
      formatMessage(messages.codeVerificationRequired),
    ),
  });

export const generateTermsValidationSchema = (formatMessage) =>
  Yup.object().shape({
    lastName: Yup.string()
      .required(formatMessage(messages.lastNameRequired))
      .trim(formatMessage(messages.lastNameRequired)),
    firstName: Yup.string()
      .required(formatMessage(messages.firstNameRequired))
      .trim(formatMessage(messages.firstNameRequired)),
    terms: Yup.bool().oneOf([true], formatMessage(messages.termsRequired)),
  });

export const generateInitialValues = (formData) => ({
  email: formData?.email ?? '',
  password: formData?.password ?? '',
});
