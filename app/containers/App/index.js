/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Switch } from 'react-router-dom';
import { useLocation, matchPath } from 'react-router';
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
  PasswordAuthenticatedRoles,
  AuthenticatedRoles,
} from 'models/User/RolesManager';
import RolesManagerContext from 'models/User/RolesManager/RolesManagerContext';
import rootSaga from 'global/sagas/rootSaga';
import {
  fetchSelfDetailsRequest,
  makeSelectUser,
  fetchSelfDetailsSaga,
} from 'global/reducers/auth';
import {
  INTERVENTION_LANGUAGE_QUERY_KEY,
  RoutePath,
  WILDCARD_PATH,
} from 'global/constants';

import AnswerSessionPage from 'containers/AnswerSessionPage/Loadable';
import EditSessionPage from 'containers/Sessions/containers/EditSessionPage/Loadable';
import InterventionDetailsPage from 'containers/InterventionDetailsPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import SettingsSessionPage from 'containers/Sessions/containers/SettingsSessionPage';
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
import ParticipantReportsPage from 'containers/ParticipantReportsPage/Loadable';
import SessionMapPage from 'containers/SessionMapPage/Loadable';
import ParticipantInterventionsPage from 'containers/ParticipantInterventionsPage/Loadable';
import UserInterventionInvitePage from 'containers/UserInterventionInvitePage/Loadable';
import SuperadminConsolePage from 'containers/SuperadminConsolePage/Loadable';
import InboxPage from 'containers/InboxPage/Loadable';
import ArchivePage from 'containers/ArchivePage/Loadable';
import UserInterventionPage from 'containers/UserInterventionPage/Loadable';
import VerifyShortLinkPage from 'containers/VerifyShortLinkPage/Loadable';
import VerifySmsLinkPage from 'containers/VerifySmsLinkPage/Loadable';
import UserSmsLinkPage from 'containers/UserSmsLinkPage';
import VerifyUserKeyPage from 'containers/VerifyUserKeyPage/Loadable';
import AccessibilityStatementPage from 'containers/AccessibiltyStatementPage/Loadable';
import ChatWidget from 'containers/ChatWidget';
import NavigatorAvailabilityModal from 'containers/NavigatorAvailabilityModal';
import InterventionNotAvailablePage from 'containers/InterventionNotAvailablePage/Loadable';

import AppRoute from 'components/AppRoute';
import IdleTimer from 'components/IdleTimer/Loadable';

import {
  accountsTabId,
  interventionsTabId,
  participantReportsTabId,
  teamsTabId,
  participantInterventionsTabId,
  conversationsTabId,
  inboxSubTabId,
  archiveSubTabId,
} from 'models/User/RolesManager/defaultNavbarTabs';

import {
  ACC_TOOLBAR_CONSTRUCTOR_ARGS,
  ACC_TOOLBAR_ROOT_ID,
} from 'global/constants/accToolbar';

import { arraysOverlap } from 'utils/arrayUtils';

import { MODAL_PORTAL_ID, TOOLTIP_PORTAL_ID } from './constants';
import {
  shouldFetchSelfDetailsOnPath,
  shouldFetchSelfDetailsByUserRoles,
} from './utils';

