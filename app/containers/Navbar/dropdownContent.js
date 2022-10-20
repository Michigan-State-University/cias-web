import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';

export const navbarElements = [
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
