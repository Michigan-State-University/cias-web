/**
 *
 * LoginPage
 *
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { parse } from 'query-string';
import has from 'lodash/has';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import { useInjectSaga } from 'redux-injectors';

import { Fill } from 'components/Fill';
import Column from 'components/Column';
import H1 from 'components/H1';
import { PublicLayout } from 'containers/PublicLayout';

import {
  loginRequest,
  makeSelectErrors,
  makeSelectLoaders,
  makeSelectLoginFormData,
  ACCOUNT_CONFIRMATION_ERROR,
  ACCOUNT_CONFIRMATION_SUCCESS,
  loginSaga,
  makeSelectVerificationNeeded,
  verificationCodeRequest,
  makeSelectVerificationSuccess,
  makeSelectTermsNotAccepted,
  makeSelectTermsExtraFields,
  clearErrors as clearErrorsAction,
} from 'global/reducers/auth';

import LoginForm from './components/LoginForm';
import CodeVerification from './components/CodeVerification';
import TermsNotAccepted from './components/TermsNotAccepted';
import messages from './messages';
import {
  CODE_VERIFICATION_VIEW,
  LOGIN_FORM_VIEW,
  TERMS_NOT_ACCEPTED_VIEW,
} from './constants';

export const LoginPage = ({
  formData,
  onLogin,
  errors: { loginError, verificationCodeError, termsAcceptError },
  loaders: { loginLoading, verificationCodeLoading, termsAcceptLoading },
  verificationNeeded,
  verificationSuccess,
  verifyCode,
  termsNotAccepted,
  termsExtraFields,
  clearErrors,
}) => {
  useInjectSaga({ key: 'loginPage', saga: loginSaga });
  const { search } = useLocation();
  const { formatMessage } = useIntl();

  const [currentView, setCurrentView] = useState(LOGIN_FORM_VIEW);

  const changeView = (view) => {
    clearErrors();
    setCurrentView(view);
  };

  useEffect(() => {
    if (verificationNeeded) setCurrentView(CODE_VERIFICATION_VIEW);
  }, [verificationNeeded]);

  useEffect(() => {
    if (termsNotAccepted) setCurrentView(TERMS_NOT_ACCEPTED_VIEW);
  }, [termsNotAccepted]);

  useEffect(() => {
    if (verificationSuccess) {
      changeView(LOGIN_FORM_VIEW);
      onLogin(formData.email, formData.password);
    }
  }, [verificationSuccess]);

  const queryObject = useMemo(
    () => parse(search, { parseBooleans: true }),
    [search],
  );

  useEffect(() => {
    if (has(queryObject, 'account_confirmation_success')) {
      if (queryObject.account_confirmation_success)
        toast.success(formatMessage(messages.accountConfirmationSuccess), {
          toastId: ACCOUNT_CONFIRMATION_SUCCESS,
        });
      else
        toast.error(formatMessage(messages.accountConfirmationError), {
          toastId: ACCOUNT_CONFIRMATION_ERROR,
        });
    }
  }, [queryObject.account_confirmation_success]);

  const render = useCallback(() => {
    switch (currentView) {
      case CODE_VERIFICATION_VIEW:
        return (
          <CodeVerification
            goBack={() => changeView(LOGIN_FORM_VIEW)}
            isLoading={verificationCodeLoading}
            error={verificationCodeError}
            verifyCode={verifyCode}
          />
        );
      case TERMS_NOT_ACCEPTED_VIEW:
        return (
          <TermsNotAccepted
            goBack={() => changeView(LOGIN_FORM_VIEW)}
            error={termsAcceptError}
            termsExtraFields={termsExtraFields}
            loading={termsAcceptLoading}
          />
        );
      case LOGIN_FORM_VIEW:
      default:
        return (
          <LoginForm
            formData={formData}
            isLoading={loginLoading}
            onLogin={onLogin}
            error={loginError}
          />
        );
    }
  }, [
    currentView,
    loginLoading,
    verificationCodeLoading,
    loginError,
    verificationCodeError,
    termsAcceptLoading,
    termsAcceptError,
  ]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <PublicLayout withMsuLogo>
        <Fill justify="center" align="center">
          <Column sm={10} md={8} lg={6} align="start">
            <H1 fontSize={23}>{formatMessage(messages[currentView])}</H1>
            {render()}
          </Column>
        </Fill>
      </PublicLayout>
    </>
  );
};

LoginPage.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onLogin: PropTypes.func,
  errors: PropTypes.object,
  loaders: PropTypes.object,
  verificationNeeded: PropTypes.bool,
  termsNotAccepted: PropTypes.bool,
  verificationSuccess: PropTypes.bool,
  verifyCode: PropTypes.func,
  termsExtraFields: PropTypes.object,
  clearErrors: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  formData: makeSelectLoginFormData(),
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  verificationNeeded: makeSelectVerificationNeeded(),
  verificationSuccess: makeSelectVerificationSuccess(),
  termsNotAccepted: makeSelectTermsNotAccepted(),
  termsExtraFields: makeSelectTermsExtraFields(),
});

const mapDispatchToProps = {
  onLogin: loginRequest,
  verifyCode: verificationCodeRequest,
  clearErrors: clearErrorsAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
