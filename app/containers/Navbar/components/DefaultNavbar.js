import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from 'assets/svg/logo.svg';

import Img from 'components/Img';
import Text from 'components/Text';
import { MSULogo } from 'components/Logo';
import Row from 'components/Row';

import navbarTabs from 'utils/defaultNavbarTabs';
import { NavbarTabLink } from './styled';

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
    >
      <Text fontSize={15}>{message}</Text>
    </NavbarTabLink>
  );
};

const DefaultNavbar = ({ activeTab, userRole }) => (
  <Fragment>
    <Link to="/">
      <Img alt="logo" src={logo} height={51} width={56} mr={15} />
    </Link>
    <MSULogo ml={30} />
    <Row width="100%" justify="center">
      {navbarTabs[userRole].map(renderNavbarTab(activeTab, userRole))}
    </Row>
  </Fragment>
);

DefaultNavbar.propTypes = {
  activeTab: PropTypes.string,
  userRole: PropTypes.string,
};

export default DefaultNavbar;
