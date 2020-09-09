/**
 *
 * UserAvatar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import { colors } from 'theme/colors';

import { AvatarStyled } from './styled';

function UserAvatar({ avatar, firstName, lastName, ...styleProps }) {
  if (avatar) return <Img src={avatar} alt="avatar" {...styleProps} />;

  const nameShort = `${firstName.trim()[0]}${lastName.trim()[0]}`.toUpperCase();
  return (
    <AvatarStyled color={colors.white} {...styleProps}>
      <div>{nameShort}</div>
    </AvatarStyled>
  );
}

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
};

export default memo(UserAvatar);
