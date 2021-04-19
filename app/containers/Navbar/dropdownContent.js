import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';
import { Roles } from 'models/User/UserRoles';

const sharedNavbarElements = [
  {
    url: '/profile',
    icon: gear,
    messagesKey: 'editAccount',
  },
  {
    url: '/logout',
    icon: logoutArrow,
    messagesKey: 'logOut',
  },
];

export default {
  [Roles.admin]: [...sharedNavbarElements],
  [Roles.teamAdmin]: [...sharedNavbarElements],
  [Roles.researcher]: [...sharedNavbarElements],
  [Roles.eInterventionAdmin]: [...sharedNavbarElements],
  [Roles.organizationAdmin]: [...sharedNavbarElements],
  [Roles.participant]: [...sharedNavbarElements],
  [Roles.thirdParty]: [...sharedNavbarElements],
  [Roles.clinicAdmin]: [...sharedNavbarElements],
  [Roles.healthSystemAdmin]: [...sharedNavbarElements],
};
