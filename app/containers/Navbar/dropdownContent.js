import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';

import { Roles } from 'models/User/RolesManager';

import { RoutePath } from 'global/constants';

export const getUserNavbarElements = (roles) => [
  ...(roles.includes(Roles.PredefinedParticipant)
    ? []
    : [
        {
          url: RoutePath.ACCOUNT_SETTINGS,
          icon: gear,
          messagesKey: 'editAccount',
        },
      ]),
  {
    url: RoutePath.LOGOUT,
    icon: logoutArrow,
    messagesKey: 'logOut',
  },
];
