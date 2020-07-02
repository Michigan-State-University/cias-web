/**
 *
 * Navbar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserAvatar from 'components/UserAvatar';

import { logOut, makeSelectUser } from 'global/reducers/auth';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
} from './styled';
import messages from './messages';
import InterventionsNavbar from './components/InterventionsNavbar';

const renderNavbar = path => {
  if (path.includes('/interventions'))
    return <InterventionsNavbar path={path} />;
};
function Navbar({ user: { firstName, lastName }, logOut: logOutCall, path }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <NavbarStyled>
      {renderNavbar(path)}
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
  path: PropTypes.string,
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
