import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';

import { RoutePath } from 'global/constants';

export const navbarElements = [
  {
    url: RoutePath.ACCOUNT_SETTINGS,
    icon: gear,
    messagesKey: 'editAccount',
  },
  {
    url: RoutePath.LOGOUT,
    icon: logoutArrow,
    messagesKey: 'logOut',
  },
];
