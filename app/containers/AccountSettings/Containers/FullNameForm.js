import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Formik } from 'formik';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';

import FormikInput from 'components/FormikInput';
import {
  editUserRequest,
  editUserSaga,
  makeSelectUser,
} from 'global/reducers/auth';
import { useInjectSaga } from 'utils/injectSaga';

import messages from '../messages';
import { StyledFullNameRow } from '../styled';

const validationSchema = formatMessage =>
  Yup.object().shape({
    firstName: Yup.string().required(formatMessage(messages.firstNameRequired)),
    lastName: Yup.string().required(formatMessage(messages.lastNameRequired)),
  });

const initialValues = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
});

const FullNameForm = ({ formatMessage, user, editUser }) => {
  useInjectSaga({ key: 'editUser', saga: editUserSaga });

  const onSubmit = ({ firstName, lastName }, { setSubmitting }) => {
    if (user.firstName !== firstName || user.lastName !== lastName)
      editUser({ firstName, lastName });
    setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={validationSchema(formatMessage)}
      initialValues={initialValues(user)}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        const sharedProps = {
          inputProps: {
            height: 46,
            width: '100%',
            onBlur: handleSubmit,
          },
          mb: 20,
        };
        return (
          <StyledFullNameRow width="100%">
            <FormikInput
              formikKey="firstName"
              placeholder={formatMessage(messages.firstName)}
              label={formatMessage(messages.firstNameLabel)}
              type="text"
              {...sharedProps}
              mr={20}
            />
            <FormikInput
              formikKey="lastName"
              placeholder={formatMessage(messages.lastName)}
              label={formatMessage(messages.lastNameLabel)}
              type="text"
              {...sharedProps}
            />
          </StyledFullNameRow>
        );
      }}
    </Formik>
  );
};

FullNameForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  editUser: PropTypes.func,
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

export default compose(
  withConnect,
  injectIntl,
)(FullNameForm);
