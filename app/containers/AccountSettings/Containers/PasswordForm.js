import React, { Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editUserRequest, editUserSaga } from 'global/reducers/auth';
import { useInjectSaga } from 'utils/injectSaga';

import Modal from 'components/Modal';
import Button from 'components/Button';
import FormikInput from 'components/FormikInput';

import messages from '../messages';

const passwordLength = 8;

const validationSchema = formatMessage =>
  Yup.object().shape({
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
    oldPassword: Yup.string().required(
      formatMessage(messages.newPasswordRequired),
    ),
    oldPasswordConfirmation: Yup.string().oneOf(
      [Yup.ref('oldPassword'), null],
      formatMessage(messages.passwordMatch),
    ),
  });

const initialValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

const PasswordForm = ({ formatMessage, editUser, visible, onClose }) => {
  useInjectSaga({ key: 'editUser', saga: editUserSaga });

  const onSubmit = ({ password, passwordConfirmation }, { setSubmitting }) => {
    editUser({ password, passwordConfirmation });
    setSubmitting(false);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={formatMessage(messages.modalTitle)}
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
                height={46}
                borderRadius={5}
                disabled={isEqual(values, initialValues)}
                my={25}
                onClick={handleSubmit}
                title={formatMessage(messages.changePassword)}
              />
            </Fragment>
          );
        }}
      </Formik>
    </Modal>
  );
};

PasswordForm.propTypes = {
  formatMessage: PropTypes.func,
  editUser: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(PasswordForm);
