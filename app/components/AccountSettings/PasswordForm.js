import React, { useEffect, useRef, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Modal from 'components/Modal';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import FormikInput from 'components/FormikInput';

import { passwordRegex } from 'global/constants/regex';

import messages from './messages';

const passwordLength = 12;

const validationSchema = (formatMessage) =>
  Yup.object().shape({
    oldPassword: Yup.string().required(
      formatMessage(messages.oldPasswordRequired),
    ),
    newPassword: Yup.string()
      .required(formatMessage(messages.newPasswordRequired))
      .min(
        passwordLength,
        formatMessage(messages.passwordLength, { length: 12 }),
      )
      .test(
        'password',
        formatMessage(messages.passwordInvalid),
        (value) => value && !!value.match(passwordRegex),
      ),
    newPasswordConfirmation: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      formatMessage(messages.passwordMatch),
    ),
  });

const initialValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

const PasswordForm = ({
  formatMessage,
  changePassword,
  changeErrorValue,
  visible,
  onClose,
  error,
  loading,
}) => {
  const previousLoadingState = useRef(loading);

  const onSubmit = (
    { oldPassword, newPassword, newPasswordConfirmation },
    { setSubmitting },
  ) => {
    changePassword({ oldPassword, newPassword, newPasswordConfirmation });
    setSubmitting(false);
  };

  const handleClose = () => {
    changeErrorValue('changePasswordError', null);
    onClose();
  };

  useEffect(() => {
    if (previousLoadingState.current && !loading && !error) handleClose();
    previousLoadingState.current = loading;
  }, [loading]);

  const errorMessage = useMemo(() => {
    if (!error) return null;
    if (error.includes('422'))
      return formatMessage(messages.incorrectOldPassword);
    return error;
  }, [error]);

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={formatMessage(messages.modalTitle)}
      minWidth={450}
    >
      <Formik
        validationSchema={validationSchema(formatMessage)}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values }) => {
          const sharedProps = {
            inputProps: {
              height: 46,
              width: '100%',
            },
            mb: 20,
          };
          return (
            <>
              <FormikInput
                formikKey="oldPassword"
                placeholder={formatMessage(messages.oldPassword)}
                label={formatMessage(messages.oldPasswordLabel)}
                type="password"
                {...sharedProps}
              />
              <FormikInput
                formikKey="newPassword"
                placeholder={formatMessage(messages.newPassword)}
                label={formatMessage(messages.newPasswordLabel)}
                type="password"
                {...sharedProps}
              />
              <FormikInput
                formikKey="newPasswordConfirmation"
                placeholder={formatMessage(messages.newPasswordConfirmation)}
                label={formatMessage(messages.newPasswordConfirmationLabel)}
                type="password"
                {...sharedProps}
              />
              <Button
                data-testid="submit-button"
                type="submit"
                height={46}
                disabled={isEqual(values, initialValues)}
                my={25}
                onClick={handleSubmit}
                title={formatMessage(messages.changePassword)}
                loading={loading}
              />
              {errorMessage && <ErrorAlert errorText={errorMessage} />}
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

PasswordForm.propTypes = {
  formatMessage: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  changePassword: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

export default PasswordForm;
