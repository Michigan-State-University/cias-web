import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';

import { colors } from 'theme';

import DashedCircleIcon from 'assets/svg/circle-dashed.svg';

import { Col, Row } from 'components/ReactGridSystem';
import EllipsisText from 'components/Text/EllipsisText';
import UserAvatar from 'components/UserAvatar';
import Icon from 'components/Icon';

import { UserRow } from '../../../styled';

const UserItem = ({ avatarColor, user, onClick }) => {
  const { active, avatar, email, firstName, fullName, lastName } = user;

  const wrapper = useCallback(
    component => (
      <Row>
        <Col>
          <UserRow active={active} align="center" onClick={onClick}>
            {component}
          </UserRow>
        </Col>
      </Row>
    ),
    [],
  );

  const fullNameString = fullName || `${firstName} ${lastName}`;

  if (active)
    return wrapper(
      <>
        <UserAvatar
          avatar={avatar}
          backgroundColor={avatarColor}
          firstName={firstName}
          height={30}
          lastName={lastName}
          mr={10}
          width={30}
        />
        <EllipsisText
          fontWeight="bold"
          maxWidth="200px"
          text={fullNameString.trim() || email}
        />
      </>,
    );

  return wrapper(
    <>
      <Icon src={DashedCircleIcon} mr={10} />
      <EllipsisText
        color={colors.grey}
        fontWeight="bold"
        maxWidth="200px"
        text={email}
      />
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
  onClick: PropTypes.func,
};

export default memo(UserItem);
