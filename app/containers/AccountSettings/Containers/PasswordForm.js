import React, { useEffect, useRef, Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  changePasswordRequest,
  changePasswordSaga,
  makeSelectErrors,
  makeSelectLoaders,
  changeErrorStatus,
} from 'global/reducers/auth';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import Modal from 'components/Modal';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import FormikInput from 'components/FormikInput';

import messages from '../messages';

const passwordLength = 8;

const validationSchema = formatMessage =>
  Yup.object().shape({
    oldPassword: Yup.string().required(
      formatMessage(messages.newPasswordRequired),
    ),
    newPassword: Yup.string()
      .required(formatMessage(messages.oldPasswordRequired))
      .min(
        passwordLength,
        formatMessage(messages.passwordLength, { length: 8 }),
      )
      .test(
        'password',
        formatMessage(messages.passwordInvalid),
        value =>
          value &&
          !!value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
          ),
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
  useInjectSaga({ key: 'changePassword', saga: changePasswordSaga });
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
            <Fragment>
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
                type="submit"
                height={46}
                borderRadius={5}
                disabled={isEqual(values, initialValues)}
                my={25}
                onClick={handleSubmit}
                title={formatMessage(messages.changePassword)}
                loading={loading}
              />
              {error && <ErrorAlert errorText={error} />}
            </Fragment>
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

const mapStateToProps = createStructuredSelector({
  error: makeSelectErrors('changePasswordError'),
  loading: makeSelectLoaders('changePasswordLoading'),
});

const mapDispatchToProps = {
  changePassword: changePasswordRequest,
  changeErrorValue: changeErrorStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(PasswordForm);
