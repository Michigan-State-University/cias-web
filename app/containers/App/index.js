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
import ProblemDetailsPage from 'containers/ProblemDetailsPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import ProblemSettingsPage from 'containers/ProblemSettingsPage/Loadable';
import SettingsInterventionPage from 'containers/Interventions/containers/SettingsInterventionPage';

import ParticipantDashboard from 'containers/ParticipantDashboard/Loadable';

import { ROLES } from 'global/reducers/auth/constants';

import ProblemPage from 'containers/ProblemPage/Loadable';
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
          return <ProblemPage />;
        case ROLES.researcher:
          return <ProblemPage />;
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
          navbarProps={{
            navbarId: 'default',
          }}
        />
        <AppRoute exact path="/login" component={LoginPage} />
        <AppRoute exact path="/register" component={RegisterPage} />
        <AppRoute exact path="/logout" component={Logout} />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/edit"
          component={EditInterventionPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/fill"
          component={AnswerInterventionPage}
          protectedRoute
          allowedRoles={ROLES.allRoles}
          user
          navbarProps={{
            navbarId: 'default',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/settings"
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
          key="previewFromStart"
          path="/interventions/:problemId/sessions/:interventionId/preview"
          component={AnswerInterventionPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'preview',
            navbarName: navbarNames.preview,
          }}
        />
        <AppRoute
          key="previewFromCurrent"
          path="/interventions/:problemId/sessions/:interventionId/preview/:index"
          component={AnswerInterventionPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'preview',
            navbarName: navbarNames.preview,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId/settings"
          component={ProblemSettingsPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'default',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId"
          component={ProblemDetailsPage}
          protectedRoute
          allowedRoles={[ROLES.admin, ROLES.researcher]}
          navbarProps={{
            navbarId: 'default',
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
