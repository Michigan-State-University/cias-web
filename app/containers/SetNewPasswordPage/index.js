/**
 *
 * SetNewPasswordPage
 *
 */

import React, { Fragment } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RoutePath } from 'global/constants';

import { Fill } from 'components/Fill';
import Column from 'components/Column';
import H1 from 'components/H1';
import withPublicLayout from 'containers/PublicLayout';
import FormikInput from 'components/FormikInput';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';

import { passwordRegex } from 'global/constants/regex';

import messages from './messages';
import { setNewPasswordRequest } from './actions';
import { makeSelectLoader, makeSelectError } from './selectors';
import setNewPasswordSaga from './saga';
import { setNewPasswordReducer } from './reducer';
import { shouldRedirectToLogin } from './utils';

const passwordLength = 8;

const validationSchema = (formatMessage) =>
  Yup.object().shape({
    password: Yup.string()
      .required(formatMessage(messages.passwordRequired))
      .min(
        passwordLength,
        formatMessage(messages.passwordLength, { length: 8 }),
      )
      .test(
        'password',
        formatMessage(messages.passwordInvalid),
        (value) => value && !!value.match(passwordRegex),
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      formatMessage(messages.passwordMatch),
    ),
  });

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const SetNewPasswordPage = ({
  intl: { formatMessage },
  loading,
  error,
  setNewPassword,
  location,
}) => {
  useInjectReducer({ key: 'setNewPassword', reducer: setNewPasswordReducer });
  useInjectSaga({ key: 'setNewPassword', saga: setNewPasswordSaga });
  const queryObj = queryString.parse(location.search);

  if (shouldRedirectToLogin(queryObj)) {
    return <Redirect to={RoutePath.LOGIN} />;
  }

  const onSubmit = ({ password, passwordConfirmation }, { setSubmitting }) => {
    const { 'Access-Token': accessToken, Client: client, uid } = queryObj;
    setNewPassword({
      password,
      passwordConfirmation,
      configuration: { accessToken, client, uid },
    });
    setSubmitting(false);
  };
  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <H1 mb={40} fontSize={23}>
            <FormattedMessage {...messages.header} />
          </H1>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => {
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
                    formikKey="password"
                    placeholder={formatMessage(messages.password)}
                    type="password"
                    label={formatMessage(messages.passwordLabel)}
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="passwordConfirmation"
                    placeholder={formatMessage(messages.confirmPassword)}
                    type="password"
                    label={formatMessage(messages.confirmPasswordLabel)}
                    {...sharedProps}
                  />
                  <Button
                    height={46}
                    mt={25}
                    loading={loading}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    <FormattedMessage {...messages.resetPassword} />
                  </Button>
                  {error && <ErrorAlert errorText={error} mt={25} />}
                </>
              );
            }}
          </Formik>
        </Column>
      </Fill>
    </>
  );
};

SetNewPasswordPage.propTypes = {
  intl: PropTypes.shape(IntlShape),
  loading: PropTypes.bool,
  error: PropTypes.string,
  setNewPassword: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoader(),
  error: makeSelectError(),
});

const mapDispatchToProps = {
  setNewPassword: setNewPasswordRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectIntl,
  withPublicLayout,
)(SetNewPasswordPage);
