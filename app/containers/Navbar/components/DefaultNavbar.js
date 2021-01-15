import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import logo from 'assets/svg/logo.svg';
import hamburger from 'assets/svg/hamburger.svg';

import Img from 'components/Img';
import Text from 'components/Text';
import { MSULogo } from 'components/Logo';
import Row from 'components/Row';
import Icon from 'components/Icon';

import useOutsideClick from 'utils/useOutsideClick';
import navbarTabs from 'utils/defaultNavbarTabs';
import { useWindowSize } from 'utils/useWindowSize';

import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import { NavbarTabLink, MenuContent, StyledLogos } from './styled';
import messages from './messages';

const renderNavbarTab = (activeTab, role) => tabData => {
  const { message, id, path } = tabData;
  if (!path)
    return (
      <Text key={`${role}-${id}`} fontSize={23}>
        {message}
      </Text>
    );
  return (
    <NavbarTabLink
      ml={10}
      key={`${role}-${id}`}
      active={id === activeTab ? 1 : undefined}
      to={id === activeTab ? '#' : path}
      className="navbar-tabs"
    >
      <Text fontSize={15}>{message}</Text>
    </NavbarTabLink>
  );
};

const renderHamburger = (
  dropdownRef,
  menuVisible,
  setMenuVisible,
  activeTab,
  userRole,
) => (
  <Row
    width="100%"
    justify="center"
    align="center"
    onClick={() => setMenuVisible(!menuVisible)}
    minWidth={100}
  >
    <Text fontSize={18} fontWeight="bold">
      <Icon stroke="blue" mr={5} height={17} src={hamburger} />
      <FormattedMessage {...messages.menu} />
    </Text>
    <div ref={dropdownRef}>
      <MenuContent menuVisible={menuVisible}>
        {navbarTabs[userRole].map(renderNavbarTab(activeTab, userRole))}
      </MenuContent>
    </div>
  </Row>
);

const DefaultNavbar = ({ activeTab, userRole }) => {
  const { width } = useWindowSize();
  const dropdownRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);

  const renderMenu = () => {
    if (width > containerBreakpoints.sm)
      return navbarTabs[userRole].map(renderNavbarTab(activeTab, userRole));

    return renderHamburger(
      dropdownRef,
      menuVisible,
      setMenuVisible,
      activeTab,
      userRole,
    );
  };
  return (
    <Row width="100%" justify="center">
      <StyledLogos>
        <Link to="/">
          <Img alt="logo" src={logo} maxHeight={51} mr={15} />
        </Link>
        <MSULogo maxHeight={51} ml={10} />
      </StyledLogos>
      <Row width="100%" justify="center" align="center">
        {renderMenu()}
      </Row>
    </Row>
  );
};

DefaultNavbar.propTypes = {
  activeTab: PropTypes.string,
  userRole: PropTypes.string,
};

export default DefaultNavbar;
