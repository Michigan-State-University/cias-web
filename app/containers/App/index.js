/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import saga from './saga';
import AppRoute from '../../components/AppRoute';

function App() {
  useInjectSaga({ key: 'app', saga });

  return (
    <Fragment>
      <Switch>
        <AppRoute exact path="/" component={HomePage} />
        <AppRoute exact path="/login" component={LoginPage} />
        <AppRoute component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
