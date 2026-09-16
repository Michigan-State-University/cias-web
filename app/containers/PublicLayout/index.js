/**
 *
 * PublicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CIASLogo, MSULogo } from 'components/Logo';

import {
  Background,
  Content,
  Header,
  TopBackground,
  HeaderWithDoubleLogo,
  MSULogoContainerMobile,
  MSULogoContainerDesktop,
} from './styled';

export const PublicLayout = ({ children, withMsuLogo }) => (
  <Background>
    <TopBackground />
    {!withMsuLogo && (
      <Header>
        <CIASLogo height={80} />
      </Header>
    )}
    {withMsuLogo && (
      <>
        <MSULogoContainerDesktop>
          <MSULogo />
        </MSULogoContainerDesktop>
        <HeaderWithDoubleLogo>
          <CIASLogo height={80} />
          <MSULogoContainerMobile>
            <MSULogo />
          </MSULogoContainerMobile>
        </HeaderWithDoubleLogo>
      </>
    )}
    <Content>{children}</Content>
  </Background>
);

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  withMsuLogo: PropTypes.bool,
};

const withPublicLayout = (Component) => (props) => (
  <PublicLayout>
    <Component {...props} />
  </PublicLayout>
);

export default withPublicLayout;
