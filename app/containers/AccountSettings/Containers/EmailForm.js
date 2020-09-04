import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Formik } from 'formik';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';

import Button from 'components/Button';
import Column from 'components/Column';
import FormikInput from 'components/FormikInput';
import H3 from 'components/H3';
import Modal from 'components/Modal';
import Row from 'components/Row';
import { useInjectSaga } from 'utils/injectSaga';
import {
  editUserRequest,
  editUserSaga,
  makeSelectUser,
} from 'global/reducers/auth';

import messages from '../messages';

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string().required(formatMessage(messages.emailRequired)),
    passwordConfirmation: Yup.string().required(
      formatMessage(messages.oldPasswordRequired),
    ),
  });

const initialValues = user => ({
  email: user.email,
  passwordConfirmation: '',
});

const EmailForm = ({ formatMessage, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useInjectSaga({ key: 'editUser', saga: editUserSaga });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ email, passwordConfirmation }, { setSubmitting }) => {
    setSubmitting(false);
  };

  const handleBlur = email => () => {
    if (user.email !== email) openModal();
  };

  return (
    <Fragment>
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
            <Fragment>
              <Modal
                visible={modalVisible}
                title={formatMessage(messages.changeYourEmail)}
                onClose={closeModal}
                maxWidth={500}
              >
                <Column>
                  <H3 mb={30}>
                    <FormattedMessage {...messages.modalDescriptipn} />
                  </H3>
                  <FormikInput
                    formikKey="passwordConfirmation"
                    placeholder={formatMessage(messages.password)}
                    label={formatMessage(messages.passwordLabel)}
                    type="password"
                    inputProps={inputProps}
                  />
                  <Row width="100%" mt={30}>
                    <Button
                      mr={20}
                      inverted
                      hoverable
                      onClick={closeModal}
                      type="button"
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button hoverable onClick={handleSubmit} type="button">
                      <FormattedMessage {...messages.changeEmail} />
                    </Button>
                  </Row>
                </Column>
              </Modal>
              <Row width="100%">
                <FormikInput
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
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
};

EmailForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailForm);
