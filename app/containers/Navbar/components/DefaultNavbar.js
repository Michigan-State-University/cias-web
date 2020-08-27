import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Text from 'components/Text';
import Img from 'components/Img';
import logo from 'assets/svg/logo.svg';
import navbarNames from 'utils/navbarNames';

const DefaultNavbar = ({ navbarName }) => (
  <Fragment>
    <Link to="/">
      <Img alt="logo" src={logo} height={51} width={56} mr={15} />
    </Link>
    <Text color="black" fontSize={23}>
      {navbarName}
    </Text>
  </Fragment>
);

DefaultNavbar.propTypes = {
  navbarName: PropTypes.node,
};

DefaultNavbar.defaultProps = {
  navbarName: navbarNames.logo,
};

export default DefaultNavbar;
