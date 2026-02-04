import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'components/Button';
import Column from 'components/Column';
import FormikInput from 'components/FormikInput';
import H3 from 'components/H3';
import Modal from 'components/Modal';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';

import messages from './messages';

const validationSchema = (formatMessage) =>
  Yup.object().shape({
    email: Yup.string().required(formatMessage(messages.emailRequired)),
    passwordConfirmation: Yup.string().required(
      formatMessage(messages.oldPasswordRequired),
    ),
  });

const initialValues = (user) => ({
  email: user.email,
  passwordConfirmation: '',
});

const EmailForm = ({
  formatMessage,
  user,
  changeEmail,
  error,
  loading,
  changeErrorValue,
}) => {
  const previousLoadingState = useRef(loading);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const onSubmit = ({ email, passwordConfirmation }, { setSubmitting }) => {
    changeEmail({ newEmail: email, oldPassword: passwordConfirmation });
    setSubmitting(false);
  };

  const handleBlur = (email) => () => {
    if (user.email !== email) openModal();
  };

  const handleClose = () => {
    changeErrorValue('changeEmailError', null);
    closeModal();
  };

  useEffect(() => {
    if (previousLoadingState.current && !loading && !error) handleClose();
    previousLoadingState.current = loading;
  }, [loading]);

  return (
    <Formik
      validationSchema={validationSchema(formatMessage)}
      initialValues={initialValues(user)}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }) => {
        const inputProps = {
          height: 46,
          width: '100%',
        };
        return (
          <>
            <Modal
              visible={modalVisible}
              title={formatMessage(messages.changeYourEmail)}
              onClose={handleClose}
              maxWidth={500}
            >
              <Column>
                <H3 mb={30}>
                  <FormattedMessage {...messages.modalDescription} />
                </H3>
                <FormikInput
                  data-testid="password-confirmation"
                  formikKey="passwordConfirmation"
                  placeholder={formatMessage(messages.password)}
                  label={formatMessage(messages.passwordLabel)}
                  type="password"
                  inputProps={inputProps}
                />
                <Row width="100%" mt={30}>
                  <Button
                    data-testid="close-button"
                    mr={20}
                    inverted
                    hoverable
                    onClick={handleClose}
                    type="button"
                  >
                    <FormattedMessage {...messages.cancel} />
                  </Button>
                  <Button
                    hoverable
                    onClick={handleSubmit}
                    type="button"
                    loading={loading}
                    data-testid="confirm-button"
                  >
                    <FormattedMessage {...messages.changeEmail} />
                  </Button>
                </Row>
                {error && <ErrorAlert mt={25} errorText={error} />}
              </Column>
            </Modal>
            <Row width="100%">
              <FormikInput
                data-testid="email-input"
                formikKey="email"
                placeholder={formatMessage(messages.email)}
                label={formatMessage(messages.emailLabel)}
                type="text"
                inputProps={{
                  onBlur: handleBlur(values.email),
                  ...inputProps,
                }}
              />
            </Row>
          </>
        );
      }}
    </Formik>
  );
};

EmailForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  changeEmail: PropTypes.func,
  changeErrorValue: PropTypes.func,
};

export default EmailForm;
