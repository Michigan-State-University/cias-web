import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';

import arrowheadUp from 'assets/svg/arrowhead-up.svg';
import arrowheadDown from 'assets/svg/arrowhead-down.svg';

import { DropdownContainer } from './styled';

const Dropdown = ({ children, isOpened, onClick }) => {
  const arrow = isOpened ? arrowheadUp : arrowheadDown;

  return (
    <DropdownContainer onClick={onClick}>
      <Row align="center" justify="between" height="100%">
        <Box>{children}</Box>
        <Img src={arrow} />
      </Row>
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onClick: PropTypes.func,
};

Dropdown.defaultProps = {};

export default Dropdown;
