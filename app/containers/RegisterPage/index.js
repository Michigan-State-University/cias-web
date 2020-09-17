/**
 *
 * RegisterPage
 *
 */

import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import set from 'lodash/set';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Fill } from 'components/Fill';
import Button from 'components/Button';
import TextButton from 'components/Button/TextButton';
import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import FormikInput from 'components/FormikInput';
import ErrorAlert from 'components/ErrorAlert';
import withPublicLayout from 'containers/PublicLayout';

import { themeColors } from 'theme';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { register } from './actions';

dayjs.extend(utc);
dayjs.extend(timezone);

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
    const currentTimeZone = dayjs.tz.guess();
    set(values, 'time_zone', currentTimeZone);
    registerAction(values);
    setSubmitting(false);
  };

  return (
    <Fragment>
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
            {formikProps => {
              const { handleSubmit } = formikProps;
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                },
                mb: 20,
              };
              return (
                <>
                  <Row width="100%">
                    <FormikInput
                      formikKey="firstName"
                      placeholder={formatMessage(messages.firstName)}
                      label={formatMessage(messages.firstNameLabel)}
                      type="text"
                      mr={20}
                      {...sharedProps}
                    />
                    <FormikInput
                      formikKey="lastName"
                      placeholder={formatMessage(messages.lastName)}
                      label={formatMessage(messages.lastNameLabel)}
                      type="text"
                      {...sharedProps}
                    />
                  </Row>
                  <FormikInput
                    formikKey="email"
                    placeholder={formatMessage(messages.email)}
                    label={formatMessage(messages.emailLabel)}
                    type="email"
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="password"
                    placeholder={formatMessage(messages.password)}
                    label={formatMessage(messages.passwordLabel)}
                    type="password"
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="passwordConfirmation"
                    placeholder={formatMessage(messages.confirmPassword)}
                    label={formatMessage(messages.confirmPasswordLabel)}
                    type="password"
                    {...sharedProps}
                  />
                  <Button
                    height={46}
                    borderRadius={5}
                    my={25}
                    loading={loading}
                    onClick={handleSubmit}
                    title={formatMessage(messages.register)}
                  />
                  <Row justify="center" width="100%">
                    <Link to="/login">
                      <TextButton color={themeColors.secondary}>
                        <FormattedMessage {...messages.login} />
                      </TextButton>
                    </Link>
                  </Row>
                </>
              );
            }}
          </Formik>
          {error && <ErrorAlert errorText={error} />}
        </Column>
      </Fill>
    </Fragment>
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
  withPublicLayout,
)(RegisterPage);
