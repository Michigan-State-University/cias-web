import { defineMessages } from 'react-intl';

import { Roles } from 'models/User/RolesManager';

export const scope = 'app.global.Roles';

export default defineMessages<Roles>({
  [Roles.Admin]: {
    id: `${scope}.admin`,
    defaultMessage: 'Admin',
  },
  [Roles.TeamAdmin]: {
    id: `${scope}.team_admin`,
    defaultMessage: 'Team Admin',
  },
  [Roles.Participant]: {
    id: `${scope}.participant`,
    defaultMessage: 'Participant',
  },
  [Roles.Researcher]: {
    id: `${scope}.researcher`,
    defaultMessage: 'Researcher',
  },
  [Roles.Guest]: {
    id: `${scope}.guest`,
    defaultMessage: 'Guest',
  },
  [Roles.ThirdParty]: {
    id: `${scope}.third_party`,
    defaultMessage: 'Third Party',
  },
  [Roles.EInterventionAdmin]: {
    id: `${scope}.e_intervention_admin`,
    defaultMessage: 'E-Intervention Admin',
  },
  [Roles.Navigator]: {
    id: `${scope}.navigator`,
    defaultMessage: 'Navigator',
  },
  [Roles.ClinicAdmin]: {
    id: `${scope}.health_clinic_admin`,
    defaultMessage: 'Clinic Admin',
  },
  [Roles.HealthSystemAdmin]: {
    id: `${scope}.health_system_admin`,
    defaultMessage: 'Health System Admin',
  },
  [Roles.OrganizationAdmin]: {
    id: `${scope}.organization_admin`,
    defaultMessage: 'Organization Admin',
  },
  [Roles.PredefinedParticipant]: {
    id: `${scope}.predefined_participant`,
    defaultMessage: 'Predefined Participant',
  },
});
