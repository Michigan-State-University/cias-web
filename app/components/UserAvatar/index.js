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

function UserAvatar({
  avatar,
  firstName,
  lastName,
  backgroundColor,
  ...styleProps
}) {
  if (avatar)
    return <Img src={avatar} alt="avatar" {...styleProps} borderRadius="50%" />;

  const nameShort = `${firstName?.trim()[0] || ''}${lastName?.trim()[0] ||
    ''}`.toUpperCase();
  return (
    <AvatarStyled
      data-private
      color={colors.white}
      backgroundColor={backgroundColor}
      {...styleProps}
    >
      <div>{nameShort || '?'}</div>
    </AvatarStyled>
  );
}

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  backgroundColor: PropTypes.string,
};

UserAvatar.defaultProps = {
  backgroundColor: colors.surfieGreen,
};

export default memo(UserAvatar);
