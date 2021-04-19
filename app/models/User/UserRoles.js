import { colors } from 'theme';

export const Roles = {
  admin: 'admin',
  teamAdmin: 'team_admin',
  participant: 'participant',
  researcher: 'researcher',
  guest: 'guest',
  thirdParty: 'third_party',
  organizationAdmin: 'organization_admin',
  eInterventionAdmin: 'e_intervention_admin',
  allRoles: [
    'admin',
    'team_admin',
    'participant',
    'researcher',
    'third_party',
    'organization_admin',
    'e_intervention_admin',
  ],
};

export const ResearcherRoles = [Roles.eInterventionAdmin, Roles.researcher];

export const RolesColors = {
  [Roles.participant]: colors.jungleGreenLighter,
  [Roles.researcher]: colors.pink,
  [Roles.admin]: colors.buddhaGold,
  [Roles.teamAdmin]: colors.navyBlue,
  [Roles.guest]: colors.azure,
  [Roles.thirdParty]: colors.olive,
  [Roles.organizationAdmin]: colors.mystic,
  [Roles.eInterventionAdmin]: colors.vividPink,
};
