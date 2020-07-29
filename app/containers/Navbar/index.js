/**
 *
 * Navbar
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import UserAvatar from 'components/UserAvatar';
import Row from 'components/Row';
import Img from 'components/Img';
import Box from 'components/Box';
import Text from 'components/Text';
import CloseIcon from 'components/CloseIcon';

import gear from 'assets/svg/gear-wo-background.svg';
import logoutArrow from 'assets/svg/arrow-right-circle.svg';
import users from 'assets/svg/users.svg';

import { outsideClickHandler } from 'utils/outsideClickHandler';
import { logOut, makeSelectUser } from 'global/reducers/auth';
import InterventionsNavbar from './components/InterventionsNavbar';

import {
  NavbarStyled,
  RightPanel,
  DropDownContainer,
  DropDownContent,
} from './styled';
import messages from './messages';

const renderNavbar = path => {
  if (
    path &&
    path.includes('/interventions') &&
    (path.includes('/edit') || path.includes('/settings'))
  )
    return <InterventionsNavbar path={path} />;
  return null;
};
export function Navbar({
  user: { firstName, lastName },
  logOut: logOutCall,
  path,
  returnToHomePage,
  navbarName,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (menuVisible) {
      const cleanUp = outsideClickHandler(dropdownRef, () =>
        setMenuVisible(false),
      );

      return cleanUp;
    }
  }, [menuVisible]);

  return (
    <NavbarStyled>
      {returnToHomePage && <CloseIcon to="/" />}
      {navbarName && (
        <Text color="black" fontSize={23}>
          {navbarName}
        </Text>
      )}
      {renderNavbar(path)}
      <RightPanel onClick={() => !menuVisible && setMenuVisible(true)}>
        <DropDownContainer>
          <UserAvatar lastName={lastName} firstName={firstName} />
          {menuVisible && (
            <DropDownContent ref={dropdownRef}>
              <div>
                <Link to="/users">
                  <Row>
                    <Img mr={13} src={users} />
                    <FormattedMessage {...messages.users} />
                  </Row>
                </Link>
              </div>
              <div
                onClick={event => {
                  event.stopPropagation();
                  setMenuVisible(false);
                }}
              >
                <Row>
                  <Img mr={13} src={gear} />
                  <FormattedMessage {...messages.editAccount} />
                </Row>
              </div>
              <div
                onClick={event => {
                  event.stopPropagation();
                  setMenuVisible(false);
                  logOutCall();
                }}
              >
                <Row>
                  <Img mr={13} src={logoutArrow} />
                  <FormattedMessage {...messages.logOut} />
                </Row>
              </div>
            </DropDownContent>
          )}
        </DropDownContainer>
        <Box clickable>{`${firstName} ${lastName}`}</Box>
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
  path: PropTypes.string.isRequired,
  returnToHomePage: PropTypes.bool,
  navbarName: PropTypes.string,
};

Navbar.defaultProps = {
  returnToHomePage: false,
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
