/**
 *
 * Navbar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import UserAvatar from 'components/UserAvatar';
import { logOut, makeSelectUser } from 'global/reducers/auth';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
} from './styled';
import messages from './messages';

export function Navbar({ user: { firstName, lastName }, logOut: logOutCall }) {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <NavbarStyled>
      <RightPanel>
        <DropDownContainer onClick={() => setMenuVisible(!menuVisible)}>
          <UserAvatar lastName={lastName} firstName={firstName} />
          {menuVisible && (
            <DropDownContent>
              <div onClick={() => {}}>
                <FormattedMessage {...messages.editAccount} />
              </div>
              <div onClick={logOutCall}>
                <FormattedMessage {...messages.logOut} />
              </div>
            </DropDownContent>
          )}
        </DropDownContainer>
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

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  logOut,
};

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navbar),
);
