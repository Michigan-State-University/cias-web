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
  NoNavigatorsAvailableData,
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
  noNavigatorsAvailableMessage: requiredValidationSchema,
  contactEmail: emailFormValidationSchema,
});

type Props = Pick<
  NoNavigatorsAvailableData,
  | 'contactEmail'
  | 'isNavigatorNotificationOn'
  | 'noNavigatorsAvailableMessage'
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
  noNavigatorsAvailableMessage,
  notifyBy,
  phone,
  updateNoNavigatorTabData,
}: Props) => {
  const { formatMessage } = useIntl();
  const isUpdating = useSelector(makeSelectNavigatorSetupLoader('updateForm'));

  const initialValues = useMemo(
    () => ({
      noNavigatorsAvailableMessage,
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
      noNavigatorsAvailableMessage: message,
      contactEmail: email,
      prefix: phonePrefix,
      phoneNumber: number,
      iso: phoneIso,
    }) =>
      updateNoNavigatorTabData({
        contactEmail: email,
        noNavigatorsAvailableMessage: message,
        phone: { iso: phoneIso, prefix: phonePrefix, number },
      }),
  });

  return (
    <>
      <Box>
        <H3 mb={30}>{formatMessage(messages.textInformation)}</H3>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="noNavigatorsAvailableMessage"
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
          px={24}
          width="auto"
          mt={20}
          mb={30}
          onClick={formik.submitForm}
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
          <Text mr={32} fontWeight={notifyBy === NotifyByOptions.SMS && 'bold'}>
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
          <Text fontWeight={notifyBy === NotifyByOptions.EMAIL && 'bold'}>
            {formatMessage(messages.notifyByEmail)}
          </Text>
        </Radio>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
