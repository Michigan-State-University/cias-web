/**
 *
 * LoginPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import { parse } from 'query-string';
import has from 'lodash/has';
import { toast } from 'react-toastify';

import FormikInput from 'components/FormikInput';
import { Fill } from 'components/Fill';

import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import { Button } from 'components/Button';
import LinkButton from 'components/Button/LinkButton';
import Divider from 'components/Divider';
import { MSULogo } from 'components/Logo';
import withPublicLayout from 'containers/PublicLayout';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';

import ErrorAlert from 'components/ErrorAlert';
import { makeSelectLocation } from 'containers/App/selectors';
import {
  ACCOUNT_CONFIRMATION_ERROR,
  ACCOUNT_CONFIRMATION_SUCCESS,
} from './constants';
import makeSelectLoginPage from './selectors';
import { loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Or } from './styled';

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
    password: Yup.string().required(formatMessage(messages.passwordRequired)),
  });

const initialValues = formData => ({
  email: formData.email || '',
  password: formData.password || '',
});

export const LoginPage = ({
  onLogin,
  loginPage: { error, loading, formData },
  intl: { formatMessage },
  location: { search },
}) => {
  const queryObject = parse(search, { parseBooleans: true });

  useEffect(() => {
    if (has(queryObject, 'account_confirmation_success')) {
      if (queryObject.account_confirmation_success)
        toast.success(formatMessage(messages.accountConfirmation.success), {
          toastId: ACCOUNT_CONFIRMATION_SUCCESS,
        });
      else
        toast.error(formatMessage(messages.accountConfirmation.error), {
          toastId: ACCOUNT_CONFIRMATION_ERROR,
        });
    }
  }, [queryObject.account_confirmation_success]);

  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const onSubmit = ({ email, password }, actions) => {
    onLogin(email, password);
    actions.setSubmitting(false);
  };

  const loginOnEnter = (email, password) => event => {
    if (!email || !password) return;
    if (event.keyCode === 13) {
      onLogin(email, password);
    }
  };

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <MSULogo position="absolute" top={35} right={45} />
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <H1 mb={40} fontSize={23}>
            {formatMessage(messages.header)}
          </H1>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues(formData)}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values }) => {
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                  onKeyDown: loginOnEnter(values.email, values.password),
                },
                mb: 20,
              };
              return (
                <>
                  <FormikInput
                    formikKey="email"
                    placeholder={formatMessage(messages.emailPlaceholder)}
                    type="text"
                    label={formatMessage(messages.emailLabel)}
                    {...sharedProps}
                  />
                  <LinkButton
                    tabIndex={-1}
                    to="/reset-password"
                    alignSelf="end"
                    mb={-14}
                    zIndex={1}
                  >
                    <FormattedMessage {...messages.forgotPassword} />
                  </LinkButton>
                  <FormikInput
                    formikKey="password"
                    placeholder={formatMessage(messages.passwordPlaceholder)}
                    type="password"
                    label={formatMessage(messages.passwordLabel)}
                    {...sharedProps}
                  />
                  <Button
                    height={46}
                    borderRadius={5}
                    mt={25}
                    loading={loading}
                    title={formatMessage(messages.loginButton)}
                    onClick={handleSubmit}
                    type="submit"
                  />
                  <Row width="100%">
                    <Divider mr={15} mt={40} />
                    <Or fontWeight="bold" mb={-5}>
                      <FormattedMessage {...messages.or} />
                    </Or>
                    <Divider ml={15} mt={40} />
                  </Row>
                  <Row width="100%" justify="center" mt={30}>
                    <LinkButton to="/register">
                      <FormattedMessage {...messages.register} />
                    </LinkButton>
                  </Row>
                </>
              );
            }}
          </Formik>
          {error && <ErrorAlert errorText={error} mt={20} />}
        </Column>
      </Fill>
    </>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  intl: PropTypes.object,
  loginPage: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    formData: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({ search: PropTypes.string }),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = {
  onLogin: loginRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(
  compose(
    withConnect,
    withPublicLayout,
  )(LoginPage),
);
