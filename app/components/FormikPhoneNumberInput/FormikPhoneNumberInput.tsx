import React, { useRef, useMemo, FC, FocusEventHandler } from 'react';
import union from 'lodash/union';
import { useField, useFormikContext } from 'formik';
import { getCountryCallingCode } from 'libphonenumber-js';
import { FlagIcon } from 'react-flag-kit';
import { MessageDescriptor, useIntl } from 'react-intl';
import { NamedProps } from 'react-select';

import FormikNumberInput from 'components/FormikNumberInput';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import Text from 'components/Text';
import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';

import getCountriesCodes from 'utils/getCountriesCodes';

import { CountryCode } from 'libphonenumber-js/types';
import { FlagIconCode } from 'react-flag-kit/typings/FlagIcon';
import messages from './messages';
import { POPULAR_COUNTRY_CODES } from './constants';

export type Props = {
  isoKey: string;
  numberKey: string;
  disabled?: boolean;
  prefixLabel?: MessageDescriptor;
  phoneLabel?: MessageDescriptor;
  prefixInputProps?: object;
  numberInputProps?: object;
  submitOnChange?: boolean;
};

export const FormikPhoneNumberInput: FC<Props> = ({
  isoKey,
  numberKey,
  disabled,
  prefixLabel = messages.phoneNumberPrefixLabel,
  phoneLabel = messages.phoneNumberPrefixLabel,
  prefixInputProps,
  numberInputProps,
  submitOnChange,
}) => {
  const { formatMessage } = useIntl();

  const inputNumberRef = useRef<HTMLInputElement>(null);

  const getCodeLabel = (country: CountryCode = 'US') => (
    <Row align="center">
      <FlagIcon code={country as FlagIconCode} />
      <Text ml={10} fontSize={18}>{`${country} +${getCountryCallingCode(
        country,
      )}`}</Text>
    </Row>
  );

  const formatOptionLabel: NamedProps<
    SelectOption<CountryCode>
  >['formatOptionLabel'] = ({ value }: SelectOption<CountryCode>) =>
    getCodeLabel(value);

  const prefixOptions = useMemo(
    () =>
      union(POPULAR_COUNTRY_CODES, getCountriesCodes()).map((country) => ({
        value: country,
        label: country,
        filterData: `${country} +${getCountryCallingCode(country)}`,
      })),
    [],
  );

  const filterOption: NamedProps<SelectOption<CountryCode>>['filterOption'] = (
    { data: { filterData } },
    value,
  ) => {
    if (!value) return true;
    return filterData.toUpperCase().includes(value.toUpperCase());
  };

  const { submitForm } = useFormikContext();
  const [{ value: iso }] =
    useField<Nullable<SelectOption<CountryCode>>>(isoKey);
  const [{ onBlur: onNumberBlur }] = useField<string>(numberKey);

  const onNumberInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onNumberBlur(event);
    if (submitOnChange) {
      submitForm();
    }
  };

  return (
    <Column>
      <Row width="100%" align="start" data-private>
        <FormikSelect
          columnStyleProps={{
            pr: 10,
            width: 230,
          }}
          disabled={disabled}
          label={formatMessage(prefixLabel)}
          formikKey={isoKey}
          options={prefixOptions}
          inputProps={{
            filterOption,
            placeholder: formatMessage(messages.countryCode),
            formatOptionLabel,
            onMenuClose: () => inputNumberRef?.current?.focus(),
            disabled,
            ...prefixInputProps,
          }}
          submitOnChange={submitOnChange}
        />
        <FormikNumberInput
          label={formatMessage(phoneLabel)}
          formikKey={numberKey}
          placeholder={formatMessage(messages.phoneNumber)}
          type="tel"
          countryCode={iso?.value}
          inputProps={{
            ref: inputNumberRef,
            width: '100%',
            disabled,
            onBlur: onNumberInputBlur,
            ...numberInputProps,
          }}
          required
        />
      </Row>
    </Column>
  );
};
