import { defineMessages } from 'react-intl';

export const scope = 'app.global.Roles';

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
    id: `${scope}.guest`,
    defaultMessage: 'Guest',
  },
  third_party: {
    id: `${scope}.third_party`,
    defaultMessage: 'Third Party',
  },
  e_intervention_admin: {
    id: `${scope}.e_intervention_admin`,
    defaultMessage: 'E-Intervention Admin',
  },
  navigator: {
    id: `${scope}.navigator`,
    defaultMessage: 'Navigator',
  },
  health_clinic_admin: {
    id: `${scope}.health_clinic_admin`,
    defaultMessage: 'Clinic Admin',
  },
  health_system_admin: {
    id: `${scope}.health_system_admin`,
    defaultMessage: 'Health System Admin',
  },
  organization_admin: {
    id: `${scope}.organization_admin`,
    defaultMessage: 'Organization Admin',
  },
  predefined_participant: {
    id: `${scope}.predefined_participant`,
    defaultMessage: 'Predefined Participant',
  },
});
