import * as Yup from 'yup';
import parsePhoneNumber from 'libphonenumber-js';
import messages from 'components/AccountSettings/messages';

function yupMethod(errorMessage, country) {
  return this.test(`phoneNumberTest`, errorMessage, function callback(value) {
    const { path, createError } = this;
    return (
      (value &&
        value.length > 1 &&
        country &&
        parsePhoneNumber(value, country).isValid()) ||
      createError({ path, message: errorMessage })
    );
  });
}

const phoneNumberSchema = (formatMessage, country) => {
  Yup.addMethod(Yup.string, 'phoneNumber', yupMethod);

  return Yup.object().shape({
    number: Yup.string()
      .required(formatMessage(messages.phoneNumberRequired))
      .phoneNumber(formatMessage(messages.phoneNumberInvalid), country),
    iso: Yup.object().shape({
      value: Yup.string().required(
        formatMessage(messages.phoneNumberCodeRequired),
      ),
    }),
  });
};

export default phoneNumberSchema;
