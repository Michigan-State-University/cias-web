/**
 *
 * PublicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CIASLogo } from 'components/Logo';

import { Background, Content, Header, TopBackground } from './styled';

export const PublicLayout = ({ children }) => (
  <Background>
    <TopBackground />
    <Header>
      <CIASLogo />
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
