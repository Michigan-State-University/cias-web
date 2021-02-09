import { Roles } from 'models/User/UserRoles';
import navbarNames from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const teamsTabId = 'teams';
export const myTeamTabId = 'myTeam';
export const participantDashboardTabId = interventionsTabId;
export const participantReportsTabId = 'reports';

const interventionsTab = message => ({
  id: interventionsTabId,
  path: '/',
  message,
});

const accountsTab = message => ({
  id: accountsTabId,
  path: '/users',
  message,
});

const teamsTab = message => ({
  id: teamsTabId,
  path: '/teams',
  message,
});

const myTeamTab = message => ({
  id: myTeamTabId,
  path: '/my-team',
  message,
});

const participantDashboardTab = message => ({
  id: interventionsTabId,
  path: '/',
  message,
});

const participantReportsTab = message => ({
  id: participantReportsTabId,
  path: '/reports',
  message,
});

const navbarTabs = {
  [Roles.admin]: [
    interventionsTab(navbarNames.adminInterventions),
    accountsTab(navbarNames.adminAccounts),
    teamsTab(navbarNames.adminTeams),
  ],
  [Roles.teamAdmin]: [
    interventionsTab(navbarNames.adminInterventions),
    myTeamTab(navbarNames.teamAdminTeam),
  ],
  [Roles.researcher]: [
    interventionsTab(navbarNames.researcherInterventions),
    accountsTab(navbarNames.researcherAccounts),
  ],
  [Roles.participant]: [
    participantDashboardTab(navbarNames.participantInterventions),
    participantReportsTab(navbarNames.participantReports),
  ],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navbarTabs;
