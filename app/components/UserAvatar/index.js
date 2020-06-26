/**
 *
 * UserAvatar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AvatarStyled, DropDownContent } from './styled';
import messages from './messages';
// import styled from 'styled-components';

function UserAvatar({ firstName, lastName, logOut }) {
  const nameShort = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <AvatarStyled onClick={() => setMenuVisible(!menuVisible)}>
      <div>{nameShort}</div>
      {menuVisible && (
        <DropDownContent>
          <div onClick={() => {}}>
            <FormattedMessage {...messages.editAccount} />
          </div>
          <div onClick={logOut}>
            <FormattedMessage {...messages.logOut} />
          </div>
        </DropDownContent>
      )}
    </AvatarStyled>
  );
}

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  logOut: PropTypes.func,
};

export default memo(UserAvatar);
