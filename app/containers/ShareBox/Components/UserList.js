import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import H3 from 'components/H3';
import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes } from 'theme';

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

const UserList = ({
  users = mockUsers,
  headerText,
  buttonIsClose,
  buttonText,
}) => {
  const button = (
    <StyledTextButton fontWeight="bold" ml={buttonIsClose ? 15 : null}>
      {buttonText}
    </StyledTextButton>
  );
  return (
    <Column>
      {headerText && (
        <H3
          mb={15}
          fontSize={13}
          fontWeight="bold"
          color={colors.bluewood}
          textOpacity={0.6}
        >
          {headerText}
        </H3>
      )}
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
          <Row align="center">
            <Img src={user.avatar} alt="avatar" mr={15} />
            <Text fontSize={fontSizes.regular} lineHeight="270%">
              {user.email}
            </Text>
            {buttonIsClose && button}
          </Row>
          {!buttonIsClose && button}
        </HoverableRow>
      ))}
    </Column>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  headerText: PropTypes.node,
  buttonIsClose: PropTypes.bool,
  buttonText: PropTypes.node,
};

UserList.defaultProps = {
  buttonIsClose: false,
};

export default UserList;
