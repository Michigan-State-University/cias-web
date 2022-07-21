import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { formatIncompletePhoneNumber } from 'libphonenumber-js/max';

import { makeSelectNavigatorSetupLoader } from 'global/reducers/navigatorSetup';
import {
  requiredValidationSchema,
  emailFormValidationSchema,
} from 'utils/validators';
import { useCallbackRef } from 'utils/useCallbackRef';

import {
  NoNavigatorsAvailableData,
  NotifyByOptions,
} from 'models/NavigatorSetup';
import { PhoneAttributes } from 'models/Phone';

import Box from 'components/Box';
import Switch from 'components/Switch';
import Radio from 'components/Radio';
import Text from 'components/Text';
import H3 from 'components/H3';
import { FormikHookInput } from 'components/FormikInput';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import Button from 'components/Button';
import { PhoneNumberFormCalculatedValue } from 'components/AccountSettings/types';

import messages from '../messages';

const validationSchema = Yup.object().shape({
  noNavigatorAvailableMessage: requiredValidationSchema,
  contactEmail: emailFormValidationSchema.notRequired(),
});

const defaultPhone: NoNavigatorsAvailableData['phone'] = {
  iso: 'US',
  prefix: '+1',
  number: '',
};

type FormikValues = Pick<
  NoNavigatorsAvailableData,
  'noNavigatorAvailableMessage' | 'contactEmail'
>;

type Props = Pick<
  NoNavigatorsAvailableData,
  | 'contactEmail'
  | 'isNavigatorNotificationOn'
  | 'noNavigatorAvailableMessage'
  | 'notifyBy'
  | 'phone'
> & {
  updateNoNavigatorTabData: (
    newData: Partial<Omit<NoNavigatorsAvailableData, 'id'>>,
  ) => void;
};

const NoNavigatorsForm = ({
  contactEmail,
  isNavigatorNotificationOn,
  noNavigatorAvailableMessage,
  notifyBy,
  phone,
  updateNoNavigatorTabData,
}: Props) => {
  const { formatMessage } = useIntl();
  const isUpdating = useSelector(makeSelectNavigatorSetupLoader('updateForm'));

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

  const onPhoneNumberFormChange = ({
    phoneAttributes,
  }: PhoneNumberFormCalculatedValue) => {
    setNewPhone(phoneAttributes);
  };

  const onSaveChanges = () => {
    updateNoNavigatorTabData({
      ...formik.values,
      phone: newPhone?.number ? newPhone : null,
    });
  };

  const resetForms = useCallback(() => {
    formik.resetForm({
      values: {
        noNavigatorAvailableMessage,
        contactEmail,
      },
    });

    const { number, iso: isoValue } = phone ?? defaultPhone;
    const parsedNumber = formatIncompletePhoneNumber(number, isoValue);

    phoneNumberFormRef.current?.resetForm({
      values: {
        number: parsedNumber ?? '',
        iso: {
          value: isoValue,
        },
      },
    });
  }, [noNavigatorAvailableMessage, contactEmail, phone]);

  useEffect(() => {
    resetForms();
  }, [resetForms]);

  const formik = useFormik<FormikValues>({
    initialValues: {
      noNavigatorAvailableMessage,
      contactEmail,
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: () => {},
  });

  const isSaveDisabled =
    !formik.isValid || !phoneValid || (!formik.dirty && !phoneDirty);

  return (
    <>
      <Box>
        <H3 mb={30}>{formatMessage(messages.textInformation)}</H3>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="noNavigatorAvailableMessage"
          formikState={formik}
          placeholder={formatMessage(messages.messagePlaceholder)}
          label={formatMessage(messages.messageLabel)}
          inputProps={{ width: '100%' }}
        />
        <Box my={30}>
          <PhoneNumberForm
            // @ts-ignore
            formatMessage={formatMessage}
            phone={phone ?? defaultPhone}
            changePhoneNumber={onPhoneNumberFormChange}
            confirmationDisabled
            prefixLabelMessage={messages.hotlinePrefix}
            phoneLabel={messages.hotlinePhoneNumber}
            required={false}
            allowPartial
            ref={phoneNumberFormCallbackRef}
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
          mt={20}
          mb={30}
          onClick={onSaveChanges}
        >
          {formatMessage(messages.saveChanges)}
        </Button>
      </Box>
      <Box display="flex" mt={20}>
        <H3>{formatMessage(messages.notifyNavigator)}</H3>
        <Switch
          checked={isNavigatorNotificationOn}
          onToggle={(newValue) =>
            updateNoNavigatorTabData({ isNavigatorNotificationOn: newValue })
          }
          id="navigator-notification"
        />
      </Box>
      <Box display="flex" mt={20}>
        <Radio
          id="notify_by_sms_radio"
          onChange={() =>
            updateNoNavigatorTabData({ notifyBy: NotifyByOptions.SMS })
          }
          checked={notifyBy === NotifyByOptions.SMS}
        >
          <Text
            mr={32}
            fontWeight={notifyBy === NotifyByOptions.SMS ? 'bold' : undefined}
          >
            {formatMessage(messages.notifyBySms)}
          </Text>
        </Radio>
        <Radio
          id="notify_by_email_radio"
          onChange={() =>
            updateNoNavigatorTabData({ notifyBy: NotifyByOptions.EMAIL })
          }
          checked={notifyBy === NotifyByOptions.EMAIL}
        >
          <Text
            fontWeight={notifyBy === NotifyByOptions.EMAIL ? 'bold' : undefined}
          >
            {formatMessage(messages.notifyByEmail)}
          </Text>
        </Radio>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
