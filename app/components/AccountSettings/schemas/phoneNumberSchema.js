import * as Yup from 'yup';
import { isValidNumber } from 'libphonenumber-js';

import messages from 'components/AccountSettings/messages';

function yupMethod(errorMessage, country, allowPartial) {
  return this.test(`phoneNumberTest`, errorMessage, function callback(value) {
    const { path, createError } = this;
    if (allowPartial && (!value || !country)) return true;
    return (
      (value && country && isValidNumber(value, country)) ||
      createError({ path, message: errorMessage })
    );
  });
}

const phoneNumberSchema = (formatMessage, country, required, allowPartial) => {
  Yup.addMethod(Yup.string, 'phoneNumber', yupMethod);

  const number = required
    ? Yup.string().required(formatMessage(messages.phoneNumberRequired))
    : Yup.string();

  const iso = required
    ? Yup.object()
        .required(formatMessage(messages.phoneNumberCodeRequired))
        .nullable()
    : Yup.object();

  return Yup.object().shape({
    number: number.phoneNumber(
      formatMessage(messages.phoneNumberInvalid),
      country,
      allowPartial,
    ),
    iso,
  });
};

export default phoneNumberSchema;
