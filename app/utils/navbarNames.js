import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const scope = 'app.navbarNames';

const navbarMessages = defineMessages({
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  userList: {
    id: `${scope}.userList`,
    defaultMessage: 'User list',
  },
});

const navbarNames = {
  preview: <FormattedMessage {...navbarMessages.preview} />,
  userList: <FormattedMessage {...navbarMessages.userList} />,
};

export default navbarNames;
