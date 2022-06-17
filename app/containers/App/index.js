/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import GlobalStyle from 'global-styles';

import {
  Roles,
  navbarMessages,
  NAVIGATION,
  navbarNames,
  AllRoles,
} from 'models/User/RolesManager';
import RolesManagerContext from 'models/User/RolesManager/RolesManagerContext';
import rootSaga from 'global/sagas/rootSaga';
import {
  fetchSelfDetailsRequest,
  makeSelectUser,
  fetchSelfDetailsSaga,
} from 'global/reducers/auth';

import AnswerSessionPage from 'containers/AnswerSessionPage/Loadable';
import EditSessionPage from 'containers/Sessions/containers/EditSessionPage/Loadable';
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
import GeneratedReportsPage from 'containers/Sessions/containers/GeneratedReportsPage';
import ForbiddenPage from 'containers/ForbiddenPage/Loadable';
import TextMessagesPage from 'containers/Sessions/containers/TextMessagesPage';
import ReportingDashboardPage from 'containers/ReportingDashboardPage/Loadable';
import ClinicAdminRedirectPage from 'containers/ClinicAdminRedirectPage/Loadable';
import { VIEW } from 'containers/ReportingDashboardPage/constants';
import ApiQueryMessageHandler from 'components/ApiQueryMessageHandler/Loadable';
import ParticipantReports from 'containers/ParticipantDashboard/Loadable';
import SessionMapPage from 'containers/SessionMapPage/Loadable';
import ParticipantInterventionsPage from 'containers/ParticipantInterventionsPage/Loadable';
import UserInterventionPage from 'containers/UserInterventionPage/Loadable';
import UserInterventionInvitePage from 'containers/UserInterventionInvitePage/Loadable';
import SuperadminConsolePage from 'containers/SuperadminConsolePage/Loadable';
import InboxPage from 'containers/InboxPage/Loadable';

import AppRoute from 'components/AppRoute';
import IdleTimer from 'components/IdleTimer/Loadable';
import { SocketProvider } from 'components/ActionCable';

import {
  accountsTabId,
  interventionsTabId,
  participantReportsTabId,
  teamsTabId,
  participantInterventionsTabId,
  conversationsTabId,
} from 'models/User/RolesManager/defaultNavbarTabs';

import { arraysOverlap } from 'utils/arrayUtils';
import { MODAL_PORTAL_ID, TOOLTIP_PORTAL_ID } from './constants';

