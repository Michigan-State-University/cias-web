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

import AnswerInterventionPage from 'containers/AnswerInterventionPage/Loadable';
import AppRoute from 'components/AppRoute';
import EditInterventionPage from 'containers/Interventions/containers/EditInterventionPage';
import GlobalStyle from 'global-styles';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import SettingsInterventionPage from 'containers/Interventions/containers/SettingsInterventionPage';
import UserListPage from 'containers/UserList/Loadable';
import navbarNames from 'utils/navbarNames';
import rootSaga from 'global/sagas/rootSaga';
import { useInjectSaga } from 'utils/injectSaga';

function App() {
  useInjectSaga({ key: 'app', saga: rootSaga });

  return (
    <Fragment>
      <Switch>
        <AppRoute exact path="/" component={HomePage} protectedRoute />
        <AppRoute exact path="/login" component={LoginPage} />
        <AppRoute exact path="/register" component={RegisterPage} />
        <AppRoute
          exact
          path="/interventions/:id/edit"
          component={EditInterventionPage}
          protectedRoute
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:id/fill"
          component={AnswerInterventionPage}
        />
        <AppRoute
          exact
          path="/interventions/:id/settings"
          component={SettingsInterventionPage}
          protectedRoute
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/users"
          component={UserListPage}
          protectedRoute
          navbarProps={{
            navbarId: 'default',
            navbarName: navbarNames.userList,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:id/preview"
          component={AnswerInterventionPage}
          protectedRoute
          navbarProps={{
            navbarId: 'preview',
            navbarName: navbarNames.preview,
          }}
        />
        <AppRoute component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
