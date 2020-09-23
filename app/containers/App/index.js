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
import AccountSettings from 'containers/AccountSettings/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import SetNewPasswordPage from 'containers/SetNewPasswordPage/Loadable';
import ProblemPage from 'containers/ProblemPage/Loadable';
import UserListPage from 'containers/UserList/Loadable';
import Logout from 'containers/Logout/Loadable';
import UserDetails from 'containers/UserDetails/Loadable';
import ParticipantDashboard from 'containers/ParticipantDashboard/Loadable';

import { Roles } from 'models/User/UserRoles';

import navbarNames from 'utils/navbarNames';
import rootSaga from 'global/sagas/rootSaga';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'global/reducers/auth';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { accountsTabId, interventionsTabId } from 'utils/defaultNavbarTabs';

export function App({ user }) {
  useInjectSaga({ key: 'app', saga: rootSaga });

  const renderDashboardByRole = () => {
    if (user) {
      switch (user.roles[0]) {
        case Roles.admin:
          return <ProblemPage />;
        case Roles.researcher:
          return <ProblemPage />;
        case Roles.participant:
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
          allowedRoles={Roles.allRoles}
          navbarProps={{
            navbarId: 'default',
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute exact path="/login" component={LoginPage} />
        <AppRoute exact path="/register" component={RegisterPage} />
        <AppRoute exact path="/reset-password" component={ResetPasswordPage} />
        <AppRoute
          exact
          path="/set-new-password"
          component={SetNewPasswordPage}
        />
        <AppRoute exact path="/logout" component={Logout} />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/edit"
          component={EditInterventionPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher]}
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/fill"
          component={AnswerInterventionPage}
          allowedRoles={Roles.allRoles}
          user
          navbarProps={{
            navbarId: 'default',
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId/sessions/:interventionId/settings"
          component={SettingsInterventionPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher]}
          navbarProps={{
            navbarId: 'interventions',
          }}
        />
        <AppRoute
          exact
          path="/users"
          component={UserListPage}
          protectedRoute
          allowedRoles={[Roles.admin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: accountsTabId,
          }}
        />
        <AppRoute
          exact
          key="previewFromStart"
          path="/interventions/:problemId/sessions/:interventionId/preview"
          component={AnswerInterventionPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher]}
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
          allowedRoles={[Roles.admin, Roles.researcher]}
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
          allowedRoles={[Roles.admin, Roles.researcher]}
          navbarProps={{
            navbarId: 'default',
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:problemId"
          component={ProblemDetailsPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher]}
          navbarProps={{
            navbarId: 'default',
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute
          exact
          path="/profile"
          component={AccountSettings}
          protectedRoute
          allowedRoles={Roles.allRoles}
          navbarProps={{
            navbarId: 'default',
            activeTab: accountsTabId,
          }}
        />
        <AppRoute
          exact
          path="/profile/:id"
          component={UserDetails}
          protectedRoute
          allowedRoles={[Roles.admin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: accountsTabId,
          }}
        />
        <AppRoute exact path="/not-found-page" component={NotFoundPage} />
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