export function App({ user, fetchSelfDetails }) {
  const { locale, formatMessage } = useIntl();
  const { pathname, search } = useLocation();
  useInjectSaga({ key: 'app', saga: rootSaga });
  useInjectSaga({ key: 'fetchSelfDetails', saga: fetchSelfDetailsSaga });

  useEffect(() => {
    if (
      user &&
      shouldFetchSelfDetailsOnPath(pathname) &&
      shouldFetchSelfDetailsByUserRoles(user.roles)
    ) {
      fetchSelfDetails();
    }
  }, []);

  const [shouldDisplayChatWidget, setShouldDisplayChatWidget] = useState(false);

  useEffect(() => {
    const isUserInterventionPage = matchPath(pathname, {
      path: RoutePath.USER_INTERVENTION,
      exact: true,
      strict: false,
    });

    const isUserAnswerSessionPage = matchPath(pathname, {
      path: RoutePath.ANSWER_SESSION,
      exact: true,
      strict: false,
    });

    setShouldDisplayChatWidget(
      !!isUserInterventionPage || !!isUserAnswerSessionPage,
    );
  }, [pathname]);

  const defaultSidebarId = useMemo(() => {
    if (!isEmpty(user?.roles)) {
      if (user.roles.includes(Roles.Participant))
        return participantInterventionsTabId;
      return interventionsTabId;
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute(
      INTERVENTION_LANGUAGE_QUERY_KEY,
      locale,
    );
    const accToolbarWidget = window.micAccessTool;
    if (accToolbarWidget) {
      document.getElementById(ACC_TOOLBAR_ROOT_ID).remove();
      accToolbarWidget.constructor(ACC_TOOLBAR_CONSTRUCTOR_ARGS);
    }
  }, [locale]);

  const renderDashboardByRole = () => {
    if (user) {
      if (arraysOverlap(user.roles, [Roles.Admin, Roles.Researcher]))
        return <InterventionPage />;
      if (
        arraysOverlap(user.roles, [
          Roles.Participant,
          Roles.PredefinedParticipant,
        ])
      )
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
      if (arraysOverlap(user.roles, [Roles.Navigator]))
        return <Redirect to={{ pathname: RoutePath.INBOX, search }} />;

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
    <RolesManagerContext.Provider value={{ userRoles: user?.roles || [] }}>
      <ApiQueryMessageHandler />
      <IdleTimer />

      <div id={MODAL_PORTAL_ID} />
      <div id={TOOLTIP_PORTAL_ID} />

      <Switch>
        <AppRoute
          exact
          path={RoutePath.DASHBOARD}
          render={() => renderDashboardByRole()}
          protectedRoute
          allowedRoles={AuthenticatedRoles}
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
          path={RoutePath.INBOX}
          component={InboxPage}
          protectedRoute
          allowedRoles={[Roles.Navigator]}
          navbarProps={{
            navbarId: NAVIGATION.DEFAULT,
          }}
          sidebarProps={{
            sidebarId: NAVIGATION.DEFAULT,
            activeTab: conversationsTabId,
            activeSubTab: inboxSubTabId,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.ARCHIVE}
          component={ArchivePage}
          protectedRoute
          allowedRoles={[Roles.Navigator]}
          navbarProps={{
            navbarId: NAVIGATION.DEFAULT,
          }}
          sidebarProps={{
            sidebarId: NAVIGATION.DEFAULT,
            activeTab: conversationsTabId,
            activeSubTab: archiveSubTabId,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.MANAGE_ORGANIZATIONS}
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
          path={RoutePath.DASHBOARD_SETUP}
          render={() => <ReportingDashboardPage view={VIEW.DASHBOARD_SETUP} />}
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
          path={RoutePath.DASHBOARD_VIEW}
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
          path={RoutePath.PARTICIPANT_REPORTS}
          component={ParticipantReportsPage}
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
        <AppRoute
          exact
          path={RoutePath.LOGIN}
          component={LoginPage}
          unauthorizedUsersOnly
        />
        <AppRoute
          exact
          path={RoutePath.REGISTER}
          component={RegisterPage}
          unauthorizedUsersOnly
        />
        <AppRoute
          exact
          path={RoutePath.RESET_PASSWORD}
          component={ResetPasswordPage}
          unauthorizedUsersOnly
        />
        <AppRoute
          exact
          path={RoutePath.SET_NEW_PASSWORD}
          component={SetNewPasswordPage}
          unauthorizedUsersOnly
        />
        <AppRoute exact path={RoutePath.LOGOUT} component={Logout} />
        <AppRoute
          exact
          path={RoutePath.EDIT_SESSION}
          component={EditSessionPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.ANSWER_SESSION}
          component={AnswerSessionPage}
          navbarProps={{
            navbarId: NAVIGATION.DEFAULT,
            activeTab: interventionsTabId,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.SESSION_SETTINGS}
          component={SettingsSessionPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.REPORT_TEMPLATES}
          component={ReportTemplatesPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.GENERATED_REPORTS}
          component={GeneratedReportsPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.TEXT_MESSAGES}
          component={TextMessagesPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.SESSION_MAP}
          component={SessionMapPage}
          protectedRoute
          allowedRoles={[Roles.Admin, Roles.Researcher]}
          navbarProps={{
            navbarId: NAVIGATION.SESSIONS,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.USER_INTERVENTION}
          component={UserInterventionPage}
          navbarProps={{
            navbarId: NAVIGATION.DEFAULT,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.INTERVENTION_INVITE}
          component={UserInterventionInvitePage}
        />
        <AppRoute
          exact
          path={RoutePath.USERS_LIST}
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
          path={RoutePath.TEAMS_LIST}
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
          path={RoutePath.TEAM_DETAILS}
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
          path={RoutePath.PREVIEW_SESSION_FROM_CURRENT}
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
          path={RoutePath.PREVIEW_SESSION_FROM_INDEX}
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
          path={RoutePath.INTERVENTION_DETAILS}
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
          path={RoutePath.ACCOUNT_SETTINGS}
          component={AccountSettings}
          protectedRoute
          allowedRoles={PasswordAuthenticatedRoles}
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
          path={RoutePath.USER_DETAILS}
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
          path={RoutePath.ADMIN_CONSOLE}
          component={SuperadminConsolePage}
          allowedRoles={[Roles.Admin]}
          navbarProps={{
            navbarId: NAVIGATION.DEFAULT,
            activeTab: null,
          }}
        />
        <AppRoute
          exact
          path={RoutePath.ACCESSIBILITY_STATEMENT}
          component={AccessibilityStatementPage}
        />
        <AppRoute exact path={RoutePath.FORBIDDEN} component={ForbiddenPage} />
        <AppRoute
          exact
          path={RoutePath.VERIFY_SHORT_LINK}
          component={VerifyShortLinkPage}
        />
        <AppRoute
          exact
          path={RoutePath.VERIFY_SMS_LINK}
          component={VerifySmsLinkPage}
        />
        <AppRoute
          exact
          path={RoutePath.USER_SMS_LINK}
          component={UserSmsLinkPage}
        />
        <AppRoute
          exact
          path={RoutePath.VERIFY_USER_KEY}
          component={VerifyUserKeyPage}
        />
        <AppRoute exact path={RoutePath.NOT_FOUND} component={NotFoundPage} />
        <AppRoute
          exact
          path={RoutePath.INTERVENTION_NOT_AVAILABLE}
          component={InterventionNotAvailablePage}
        />
        <AppRoute path={WILDCARD_PATH}>
          <Redirect to={RoutePath.NOT_FOUND} />
        </AppRoute>
      </Switch>
      <GlobalStyle />
      {shouldDisplayChatWidget && <ChatWidget />}
      <NavigatorAvailabilityModal />
    </RolesManagerContext.Provider>
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
