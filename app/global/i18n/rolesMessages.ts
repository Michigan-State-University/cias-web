import { defineMessages } from 'react-intl';

import { Roles } from 'models/User/RolesManager';

export const scope = 'app.roles';

export default defineMessages({
  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'Admin',
  },
  team_admin: {
    id: `${scope}.team_admin`,
    defaultMessage: 'Team Admin',
  },
  participant: {
    id: `${scope}.participant`,
    defaultMessage: 'Participant',
  },
  researcher: {
    id: `${scope}.researcher`,
    defaultMessage: 'Researcher',
  },
  guest: {
    id: `${scope}.${Roles.Guest}`,
    defaultMessage: 'Guest',
  },
  [Roles.ThirdParty]: {
    id: `${scope}.${Roles.ThirdParty}`,
    defaultMessage: 'Third Party',
  },
  [Roles.EInterventionAdmin]: {
    id: `${scope}.${Roles.EInterventionAdmin}`,
    defaultMessage: 'E-Intervention Admin',
  },
  [Roles.Navigator]: {
    id: `${scope}.${Roles.Navigator}`,
    defaultMessage: 'Navigator',
  },
  [Roles.ClinicAdmin]: {
    id: `${scope}.${Roles.ClinicAdmin}`,
    defaultMessage: 'Clinic Admin',
  },
  [Roles.HealthSystemAdmin]: {
    id: `${scope}.${Roles.HealthSystemAdmin}`,
    defaultMessage: 'Health System Admin',
  },
  [Roles.OrganizationAdmin]: {
    id: `${scope}.${Roles.OrganizationAdmin}`,
    defaultMessage: 'Organization Admin',
  },
  [Roles.PredefinedParticipant]: {
    id: `${scope}.${Roles.PredefinedParticipant}`,
    defaultMessage: 'Predefined Participant',
  },
});
