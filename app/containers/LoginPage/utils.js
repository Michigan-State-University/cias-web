import * as Yup from 'yup';
import messages from './messages';

export const generateLoginFormValidationSchema = (formatMessage) =>
  Yup.object().shape({
    email: Yup.string()
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

export const generateInitialValues = (formData) => ({
  email: formData?.email ?? '',
  password: formData?.password ?? '',
});
