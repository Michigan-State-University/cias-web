/**
 *
 * LoginPage
 *
 */

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import { loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { FullPageCentered } from './styles';

export function LoginPage({ onLogin }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Fragment>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <FullPageCentered>
        <Card>
          <p>Login</p>
          <Input
            mb={20}
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <div className="mt2">
            <Input
              mb={20}
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <Button title="Log in" onClick={() => onLogin(email, password)} />
        </Card>
      </FullPageCentered>
    </Fragment>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(loginRequest(username, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
