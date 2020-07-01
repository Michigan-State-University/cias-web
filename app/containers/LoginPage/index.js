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
import { toast } from 'react-toastify';
import makeSelectLoginPage from './selectors';
import { loginRequest, popupShown } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { StyledButton } from './styled';

export function LoginPage(props) {
  const {
    onLogin,
    popupShown: popupWasShown,
    loginPage: { error, loading, formData, newAccountPopup },
    intl: { formatMessage },
  } = props;
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [username, setUsername] = useState(formData.username);
  const [password, setPassword] = useState(formData.password);

  useEffect(() => {
    if (newAccountPopup) {
      toast.success(formatMessage(messages.createdAccount));
      popupWasShown();
    }
  }, [newAccountPopup]);

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
                value={username}
                onChange={event => setUsername(event.target.value)}
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
                onClick={() => onLogin(username, password)}
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
  popupShown: PropTypes.func,
  intl: PropTypes.object,
  loginPage: PropTypes.shape({
    errors: PropTypes.string,
    loading: PropTypes.bool,
    formData: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

const mapDispatchToProps = {
  onLogin: loginRequest,
  popupShown,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(LoginPage));
