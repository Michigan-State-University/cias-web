import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { formatIncompletePhoneNumber } from 'libphonenumber-js/max';

import { makeSelectNavigatorSetupLoader } from 'global/reducers/navigatorSetup';
import { emailFormValidationSchema } from 'utils/validators';
import { useCallbackRef } from 'utils/useCallbackRef';

import { NoNavigatorsAvailableData } from 'models/NavigatorSetup';
import { PhoneAttributes } from 'models/Phone';

import Box from 'components/Box';
import H2 from 'components/H2';
import { FormikHookInput } from 'components/FormikInput';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import Button from 'components/Button';
import { PhoneNumberFormCalculatedValue } from 'components/AccountSettings/types';

import messages from '../messages';

const validationSchema = Yup.object().shape({
  contactEmail: emailFormValidationSchema.notRequired(),
});

const defaultPhone: NoNavigatorsAvailableData['phone'] = {
  iso: 'US',
  prefix: '+1',
  number: '',
};

type FormikValues = Pick<
  NoNavigatorsAvailableData,
  'noNavigatorAvailableMessage' | 'contactEmail' | 'contactMessage'
>;

type Props = Pick<
  NoNavigatorsAvailableData,
  | 'contactEmail'
  | 'noNavigatorAvailableMessage'
  | 'phone'
  | 'contactMessage'
  | 'messagePhone'
> & {
  updateNoNavigatorTabData: (
    newData: Partial<NoNavigatorsAvailableData>,
  ) => void;
};

const NoNavigatorsForm = ({
  contactEmail,
  noNavigatorAvailableMessage,
  phone,
  updateNoNavigatorTabData,
  contactMessage,
  messagePhone,
}: Props) => {
  const { formatMessage } = useIntl();
  const isUpdating = useSelector(
    makeSelectNavigatorSetupLoader('updatingNoNavigatorsData'),
  );

  const [phoneDirty, setPhoneDirty] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true);

  const { callbackRef: phoneNumberFormCallbackRef, ref: phoneNumberFormRef } =
    useCallbackRef(
      (
        phoneNumberForm: Nullable<FormikProps<PhoneNumberFormCalculatedValue>>,
      ) => {
        setPhoneValid(!!phoneNumberForm?.isValid);
        setPhoneDirty(!!phoneNumberForm?.dirty);
        return null;
      },
    );

  const [newPhone, setNewPhone] = useState<PhoneAttributes>(
    phone ?? defaultPhone,
  );

  const [messagePhoneDirty, setMessagePhoneDirty] = useState(false);
  const [messagePhoneValid, setMessagePhoneValid] = useState(true);

  const {
    callbackRef: messagePhoneNumberFormCallbackRef,
    ref: messagePhoneNumberFormRef,
  } = useCallbackRef(
    (
      phoneNumberForm: Nullable<FormikProps<PhoneNumberFormCalculatedValue>>,
    ) => {
      setMessagePhoneDirty(!!phoneNumberForm?.dirty);
      setMessagePhoneValid(!!phoneNumberForm?.isValid);
      return null;
    },
  );

  const [messageNewPhone, setMessageNewPhone] = useState<PhoneAttributes>(
    messagePhone ?? defaultPhone,
  );

  const onPhoneNumberFormChange =
    (callback: React.Dispatch<React.SetStateAction<PhoneAttributes>>) =>
    ({ phoneAttributes }: PhoneNumberFormCalculatedValue) => {
      callback(phoneAttributes);
    };

  const onSaveChanges = () => {
    updateNoNavigatorTabData({
      ...formik.values,
      phone: newPhone?.number ? newPhone : null,
      messagePhone: messageNewPhone?.number ? messageNewPhone : null,
    });
  };

  const resetForms = useCallback(() => {
    formik.resetForm({
      values: {
        noNavigatorAvailableMessage,
        contactEmail,
        contactMessage,
      },
    });

    const { number, iso: isoValue } = phone ?? defaultPhone;
    const { number: messageNumber, iso: messagePhoneIsoValue } =
      messagePhone ?? defaultPhone;
    const parsedNumber = formatIncompletePhoneNumber(number, isoValue);
    const parsedMessageNumber = formatIncompletePhoneNumber(
      messageNumber,
      messagePhoneIsoValue,
    );

    phoneNumberFormRef.current?.resetForm({
      values: {
        number: parsedNumber ?? '',
        iso: {
          value: isoValue,
        },
      },
    });
    messagePhoneNumberFormRef.current?.resetForm({
      values: {
        number: parsedMessageNumber ?? '',
        iso: {
          value: messagePhoneIsoValue,
        },
      },
    });
  }, [noNavigatorAvailableMessage, contactEmail, phone, messagePhone]);

  useEffect(() => {
    resetForms();
  }, [resetForms]);

  const formik = useFormik<FormikValues>({
    initialValues: {
      noNavigatorAvailableMessage,
      contactEmail,
      contactMessage,
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: () => {},
  });

  const isSaveDisabled =
    !formik.isValid ||
    !phoneValid ||
    !messagePhoneValid ||
    (!messagePhoneDirty && !formik.dirty && !phoneDirty);

  return (
    <>
      <Box>
        <H2 fontSize={16} lineHeight="24px" mb={24}>
          {formatMessage(messages.textInformation)}
        </H2>
        <Box mb={24}>
          {/* @ts-ignore */}
          <FormikHookInput
            formikKey="noNavigatorAvailableMessage"
            formikState={formik}
            placeholder={formatMessage(messages.messagePlaceholder)}
            label={formatMessage(messages.messageLabel)}
            inputProps={{ width: '100%' }}
          />
        </Box>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="contactMessage"
          formikState={formik}
          placeholder={formatMessage(messages.contactMessagePlaceholder)}
          label={formatMessage(messages.contactMessageLabel)}
          inputProps={{ width: '100%' }}
        />
        <Box my={24}>
          <PhoneNumberForm
            // @ts-ignore
            formatMessage={formatMessage}
            phone={phone ?? defaultPhone}
            changePhoneNumber={onPhoneNumberFormChange(setNewPhone)}
            confirmationDisabled
            prefixLabelMessage={messages.contactHotlinePrefix}
            phoneLabel={messages.contactHotlinePhoneNumber}
            required={false}
            allowPartial
            ref={phoneNumberFormCallbackRef}
          />
        </Box>
        <Box my={24}>
          <PhoneNumberForm
            // @ts-ignore
            formatMessage={formatMessage}
            phone={messagePhone ?? defaultPhone}
            changePhoneNumber={onPhoneNumberFormChange(setMessageNewPhone)}
            confirmationDisabled
            prefixLabelMessage={messages.messageHotlinePrefix}
            phoneLabel={messages.messageHotlinePhoneNumber}
            required={false}
            allowPartial
            ref={messagePhoneNumberFormCallbackRef}
          />
        </Box>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="contactEmail"
          formikState={formik}
          placeholder={formatMessage(messages.emailPlaceholder)}
          label={formatMessage(messages.emailLabel)}
          inputProps={{ width: '100%' }}
        />
        {/* @ts-ignore */}
        <Button
          type="submit"
          disabled={isSaveDisabled}
          loading={isUpdating}
          px={24}
          width="auto"
          mt={24}
          onClick={onSaveChanges}
        >
          {formatMessage(messages.saveChanges)}
        </Button>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
