/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnswerSessionPage from 'containers/AnswerSessionPage/Loadable';
import AppRoute from 'components/AppRoute';
import EditSessionPage from 'containers/Sessions/containers/EditSessionPage';
import GlobalStyle from 'global-styles';
import InterventionDetailsPage from 'containers/InterventionDetailsPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import SettingsInterventionPage from 'containers/Sessions/containers/SettingsSessionPage';
import ReportTemplatesPage from 'containers/Sessions/containers/ReportTemplatesPage';
import AccountSettings from 'containers/AccountSettings/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import SetNewPasswordPage from 'containers/SetNewPasswordPage/Loadable';
import InterventionPage from 'containers/InterventionPage/Loadable';
import UserListPage from 'containers/UserList/Loadable';
import TeamsListPage from 'containers/TeamsList/Loadable';
import TeamDetails from 'containers/TeamDetails/Loadable';
import Logout from 'containers/Logout/Loadable';
import UserDetails from 'containers/UserDetails/Loadable';
import ParticipantDashboard from 'containers/ParticipantDashboard/Loadable';
import ReportsPage from 'containers/ParticipantDashboard/components/ReportsTab/Loadable';

import ApiQueryMessageHandler from 'components/ApiQueryMessageHandler/Loadable';

import { Roles } from 'models/User/UserRoles';

import navbarNames from 'utils/navbarNames';
import rootSaga from 'global/sagas/rootSaga';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'global/reducers/auth';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  accountsTabId,
  interventionsTabId,
  myTeamTabId,
  participantReportsTabId,
  teamsTabId,
} from 'utils/defaultNavbarTabs';

export function App({ user }) {
  useInjectSaga({ key: 'app', saga: rootSaga });

  const renderDashboardByRole = () => {
    if (user) {
      switch (user.roles[0]) {
        case Roles.admin:
          return <InterventionPage />;
        case Roles.researcher:
          return <InterventionPage />;
        case Roles.teamAdmin:
          return <InterventionPage />;
        case Roles.participant:
          return <ParticipantDashboard />;
        default:
          return NotFoundPage;
      }
    } else return <LoginPage />;
  };

  return (
    <>
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
        <AppRoute
          exact
          path="/reports"
          component={ReportsPage}
          protectedRoute
          allowedRoles={[Roles.participant]}
          navbarProps={{
            navbarId: 'default',
            activeTab: participantReportsTabId,
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
          path="/interventions/:interventionId/sessions/:sessionId/edit"
          component={EditSessionPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'sessions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:interventionId/sessions/:sessionId/fill"
          component={AnswerSessionPage}
          allowedRoles={Roles.allRoles}
          user
          navbarProps={{
            navbarId: 'default',
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:interventionId/sessions/:sessionId/settings"
          component={SettingsInterventionPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'sessions',
          }}
        />
        <AppRoute
          exact
          path="/interventions/:interventionId/sessions/:sessionId/report-templates"
          component={ReportTemplatesPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'sessions',
          }}
        />
        <AppRoute
          exact
          path="/users"
          component={UserListPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher]}
          navbarProps={{
            navbarId: 'default',
            activeTab: accountsTabId,
          }}
        />
        <AppRoute
          exact
          path="/teams"
          component={TeamsListPage}
          protectedRoute
          allowedRoles={[Roles.admin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: teamsTabId,
          }}
        />
        <AppRoute
          exact
          path="/teams/:id"
          component={TeamDetails}
          protectedRoute
          allowedRoles={[Roles.admin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: teamsTabId,
          }}
        />
        <AppRoute
          exact
          path="/my-team"
          component={() => (
            <TeamDetails match={{ params: { id: user.teamId } }} />
          )}
          protectedRoute
          allowedRoles={[Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: myTeamTabId,
          }}
        />
        <AppRoute
          exact
          key="previewFromStart"
          path="/interventions/:interventionId/sessions/:sessionId/preview"
          component={({ match }) => (
            <AnswerSessionPage match={match} isPreview />
          )}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'preview',
            navbarName: navbarNames.preview,
          }}
        />
        <AppRoute
          key="previewFromCurrent"
          path="/interventions/:interventionId/sessions/:sessionId/preview/:index"
          component={({ match }) => (
            <AnswerSessionPage match={match} isPreview />
          )}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'preview',
            navbarName: navbarNames.preview,
          }}
        />
        <AppRoute
          exact
          path="/interventions/:interventionId"
          component={InterventionDetailsPage}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.researcher, Roles.teamAdmin]}
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
            activeTab: null,
          }}
        />
        <AppRoute
          exact
          path="/users/:id"
          component={UserDetails}
          protectedRoute
          allowedRoles={[Roles.admin, Roles.teamAdmin]}
          navbarProps={{
            navbarId: 'default',
            activeTab: accountsTabId,
          }}
        />
        <AppRoute exact path="/not-found-page" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ApiQueryMessageHandler />
    </>
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
