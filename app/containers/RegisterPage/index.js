/**
 *
 * RegisterPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Fill } from 'components/Fill';
import Column from 'components/Column';
import { Card } from 'components/Card';
import FormikInput from 'components/FormikInput';
import ErrorAlert from 'components/ErrorAlert';

import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { register } from './actions';
import { StyledButton } from './styled';

const passwordLength = 8;

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
    password: Yup.string()
      .required(formatMessage(messages.passwordRequired))
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
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      formatMessage(messages.passwordMatch),
    ),
    lastName: Yup.string().required(formatMessage(messages.lastNameRequired)),
    firstName: Yup.string().required(formatMessage(messages.firstNameRequired)),
  });

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
};

export function RegisterPage({
  register: registerAction,
  intl: { formatMessage },
  registerPage: { loading, error },
}) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  const onSubmit = (values, { setSubmitting }) => {
    registerAction(values);
    setSubmitting(false);
  };

  return (
    <Fill justify="center" align="center">
      <Column align="center" sm={8} md={6}>
        <Card width="100%">
          <Column>
            <Helmet>
              <title>RegisterPage</title>
              <meta name="description" content="Dezgribczon" />
            </Helmet>
            <FormattedMessage {...messages.register} />
            <Formik
              validationSchema={validationSchema(formatMessage)}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {formikProps => {
                const { handleSubmit } = formikProps;
                return (
                  <>
                    <FormikInput
                      formikKey="firstName"
                      placeholder={formatMessage(messages.firstName)}
                      type="text"
                      mb={20}
                    />
                    <FormikInput
                      formikKey="lastName"
                      placeholder={formatMessage(messages.lastName)}
                      type="text"
                      mb={20}
                    />
                    <FormikInput
                      formikKey="email"
                      placeholder={formatMessage(messages.email)}
                      type="email"
                      mb={20}
                    />
                    <FormikInput
                      formikKey="password"
                      placeholder={formatMessage(messages.password)}
                      type="password"
                      mb={20}
                    />
                    <FormikInput
                      formikKey="passwordConfirmation"
                      placeholder={formatMessage(messages.confirmPassword)}
                      type="password"
                      mb={20}
                    />
                    <StyledButton
                      loading={loading}
                      onClick={handleSubmit}
                      title={formatMessage(messages.register)}
                    />
                    <Link to="/login">
                      <StyledButton title={formatMessage(messages.login)} />
                    </Link>
                  </>
                );
              }}
            </Formik>
            {error && <ErrorAlert errorText={error} />}
          </Column>
        </Card>
      </Column>
    </Fill>
  );
}

RegisterPage.propTypes = {
  register: PropTypes.func,
  intl: PropTypes.object,
  registerPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

const mapDispatchToProps = {
  register,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(RegisterPage);
