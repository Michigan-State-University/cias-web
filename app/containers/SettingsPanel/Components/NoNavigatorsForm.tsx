import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { makeSelectNavigatorSetupLoader } from 'global/reducers/navigatorSetup';
import {
  emailFormValidationSchema,
  requiredValidationSchema,
} from 'utils/validators';
import {
  NoNavigatorAvailableData,
  NotifyByOptions,
} from 'models/NavigatorSetup';

import Box from 'components/Box';
import Switch from 'components/Switch';
import Radio from 'components/Radio';
import Text from 'components/Text';
import H3 from 'components/H3';
import { FormikHookInput } from 'components/FormikInput';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import Button from 'components/Button';

import messages from '../messages';

const validationSchema = Yup.object().shape({
  noNavigatorAvailableMessage: requiredValidationSchema,
  contactEmail: emailFormValidationSchema,
});

type Props = Pick<
  NoNavigatorAvailableData,
  | 'contactEmail'
  | 'isNavigatorNotificationOn'
  | 'noNavigatorAvailableMessage'
  | 'notifyBy'
  | 'phone'
> & {
  updateNavigatorSettings: (
    newData: Partial<Omit<NoNavigatorAvailableData, 'id'>>,
  ) => void;
};

const NoNavigatorsForm = ({
  contactEmail,
  isNavigatorNotificationOn,
  noNavigatorAvailableMessage,
  notifyBy,
  phone,
  updateNavigatorSettings,
}: Props) => {
  const { formatMessage } = useIntl();
  const isUpdating = useSelector(makeSelectNavigatorSetupLoader('updateForm'));

  const initialValues = useMemo(
    () => ({
      noNavigatorAvailableMessage,
      contactEmail,
      prefix: phone?.prefix || '',
      phoneNumber: phone?.number || '',
      iso: phone?.iso || '',
    }),
    [],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: ({
      noNavigatorAvailableMessage: message,
      contactEmail: email,
      prefix: phonePrefix,
      phoneNumber: number,
      iso: phoneIso,
    }) =>
      updateNavigatorSettings({
        contactEmail: email,
        noNavigatorAvailableMessage: message,
        phone: { iso: phoneIso, prefix: phonePrefix, number },
      }),
  });

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
            formatMessage={formatMessage}
            phone={phone}
            changePhoneNumber={({
              phoneAttributes: { number, prefix, iso },
            }) => {
              formik.setFieldValue('iso', iso);
              formik.setFieldValue('phoneNumber', number);
              formik.setFieldValue('prefix', prefix);
            }}
            confirmationDisabled
            prefixLabelMessage={messages.hotlinePrefix}
            phoneLabel={messages.hotlinePhoneNumber}
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
          disabled={!formik.isValid}
          loading={isUpdating}
          px={20}
          width="auto"
          mt={20}
          mb={30}
          onClick={formik.submitForm}
        >
          {formatMessage(messages.saveChanges)}
        </Button>
      </Box>
      <Box display="flex">
        <H3>{formatMessage(messages.notifyNavigator)}</H3>
        <Switch
          checked={isNavigatorNotificationOn}
          onToggle={(newValue) =>
            updateNavigatorSettings({ isNavigatorNotificationOn: newValue })
          }
          id="navigator-notification"
        />
      </Box>
      <Box display="flex" mt={20}>
        <Radio
          id="notify_by_sms_radio"
          onChange={() =>
            updateNavigatorSettings({ notifyBy: NotifyByOptions.SMS })
          }
          checked={notifyBy === NotifyByOptions.SMS}
        >
          <Text mr={32}>{formatMessage(messages.notifyBySms)}</Text>
        </Radio>
        <Radio
          id="notify_by_email_radio"
          onChange={() =>
            updateNavigatorSettings({ notifyBy: NotifyByOptions.EMAIL })
          }
          checked={notifyBy === NotifyByOptions.EMAIL}
        >
          <Text>{formatMessage(messages.notifyByEmail)}</Text>
        </Radio>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
