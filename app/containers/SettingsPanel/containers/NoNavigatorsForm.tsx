import React from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  emailFormValidationSchema,
  requiredValidationSchema,
} from 'utils/validators';

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
  message: requiredValidationSchema,
  email: emailFormValidationSchema,
});

// type Props = {};
const NoNavigatorsForm = () => {
  const { formatMessage } = useIntl();
  const formik = useFormik({
    initialValues: {
      message: '',
      email: '',
      prefix: '',
      phoneNumber: '',
      iso: '',
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: (fields) => console.log(fields),
  });
  return (
    <>
      <Box>
        <H3 mb={30}>{formatMessage(messages.textInformation)}</H3>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="message"
          formikState={formik}
          placeholder={formatMessage(messages.messagePlaceholder)}
          label={formatMessage(messages.messageLabel)}
          inputProps={{ width: '100%' }}
        />
        <Box my={30}>
          <PhoneNumberForm
            formatMessage={formatMessage}
            // phone={phone}
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
          formikKey="email"
          formikState={formik}
          placeholder={formatMessage(messages.emailPlaceholder)}
          label={formatMessage(messages.emailLabel)}
          inputProps={{ width: '100%' }}
        />
        {/* @ts-ignore */}
        <Button
          type="submit"
          disabled={!formik.isValid}
          loading={formik.isSubmitting}
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
        <Switch checked onToggle={() => {}} />
      </Box>
      <Box display="flex" mt={20}>
        <Radio id="notify_by_sms_radio" onChange={() => {}} checked={false}>
          <Text mr={32}>{formatMessage(messages.notifyBySms)}</Text>
        </Radio>
        <Radio id="notify_by_email_radio" onChange={() => {}} checked>
          <Text>{formatMessage(messages.notifyByEmail)}</Text>
        </Radio>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
