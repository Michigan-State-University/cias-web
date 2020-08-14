import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import H3 from 'components/H3';
import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes } from 'theme';

import messages from '../messages';
import { StyledTextButton, HoverableRow } from '../styled';

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

const UserList = ({ users = mockUsers }) => (
  <Column>
    <H3
      mb={15}
      fontSize={13}
      fontWeight="bold"
      color={colors.bluewood}
      textOpacity={0.6}
    >
      <FormattedMessage {...messages.userListLabel} />
    </H3>
    {users.map(user => (
      <HoverableRow
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
        <StyledTextButton fontWeight="bold">
          <FormattedMessage {...messages.resend} />
        </StyledTextButton>
      </HoverableRow>
    ))}
  </Column>
);

UserList.propTypes = {
  users: PropTypes.array,
};
export default UserList;
