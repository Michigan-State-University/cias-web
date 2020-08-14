import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Column from 'components/Column';
import Dropdown from 'components/Dropdown';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import bin from 'assets/svg/bin-no-bg.svg';
import paperAirplane from 'assets/svg/paper-airplane.svg';
import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes } from 'theme';

import messages from '../messages';

const mockUsers = [
  {
    avatar: userAvatar,
    email: 'mock@mock.pl',
    id: 1,
  },
  {
    avatar: userAvatar,
    email: 'mock@mock.pl',
    id: 2,
  },
  {
    avatar: userAvatar,
    email: 'mock@mock.pl',
    id: 3,
  },
  {
    avatar: userAvatar,
    email: 'mock@mock.pl',
    id: 4,
  },
];

const UserList = ({ users = mockUsers, intl: { formatMessage } }) => {
  const options = [
    {
      id: 'remove',
      label: formatMessage(messages.remove),
      icon: bin,
      action: () => {},
      color: colors.bluewood,
    },
    {
      id: 'resend',
      label: formatMessage(messages.resend),
      icon: paperAirplane,
      action: () => {},
      color: colors.bluewood,
    },
  ];

  return (
    <Column>
      {users.map(user => (
        <Row
          key={`el-user-${user.id}`}
          align="center"
          justify="between"
          mx={-20}
          px={20}
          py={10}
          borderRadius={5}
          hoverColor={colors.linkWater}
        >
          <Row>
            <Img src={user.avatar} alt="avatar" mr={15} />
            <Text fontSize={fontSizes.regular} lineHeight="270%">
              {user.email}
            </Text>
          </Row>
          <Dropdown options={options} clickable ml={0} />
        </Row>
      ))}
    </Column>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  intl: intlShape,
};
export default injectIntl(UserList);
