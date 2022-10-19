import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CIASLogo, MSULogo } from 'components/Logo';
import Row from 'components/Row';

import useOutsideClick from 'utils/useOutsideClick';

import { StyledLogos } from './styled';
import { MSULogoContainer } from '../styled';
import { LOGO_MAX_HEIGHT } from '../constants';

const DefaultNavbar = () => {
  const dropdownRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);

  return (
    <Row width="100%" justify="start">
      <StyledLogos>
        <Link to="/">
          <CIASLogo maxHeight={LOGO_MAX_HEIGHT} width="100%" />
        </Link>
        <MSULogoContainer>
          <MSULogo maxHeight={LOGO_MAX_HEIGHT} width="100%" />
        </MSULogoContainer>
      </StyledLogos>
    </Row>
  );
};

export default DefaultNavbar;
