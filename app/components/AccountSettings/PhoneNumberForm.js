import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Formik } from 'formik';
import parsePhoneNumber, {
  getCountryCallingCode,
  formatIncompletePhoneNumber,
} from 'libphonenumber-js';

import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import Column from 'components/Column';
import {
  DEFAULT_COUNTRY_CODE,
  FormikPhoneNumberInput,
  phoneNumberSchema,
} from 'components/FormikPhoneNumberInput';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ConfirmButton } from './styled';
import messages from './messages';
import PhoneNumberCodeModal from './PhoneNumberCodeModal';

const initialValues = ({ number, iso }) => {
  let parsedNumber = number;
  if (number && iso) {
    parsedNumber = formatIncompletePhoneNumber(number, iso);
  }
  return {
    number: parsedNumber ?? '',
    iso: { value: iso ?? DEFAULT_COUNTRY_CODE, label: '' },
  };
};

const PhoneNumberForm = React.forwardRef(
  (
    {
      formatMessage,
      phone,
      changePhoneNumber,
      error,
      loading,
      disabled,
      required,
      confirmationDisabled,
      prefixLabelMessage,
      phoneLabel,
      allowPartial,
    },
    ref,
  ) => {
    const previousLoadingState = useRef(loading);
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const { number, iso, prefix, confirmed } = phone ?? {};

    const onSubmit = (
      { number: submitNumber, iso: isoOption },
      { setSubmitting },
    ) => {
      const prefixValue = `+${getCountryCallingCode(isoOption?.value)}`;
      const parsedNumber = parsePhoneNumber(submitNumber, isoOption?.value);
      const submitPayload = {
        number: parsedNumber?.nationalNumber ?? '',
        iso: isoOption?.value,
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

    const shouldDisplayConfirmationButton =
      !confirmationDisabled &&
      !confirmed &&
      !isNullOrUndefined(number) &&
      !isNullOrUndefined(iso);

    return (
      <Column>
        {error && <ErrorAlert mt={25} errorText={error} />}
        <Formik
          validationSchema={phoneNumberSchema(
            formatMessage,
            required,
            allowPartial,
          )}
          initialValues={initialValues({ number, iso })}
          onSubmit={onSubmit}
          innerRef={ref}
        >
          {({ isValid, values: { number: numberValue, iso: isoOption } }) => {
            const isButtonActive = !isValid;

            const currentPhoneNumber = isoOption?.value
              ? ` +${getCountryCallingCode(isoOption.value)} ${numberValue}`
              : '';

            return (
              <>
                <PhoneNumberCodeModal
                  closeModal={closeModal}
                  modalVisible={modalVisible}
                  phone={currentPhoneNumber}
                />
                <Row width="100%" align="start" data-private>
                  <FormikPhoneNumberInput
                    isoKey="iso"
                    numberKey="number"
                    disabled={disabled}
                    submitOnChange
                    prefixLabel={prefixLabelMessage}
                    phoneLabel={phoneLabel}
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
  },
);

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
  confirmationDisabled: PropTypes.bool,
  required: PropTypes.bool,
  prefixLabelMessage: PropTypes.object,
  phoneLabel: PropTypes.object,
  allowPartial: PropTypes.bool,
};

PhoneNumberForm.defaultProps = {
  disabled: false,
  required: true,
  prefixLabelMessage: messages.phoneNumberPrefixLabel,
  phoneLabel: messages.phoneNumberLabel,
};

export default PhoneNumberForm;
