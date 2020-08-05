import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import H1 from 'components/H1';

import logo from 'assets/svg/logo.svg';
import { Logo } from './styled';

const LogoNavbar = ({ navbarName }) => (
  <Fragment>
    <Row ml={35} align="center" width="100%">
      <Row width={55}>
        <Logo src={logo} />
      </Row>
      <Row ml={13}>
        <H1>{navbarName}</H1>
      </Row>
    </Row>
  </Fragment>
);

LogoNavbar.propTypes = {
  navbarName: PropTypes.object,
};

export default LogoNavbar;
