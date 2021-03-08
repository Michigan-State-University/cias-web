import React, { useEffect, useRef, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import union from 'lodash/union';
import { Formik, yupToFormErrors, validateYupSchema } from 'formik';
import parsePhoneNumber, {
  getCountryCallingCode,
  formatIncompletePhoneNumber,
} from 'libphonenumber-js';
import { FlagIcon } from 'react-flag-kit';

import FormikNumberInput from 'components/FormikNumberInput';
import FormikSelect from 'components/FormikSelect';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Text from 'components/Text';
import Column from 'components/Column';

import getCountriesCodes from 'utils/getCountriesCodes';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ConfirmButton } from './styled';
import messages from './messages';
import { popularPrefixes } from './constants';
import phoneNumberSchema from './schemas/phoneNumberSchema';
import PhoneNumberCodeModal from './PhoneNumberCodeModal';

const initialValues = ({ number, iso }) => {
  let parsedNumber = number;
  if (number && iso) {
    parsedNumber = formatIncompletePhoneNumber(number, iso);
  }
  return {
    number: parsedNumber ?? '',
    iso: { value: iso ?? '' },
  };
};

const PhoneNumberForm = ({
  formatMessage,
  phone,
  changePhoneNumber,
  error,
  loading,
  disabled,
}) => {
  const previousLoadingState = useRef(loading);
  const inputNumberRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const { number, iso, prefix, confirmed } = phone ?? {};

  const onSubmit = (
    { number: submitNumber, iso: isoValue },
    { setSubmitting },
  ) => {
    const prefixValue = `+${getCountryCallingCode(isoValue.value)}`;
    const parsedNumber = parsePhoneNumber(submitNumber, isoValue.value);
    const submitPayload = {
      number: parsedNumber.nationalNumber,
      iso: isoValue.value,
      prefix: prefixValue,
    };
    const hasPhoneNumberChanged = !isEqual(
      {
        number,
        iso,
        prefix,
      },
      submitPayload,
    );

    if (hasPhoneNumberChanged)
      changePhoneNumber({
        phoneAttributes: {
          ...submitPayload,
        },
      });
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
      union(popularPrefixes, getCountriesCodes()).map(country => ({
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

  const shouldDisplayConfirmationButton =
    !confirmed && !isNullOrUndefined(number) && !isNullOrUndefined(iso);

  return (
    <Column>
      {error && <ErrorAlert mt={25} errorText={error} />}
      <Formik
        validate={values => {
          const {
            iso: { value: country },
          } = values;
          const schema = phoneNumberSchema(formatMessage, country);
          try {
            validateYupSchema(values, schema, true);
          } catch (err) {
            return yupToFormErrors(err);
          }
        }}
        initialValues={initialValues({ number, iso })}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          isValid,
          values: { number: numberValue, iso: isoValue },
        }) => {
          const isButtonActive = !isValid;

          const currentPhoneNumber = isoValue?.value
            ? ` +${getCountryCallingCode(isoValue.value)} ${numberValue}`
            : '';

          return (
            <>
              <PhoneNumberCodeModal
                closeModal={closeModal}
                modalVisible={modalVisible}
                phone={currentPhoneNumber}
              />
              <Row width="100%">
                <FormikSelect
                  columnStyleProps={{
                    pr: 10,
                    width: 230,
                  }}
                  disabled={disabled}
                  label={formatMessage(messages.phoneNumberLabel)}
                  formikKey="iso"
                  options={prefixOptions}
                  inputProps={{
                    filterOption,
                    placeholder: formatMessage(messages.countryCode),
                    onMenuClose: () => inputNumberRef.current.focus(),
                    value: isoValue.value
                      ? {
                          value: isoValue.value,
                          label: getCodeLabel(isoValue.value),
                        }
                      : null,
                  }}
                />
                <FormikNumberInput
                  disabled={disabled}
                  value={numberValue}
                  formikKey="number"
                  placeholder={formatMessage(messages.phoneNumber)}
                  type="tel"
                  countryCode={isoValue.value}
                  inputProps={{
                    ref: inputNumberRef,
                    mt: 16,
                    width: '100%',
                    onBlur: handleSubmit,
                  }}
                />
              </Row>

              {shouldDisplayConfirmationButton && (
                <ConfirmButton
                  type="submit"
                  disabled={isButtonActive}
                  onClick={openModal}
                >
                  {formatMessage(messages.confirmCodeButton)}
                </ConfirmButton>
              )}
            </>
          );
        }}
      </Formik>
    </Column>
  );
};

PhoneNumberForm.propTypes = {
  formatMessage: PropTypes.func,
  phone: PropTypes.shape({
    number: PropTypes.string,
    iso: PropTypes.string,
    prefix: PropTypes.string,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  changePhoneNumber: PropTypes.func,
  disabled: PropTypes.bool,
};

PhoneNumberForm.defaultProps = {
  disabled: false,
};

export default PhoneNumberForm;
