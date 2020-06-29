/**
 *
 * UserAvatar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { AvatarStyled } from './styled';

function UserAvatar({ firstName, lastName }) {
  const nameShort = `${firstName[0]}${lastName[0]}`.toUpperCase();
  return (
    <AvatarStyled>
      <div>{nameShort}</div>
    </AvatarStyled>
  );
}

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default memo(UserAvatar);
