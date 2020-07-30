import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';
import users from 'assets/svg/users.svg';

const sharedNavbarElements = [
  {
    url: '/#',
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
  admin: [
    {
      url: '/users',
      icon: users,
      messagesKey: 'users',
    },
    ...sharedNavbarElements,
  ],
  researcher: [...sharedNavbarElements],
  participant: [...sharedNavbarElements],
};
