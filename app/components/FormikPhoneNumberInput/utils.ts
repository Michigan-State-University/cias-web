import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import parsePhoneNumber, {
  getCountryCallingCode,
  isValidNumber,
} from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

import { SelectOption } from 'components/Select/types';

import messages from './messages';
import { SCHEMA_METHOD_NAME } from './constants';

function phoneNumberSchemaMethod(errorMessage: string, allowPartial: boolean) {
  // @ts-ignore
  return (this as any).test(
    SCHEMA_METHOD_NAME,
    errorMessage,
    // eslint-disable-next-line func-names
    function (value: string) {
      // @ts-ignore
      const { path, createError, parent } = this;
      // @ts-ignore
      const country = parent.iso?.value;
      if (allowPartial && (!value || !country)) return true;
      return (
        (value && country && isValidNumber(value, country)) ||
        createError({ path, message: errorMessage })
      );
    },
  );
}

export const phoneNumberSchema = (
  formatMessage: IntlShape['formatMessage'],
  required: boolean,
  allowPartial: boolean,
) => {
  Yup.addMethod(Yup.string, SCHEMA_METHOD_NAME, phoneNumberSchemaMethod);

  let number = required
    ? Yup.string().required(formatMessage(messages.phoneNumberRequired))
    : Yup.string();

  // @ts-ignore
  number = number.phoneNumberFormat(
    formatMessage(messages.phoneNumberInvalid),
    allowPartial,
  );

  const iso = required
    ? Yup.object()
        .required(formatMessage(messages.phoneNumberCodeRequired))
        .nullable()
    : Yup.object();

  return Yup.object().shape({
    iso,
    number,
  });
};

export const parsePhoneAttributes = (
  number: string,
  iso: SelectOption<CountryCode>,
) => {
  const { value: country } = iso;
  const prefix = `+${getCountryCallingCode(country)}`;
  const parsedNumber = parsePhoneNumber(number, country);
  return {
    number: parsedNumber?.nationalNumber ?? '',
    iso: country,
    prefix,
  };
};
