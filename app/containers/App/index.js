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
import PropTypes from 'prop-types';

import AnswerInterventionPage from 'containers/AnswerInterventionPage/Loadable';
import AppRoute from 'components/AppRoute';
import EditInterventionPage from 'containers/Interventions/containers/EditInterventionPage';
import GlobalStyle from 'global-styles';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import SettingsInterventionPage from 'containers/Interventions/containers/SettingsInterventionPage';

import ParticipantDashboard from 'containers/ParticipantDashboard/Loadable';

import { ROLES } from 'global/reducers/auth/constants';

import UserListPage from 'containers/UserList/Loadable';
import Logout from 'containers/Logout/Loadable';
import navbarNames from 'utils/navbarNames';
import rootSaga from 'global/sagas/rootSaga';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'global/reducers/auth';
import { connect } from 'react-redux';
import { compose } from 'redux';

export function App({ user }) {
  useInjectSaga({ key: 'app', saga: rootSaga });

  const renderDashboardByRole = () => {
    if (user) {
      switch (user.roles[0]) {
        case ROLES.admin:
          return <HomePage />;
        case ROLES.researcher:
          return <HomePage />;
        case ROLES.participant:
          return <ParticipantDashboard />;
        default:
          return NotFoundPage;
      }
    } else return <LoginPage />;
  };

  return (
    <Fragment>
      <Switch>
        <AppRoute
          exact
          path="/"
          render={() => renderDashboardByRole()}
          protectedRoute
          allowedRoles={ROLES.allRoles}
        />
        <AppRoute exact path="/login" component={LoginPage} />
        <AppRoute exact path="/register" component={RegisterPage} />
        <AppRoute exact path="/logout" component={Logout} />
        <AppRoute
          exact
          path="/interventions/:id/edit"
          component={EditInterventionPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:id/fill"
          component={AnswerInterventionPage}
          protectedRoute
          allowedRoles={ROLES.allRoles}
          user
        />
        <AppRoute
          exact
          path="/interventions/:id/settings"
          component={SettingsInterventionPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/users"
          component={UserListPage}
          protectedRoute
          allowedRoles={[ROLES.admin]}
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
          allowedRoles={[ROLES.admin, ROLES.researcher]}
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

App.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
