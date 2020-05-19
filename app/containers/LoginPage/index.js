/**
 *
 * LoginPage
 *
 */

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { injectIntl } from 'react-intl';
import makeSelectLoginPage, { makeSelectFormData } from './selectors';
import { loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Fill } from '../../components/Fill';
import { Column } from '../../components/Column';

export function LoginPage({ onLogin, formData, intl: { formatMessage } }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [email, setEmail] = useState(formData.username);
  const [password, setPassword] = useState(formData.password);

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.LoginPage)}</title>
      </Helmet>
      <Fill justify="center" align="center">
        <Card width="50%">
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
            <Button
              title={formatMessage(messages.loginButton)}
              onClick={() => onLogin(email, password)}
            />
          </Column>
        </Card>
      </Fill>
    </Fragment>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  intl: PropTypes.object,
  formData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  formData: makeSelectFormData(),
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(loginRequest(username, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(LoginPage));
