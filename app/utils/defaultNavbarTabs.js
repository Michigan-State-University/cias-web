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

const navbarTabs = {
  [Roles.admin]: [
    interventionsTab(navbarNames.adminInterventions),
    accountsTab(navbarNames.adminAccounts),
    teamsTab(navbarNames.adminTeams),
  ],
  [Roles.teamAdmin]: [
    interventionsTab(navbarNames.adminInterventions),
    teamsTab(navbarNames.adminTeams),
  ],
  [Roles.researcher]: [
    interventionsTab(navbarNames.researcherInterventions),
    accountsTab(navbarNames.researcherAccounts),
  ],
  [Roles.eInterventionAdmin]: [
    interventionsTab(navbarNames.researcherInterventions),
    accountsTab(navbarNames.researcherAccounts),
  ],
  [Roles.organizationAdmin]: [],
  [Roles.healthSystemAdmin]: [],
  [Roles.clinicAdmin]: [],
  [Roles.participant]: [],
  [Roles.thirdParty]: [],
  [Roles.guest]: [
    {
      message: navbarNames.guestInterventions,
    },
  ],
};

export default navbarTabs;
