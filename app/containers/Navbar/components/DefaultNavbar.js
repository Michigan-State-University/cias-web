import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/svg/logo.svg';

import Img from 'components/Img';
import { MSULogo } from 'components/Logo';
import Row from 'components/Row';

import useOutsideClick from 'utils/useOutsideClick';

import { StyledLogos } from './styled';

const DefaultNavbar = () => {
  const dropdownRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useOutsideClick(dropdownRef, () => setMenuVisible(false), menuVisible);

  return (
    <Row width="100%" justify="start">
      <StyledLogos>
        <Link to="/">
          <Img alt="logo" src={logo} maxHeight={51} mr={15} />
        </Link>
        <MSULogo maxHeight={51} ml={10} />
      </StyledLogos>
    </Row>
  );
};

export default DefaultNavbar;
