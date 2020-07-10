/**
 *
 * LoginPage
 *
 */

import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import { Input } from 'components/Input';
import { Card } from 'components/Card';
import { Fill } from 'components/Fill';
import Column from 'components/Column';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ErrorAlert from 'components/ErrorAlert';
import { Link } from 'react-router-dom';
import { success } from 'react-toastify-redux';

import { makeSelectAlert } from 'global/reducers/alerts';

import { REGISTER_SUCCESS } from 'containers/RegisterPage/constants';

import makeSelectLoginPage from './selectors';
import { loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { StyledButton } from './styled';

export function LoginPage(props) {
  const {
    onLogin,
    loginPage: { error, loading, formData },
    intl: { formatMessage },
    isRegisterSuccess,
    showSuccess,
  } = props;
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [email, setEmail] = useState(formData.email);
  const [password, setPassword] = useState(formData.password);

  useEffect(() => {
    if (isRegisterSuccess) {
      showSuccess(formatMessage(messages.createdAccount), {
        id: REGISTER_SUCCESS,
      });
    }
  }, [isRegisterSuccess]);

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Fill justify="center" align="center">
        <Column align="center" sm={8} md={6}>
          <Card width="100%">
            <Column>
              <p>{formatMessage(messages.header)}</p>
              <Input
                mb={20}
                placeholder={formatMessage(messages.emailPlaceholder)}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <Input
                mb={20}
                type="password"
                placeholder={formatMessage(messages.passwordPlaceholder)}
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <StyledButton
                loading={loading}
                title={formatMessage(messages.loginButton)}
                onClick={() => onLogin(email, password)}
              />
              <Link to="/register">
                <StyledButton title={formatMessage(messages.register)} />
              </Link>
              {error && <ErrorAlert errorText={error} />}
            </Column>
          </Card>
        </Column>
      </Fill>
    </Fragment>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  intl: PropTypes.object,
  loginPage: PropTypes.shape({
    errors: PropTypes.string,
    loading: PropTypes.bool,
    formData: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
  isRegisterSuccess: PropTypes.bool,
  showSuccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  isRegisterSuccess: makeSelectAlert(REGISTER_SUCCESS),
});

const mapDispatchToProps = {
  onLogin: loginRequest,
  showSuccess: success,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(LoginPage));
