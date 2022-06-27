import folder from 'assets/svg/folder.svg';
import peopleHR from 'assets/svg/peopleHR.svg';
import peopleHRCircle from 'assets/svg/peopleHRCircle.svg';
import fileBarChart from 'assets/svg/file-bar-chart.svg';
import { Roles } from './UserRoles';

import { navbarNames } from './navbarNames';

export const interventionsTabId = 'sessions';
export const accountsTabId = 'accounts';
export const teamsTabId = 'teams';
export const myTeamTabId = 'myTeam';
export const participantInterventionsTabId = 'participantInterventions';
export const participantReportsTabId = 'reports';
export const conversationsTabId = 'chat';

const interventionsTab = (message: JSX.Element, icon: SVGElement) => ({
  id: interventionsTabId,
  path: '/',
  message,
  icon,
});

const accountsTab = (message: JSX.Element, icon: SVGElement) => ({
  id: accountsTabId,
  path: '/users',
  message,
  icon,
});

const teamsTab = (message: JSX.Element, icon: SVGElement) => ({
  id: teamsTabId,
  path: '/teams',
  message,
  icon,
});

const participantInterventionsTab = (
  message: JSX.Element,
  icon: SVGElement,
) => ({
  id: participantInterventionsTabId,
  path: '/',
  message,
  icon,
});

const participantReportsTab = (message: JSX.Element, icon: SVGElement) => ({
  id: participantReportsTabId,
  path: '/reports',
  message,
  icon,
});

const conversationsTab = (message: JSX.Element, icon: SVGElement) => ({
  id: conversationsTabId,
  path: '/live-chat',
  message,
  icon,
});

const navigationTabs: {
  [key in Roles]: {
    id: string;
    path: string;
    icon: SVGElement;
    message: JSX.Element;
  }[];
} = {
  [Roles.Admin]: [
    interventionsTab(navbarNames.adminInterventions, folder),
    accountsTab(navbarNames.adminAccounts, peopleHR),
    teamsTab(navbarNames.adminTeams, peopleHRCircle),
    conversationsTab(navbarNames.conversations, folder),
  ],
  [Roles.TeamAdmin]: [teamsTab(navbarNames.adminTeams, peopleHRCircle)],
  [Roles.Researcher]: [
    interventionsTab(navbarNames.researcherInterventions, folder),
    accountsTab(navbarNames.researcherAccounts, peopleHR),
    conversationsTab(navbarNames.conversations, folder),
  ],
  [Roles.EInterventionAdmin]: [],
  [Roles.OrganizationAdmin]: [],
  [Roles.HealthSystemAdmin]: [],
  [Roles.ClinicAdmin]: [],
  [Roles.Participant]: [
    participantInterventionsTab(navbarNames.participantInterventions, folder),
    participantReportsTab(navbarNames.participantReports, fileBarChart),
    conversationsTab(navbarNames.conversations, folder),
  ],
  [Roles.ThirdParty]: [],
  [Roles.Guest]: [],
  [Roles.Navigator]: [conversationsTab(navbarNames.conversations, folder)],
};

export default navigationTabs;
