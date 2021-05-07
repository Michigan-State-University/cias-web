import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';

import { colors } from 'theme';

import DashedCircleIcon from 'assets/svg/circle-dashed.svg';

import { Col, Row, NoMarginRow } from 'components/ReactGridSystem';
import Text from 'components/Text';
import UserAvatar from 'components/UserAvatar';
import Icon from 'components/Icon';

const UserItem = ({ avatarColor, user }) => {
  const { active, avatar, email, firstName, fullName, lastName } = user;

  const wrapper = useCallback(
    component => (
      <Row>
        <Col>
          <NoMarginRow align="center">{component}</NoMarginRow>
        </Col>
      </Row>
    ),
    [],
  );

  if (active)
    return wrapper(
      <>
        <UserAvatar
          mr={10}
          width={30}
          height={30}
          avatar={avatar}
          lastName={lastName}
          firstName={firstName}
          backgroundColor={avatarColor}
        />
        <Text fontWeight="bold">{fullName.trim() || email}</Text>
      </>,
    );

  return wrapper(
    <>
      <Icon src={DashedCircleIcon} mr={10} />
      <Text fontWeight="bold" color={colors.grey}>
        {email}
      </Text>
    </>,
  );
};

UserItem.propTypes = {
  avatarColor: PropTypes.string,
  user: PropTypes.shape({
    active: PropTypes.bool,
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    fullName: PropTypes.string,
  }),
};

export default memo(UserItem);
