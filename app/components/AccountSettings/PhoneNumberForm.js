import React, { Fragment, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, yupToFormErrors, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import parsePhoneNumber, { getCountryCallingCode } from 'libphonenumber-js';
import { FlagIcon } from 'react-flag-kit';

import FormikNumberInput from 'components/FormikNumberInput';
import FormikSelect from 'components/FormikSelect';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Text from 'components/Text';

import getCountriesCodes from 'utils/getCountriesCodes';

import messages from './messages';

Yup.addMethod(Yup.string, 'phoneNumber', function(errorMessage, country) {
  return this.test(`phoneNumberTest`, errorMessage, function(value) {
    const { path, createError } = this;
    return (
      (value &&
        value.length > 1 &&
        country &&
        parsePhoneNumber(value, country).isValid()) ||
      createError({ path, message: errorMessage })
    );
  });
});

const validationSchema = (formatMessage, country) =>
  Yup.object().shape({
    phoneNumber: Yup.string()
      .required(formatMessage(messages.phoneNumberRequired))
      .phoneNumber(formatMessage(messages.phoneNumberInvalid), country),
    prefix: Yup.object().shape({
      value: Yup.string().required(
        formatMessage(messages.phoneNumberCodeRequired),
      ),
    }),
  });

const initialValues = ({ phoneNumber, countryCode }) => ({
  phoneNumber: phoneNumber ?? '',
  prefix: { value: countryCode ?? '' },
});

const PhoneNumberForm = ({
  formatMessage,
  phoneNumber,
  countryCode,
  changePhoneNumber,
  error,
  loading,
}) => {
  const previousLoadingState = useRef(loading);

  const onSubmit = (
    { phoneNumber: submitNumber, prefix },
    { setSubmitting },
  ) => {
    changePhoneNumber({ phoneNumber: submitNumber, countryCode: prefix.value });
    setSubmitting(false);
  };

  useEffect(() => {
    previousLoadingState.current = loading;
  }, [loading]);

  const getCodeLabel = (country = 'US') => (
    <Row align="center">
      <FlagIcon code={country} />
      <Text ml={10} fintSize={18}>{`${country} +${getCountryCallingCode(
        country,
      )}`}</Text>
    </Row>
  );

  const prefixOptions = useMemo(
    () =>
      getCountriesCodes().map(country => ({
        value: country,
        label: getCodeLabel(country),
        filterData: `${country} +${getCountryCallingCode(country)}`,
      })),
    [],
  );

  const filterOption = ({ data: { filterData } }, value) => {
    if (!value) return true;
    return filterData.toUpperCase().includes(value.toUpperCase());
  };

  return (
    <Fragment>
      {error && <ErrorAlert mt={25} errorText={error} />}
      <Formik
        validate={values => {
          const {
            prefix: { value: country },
          } = values;
          const schema = validationSchema(formatMessage, country);
          try {
            validateYupSchema(values, schema, true);
          } catch (err) {
            return yupToFormErrors(err);
          }
        }}
        initialValues={initialValues({ phoneNumber, countryCode })}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values: { phoneNumber: phoneNumberValue, prefix },
        }) => (
          <Fragment>
            <Row width="100%">
              <FormikSelect
                columnStyleProps={{
                  pr: 10,
                  width: 230,
                }}
                label={formatMessage(messages.phoneNumberLabel)}
                formikKey="prefix"
                options={prefixOptions}
                inputProps={{
                  filterOption,
                  placeholder: formatMessage(messages.countryCode),
                  value: prefix.value
                    ? {
                        value: prefix.value,
                        label: getCodeLabel(prefix.value),
                      }
                    : null,
                }}
              />
              <FormikNumberInput
                value={phoneNumberValue}
                formikKey="phoneNumber"
                placeholder={formatMessage(messages.phoneNumber)}
                type="tel"
                countryCode={prefix.value}
                inputProps={{
                  onBlur: handleSubmit,
                  mt: 16,
                  width: '100%',
                }}
              />
            </Row>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
};

PhoneNumberForm.propTypes = {
  formatMessage: PropTypes.func,
  phoneNumber: PropTypes.string,
  countryCode: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  changePhoneNumber: PropTypes.func,
};

export default PhoneNumberForm;
