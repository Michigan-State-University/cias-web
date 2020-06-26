/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import UserAvatar from 'components/UserAvatar';
import { NavbarStyled, RightPanel } from './styled';

function Navbar({ user: { firstName, lastName }, logOut }) {
  return (
    <NavbarStyled>
      <RightPanel>
        <UserAvatar lastName={lastName} firstName={firstName} logOut={logOut} />
        {`${firstName} ${lastName}`}
      </RightPanel>
    </NavbarStyled>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func,
};

export default memo(Navbar);