export function App({ user, fetchSelfDetails }) {
  const { locale, formatMessage } = useIntl();
  const { pathname } = useLocation();
  useInjectSaga({ key: 'app', saga: rootSaga });
  useInjectSaga({ key: 'fetchSelfDetails', saga: fetchSelfDetailsSaga });

  useEffect(() => {
    if (user && !pathname.includes('/preview')) {
      fetchSelfDetails();
    }
  }, []);

  const defaultSidebarId = useMemo(() => {
    if (!isEmpty(user?.roles)) {
      if (user.roles.includes(Roles.Participant))
        return participantInterventionsTabId;
      return interventionsTabId;
    }
  }, [user]);

  useEffect(() => {
    const appRoot = document.getElementById('app');

    appRoot?.setAttribute('lang', locale);
  }, [locale]);

  const renderDashboardByRole = () => {
    if (user) {
      if (arraysOverlap(user.roles, [Roles.Admin, Roles.Researcher]))
        return <InterventionPage />;
      if (arraysOverlap(user.roles, [Roles.Participant]))
        return <ParticipantInterventionsPage />;
      if (arraysOverlap(user.roles, [Roles.ThirdParty]))
        return <GeneratedReportsPage disableFilter />;
      if (
        arraysOverlap(user.roles, [
          Roles.OrganizationAdmin,
          Roles.HealthSystemAdmin,
        ])
      )
        return (
          <ReportingDashboardPage
            view={VIEW.DASHBOARD_VIEW}
            organizableId={user.organizableId}
          />
        );
      if (arraysOverlap(user.roles, [Roles.ClinicAdmin]))
        return <ClinicAdminRedirectPage />;

      return NotFoundPage;
    }
    return <LoginPage />;
  };

  const renderUserListByRole = () => {
    if (user) {
      if (user.roles.includes(Roles.Admin))
        return (
          <UserListPage
            pageTitle={formatMessage(navbarMessages.adminAccounts)}
          />
        );
      if (user.roles.includes(Roles.Researcher))
        return (
          <UserListPage
            filterableRoles={[Roles.Participant]}
            pageTitle={formatMessage(navbarMessages.researcherAccounts)}
          />
        );

      return NotFoundPage;
    }
  };

  return (
    <SocketProvider user={user}>
      <RolesManagerContext.Provider value={{ userRoles: user?.roles || [] }}>
        <ApiQueryMessageHandler />
        <IdleTimer />

        <div id={TOOLTIP_PORTAL_ID} />
        <div id={MODAL_PORTAL_ID} />

        <Switch>
          <AppRoute
            exact
            path="/"
            render={() => renderDashboardByRole()}
            protectedRoute
            allowedRoles={AllRoles}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: interventionsTabId,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: defaultSidebarId,
            }}
          />
          <AppRoute
            exact
            path="/live-chat"
            component={InboxPage}
            protectedRoute
            allowedRoles={AllRoles}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: conversationsTabId,
            }}
          />
          <AppRoute
            exact
            path="/organization/:organizationId"
            render={() => (
              <ReportingDashboardPage view={VIEW.MANAGE_ORGANIZATIONS} />
            )}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.EInterventionAdmin]}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
            }}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
          />
          <AppRoute
            exact
            path="/organization/:organizationId/dashboard-setup"
            render={() => (
              <ReportingDashboardPage view={VIEW.DASHBOARD_SETUP} />
            )}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.EInterventionAdmin]}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
            }}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
          />
          <AppRoute
            exact
            path="/organization/:organizationId/dashboard"
            render={() => <ReportingDashboardPage view={VIEW.DASHBOARD_VIEW} />}
            protectedRoute
            allowedRoles={[
              Roles.Admin,
              Roles.EInterventionAdmin,
              Roles.OrganizationAdmin,
              Roles.ClinicAdmin,
            ]}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
            }}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
          />
          <AppRoute
            exact
            path="/reports"
            component={ParticipantReports}
            protectedRoute
            allowedRoles={[Roles.Participant]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: participantReportsTabId,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: participantReportsTabId,
            }}
          />
          <AppRoute exact path="/login" component={LoginPage} />
          <AppRoute exact path="/register" component={RegisterPage} />
          <AppRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
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
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/fill"
            component={AnswerSessionPage}
            allowedRoles={AllRoles}
            user
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: interventionsTabId,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/settings"
            component={SettingsInterventionPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/report-templates"
            component={ReportTemplatesPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/generated-reports"
            component={GeneratedReportsPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/sms-messaging"
            component={TextMessagesPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/sessions/:sessionId/map"
            component={SessionMapPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.SESSIONS,
            }}
          />
          <AppRoute
            exact
            path="/user_interventions/:userInterventionId"
            component={UserInterventionPage}
            protectedRoute
            allowedRoles={[Roles.Participant]}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId/invite"
            component={UserInterventionInvitePage}
            protectedRoute
            allowedRoles={[Roles.Participant]}
          />
          <AppRoute
            exact
            path="/users"
            component={renderUserListByRole}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: accountsTabId,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: accountsTabId,
            }}
          />
          <AppRoute
            exact
            path="/teams"
            component={TeamsListPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.TeamAdmin]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: teamsTabId,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: teamsTabId,
            }}
          />
          <AppRoute
            exact
            path="/teams/:id"
            component={TeamDetails}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.TeamAdmin]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
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
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.PREVIEW,
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
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.PREVIEW,
              navbarName: navbarNames.preview,
            }}
          />
          <AppRoute
            exact
            path="/interventions/:interventionId"
            component={InterventionDetailsPage}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.Researcher]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
            }}
          />
          <AppRoute
            exact
            path="/profile"
            component={AccountSettings}
            protectedRoute
            allowedRoles={AllRoles}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: null,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: null,
            }}
          />
          <AppRoute
            exact
            path="/users/:id"
            component={UserDetails}
            protectedRoute
            allowedRoles={[Roles.Admin, Roles.TeamAdmin]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: accountsTabId,
            }}
            sidebarProps={{
              sidebarId: NAVIGATION.DEFAULT,
              activeTab: accountsTabId,
            }}
          />
          <AppRoute
            exact
            protectedRoute
            path="/admin-console"
            component={SuperadminConsolePage}
            allowedRoles={[Roles.Admin]}
            navbarProps={{
              navbarId: NAVIGATION.DEFAULT,
              activeTab: null,
            }}
          />
          <AppRoute
            exact
            path="/no-access"
            component={ForbiddenPage}
            allowedRoles={AllRoles}
          />
          <AppRoute exact path="/not-found-page" component={NotFoundPage} />
          <AppRoute path="*">
            <Redirect to="/not-found-page" />
          </AppRoute>
        </Switch>
        <GlobalStyle />
      </RolesManagerContext.Provider>
    </SocketProvider>
  );
}

App.propTypes = {
  user: PropTypes.object,
  fetchSelfDetails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchSelfDetails: fetchSelfDetailsRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
