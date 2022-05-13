import * as Yup from 'yup';

import messages from './messages';

export const popularPrefixes = [
  'US',
  'CA',
  'MX',
  'GB',
  'AU',
  'RU',
  'CH',
  'HK',
  'JP',
  'IN',
  'BR',
];

export const CODE_INPUT_LENGTH = 4;

export const confirmationCodeValidationSchema = (formatMessage) =>
  Yup.object().shape({
    code: Yup.string()
      .length(CODE_INPUT_LENGTH)
      .required(formatMessage(messages.codeRequired)),
  });
