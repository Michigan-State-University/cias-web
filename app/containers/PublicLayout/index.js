/**
 *
 * PublicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import logo from 'assets/svg/logo.svg';

import { Background, Content, Header, Logo, TopBackground } from './styled';

export const PublicLayout = ({ children }) => (
  <Background>
    <TopBackground />
    <Header>
      <Logo src={logo} />
    </Header>
    <Content>{children}</Content>
  </Background>
);

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const withPublicLayout = Component => props => (
  <PublicLayout>
    <Component {...props} />
  </PublicLayout>
);

export default withPublicLayout;
