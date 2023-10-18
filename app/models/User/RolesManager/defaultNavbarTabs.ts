import folder from 'assets/svg/folder.svg';
import peopleHR from 'assets/svg/peopleHR.svg';
import peopleHRCircle from 'assets/svg/peopleHRCircle.svg';
import fileBarChart from 'assets/svg/file-bar-chart.svg';

import { RoutePath } from 'global/constants';

import { Roles } from './UserRoles';
import { navbarNames } from './navbarNames';

export type NavbarSubTab = {
  id: string;
  path: string;
  message: JSX.Element;
};

export type NavbarTab = {
  id: string;
  path: string;
  icon: SVGElement;
  message: JSX.Element;
  subTabs?: NavbarSubTab[];
};

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const teamsTabId = 'teams';
export const myTeamTabId = 'myTeam';
export const participantInterventionsTabId = 'participantInterventions';
export const participantReportsTabId = 'reports';
export const conversationsTabId = 'chat';
export const inboxSubTabId = 'chat-inbox';
export const archiveSubTabId = 'chat-archive';

const interventionsTab = (
  message: JSX.Element,
  icon: SVGElement,
): NavbarTab => ({
  id: interventionsTabId,
  path: RoutePath.DASHBOARD,
  message,
  icon,
});

const accountsTab = (message: JSX.Element, icon: SVGElement): NavbarTab => ({
  id: accountsTabId,
  path: RoutePath.USERS_LIST,
  message,
  icon,
});

const teamsTab = (message: JSX.Element, icon: SVGElement): NavbarTab => ({
  id: teamsTabId,
  path: RoutePath.TEAMS_LIST,
  message,
  icon,
});

const participantInterventionsTab = (
  message: JSX.Element,
  icon: SVGElement,
): NavbarTab => ({
  id: participantInterventionsTabId,
  path: RoutePath.DASHBOARD,
  message,
  icon,
});

const participantReportsTab = (
  message: JSX.Element,
  icon: SVGElement,
): NavbarTab => ({
  id: participantReportsTabId,
  path: RoutePath.PARTICIPANT_REPORTS,
  message,
  icon,
});

const conversationsTab = (
  message: JSX.Element,
  icon: SVGElement,
): NavbarTab => ({
  id: conversationsTabId,
  path: RoutePath.INBOX,
  message,
  icon,
  subTabs: [
    {
      id: inboxSubTabId,
      path: RoutePath.INBOX,
      message: navbarNames.inbox,
    },
    {
      id: archiveSubTabId,
      path: RoutePath.ARCHIVE,
      message: navbarNames.archive,
    },
  ],
});

const navigationTabs: Record<Roles, NavbarTab[]> = {
  [Roles.Admin]: [
    interventionsTab(navbarNames.adminInterventions, folder),
    accountsTab(navbarNames.adminAccounts, peopleHR),
    teamsTab(navbarNames.adminTeams, peopleHRCircle),
  ],
  [Roles.TeamAdmin]: [teamsTab(navbarNames.adminTeams, peopleHRCircle)],
  [Roles.Researcher]: [
    interventionsTab(navbarNames.researcherInterventions, folder),
    accountsTab(navbarNames.researcherAccounts, peopleHR),
  ],
  [Roles.EInterventionAdmin]: [],
  [Roles.OrganizationAdmin]: [],
  [Roles.HealthSystemAdmin]: [],
  [Roles.ClinicAdmin]: [],
  [Roles.Participant]: [
    participantInterventionsTab(navbarNames.participantInterventions, folder),
    participantReportsTab(navbarNames.participantReports, fileBarChart),
  ],
  [Roles.ThirdParty]: [],
  [Roles.Guest]: [],
  [Roles.PredefinedParticipant]: [],
  [Roles.Navigator]: [conversationsTab(navbarNames.conversations, folder)],
};

export default navigationTabs;
