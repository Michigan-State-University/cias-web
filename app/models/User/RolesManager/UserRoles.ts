export enum Roles {
  Admin = 'admin',
  TeamAdmin = 'team_admin',
  Participant = 'participant',
  Researcher = 'researcher',
  Guest = 'guest',
  ThirdParty = 'third_party',
  OrganizationAdmin = 'organization_admin',
  EInterventionAdmin = 'e_intervention_admin',
  HealthSystemAdmin = 'health_system_admin',
  ClinicAdmin = 'health_clinic_admin',
  Navigator = 'navigator',
  PredefinedParticipant = 'predefined_participant',
}

export const AllRoles = [
  Roles.Admin,
  Roles.Researcher,
  Roles.Participant,
  Roles.TeamAdmin,
  Roles.ThirdParty,
  Roles.EInterventionAdmin,
  Roles.OrganizationAdmin,
  Roles.HealthSystemAdmin,
  Roles.ClinicAdmin,
  Roles.Navigator,
];
